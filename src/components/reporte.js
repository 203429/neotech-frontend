import axios from 'axios';
import { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../styles/Main.css';
import Menu from '../img/menu.png'
import ImgReporte from '../img/reporteImg.png'
import { Toaster } from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

class Reporte extends Component {
    constructor(props) {
        super(props)
        this.state = {
            temperatura_ambiente: [],
            humedad_suelo: [],
            datos: [],
            poblacion: 0,
            rango: 0,
            k: 0,
            amplitud: 0,
            tabla_c1: [],
            media: 0,
            tabla_c2: [],
            desv_estandar: 0,
            tam_muestra: 0,
            datos_muestra: [],
            media_muestra: 0,
            zc: 0,
            conclusion: 0,
            tipo_reporte: null,
        }
        this.reporte = this.reporte.bind(this);
        this.pdf = this.pdf.bind(this);
    }

    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/neotech/valores/ambiente", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                },
            })
            .then(res => {
                this.setState({ temperatura_ambiente: res.data });
            })
            .catch(error => {
                console.log(error.response);
            })

        axios
            .get("http://127.0.0.1:8000/neotech/valores/suelo", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                },
            })
            .then(res => {
                this.setState({ humedad_suelo: res.data });
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    reporte() {
        this.setState({ datos: [], rango: 0, k: 0, amplitud: 0, tabla_c1: [], media: 0, tabla_c2: [], desv_estandar: 0, tam_muestra: 0, datos_muestra: [], media_muestra: 0, tipo_reporte:0 });
        this.setState({ datos: [], rango: 0, k: 0, amplitud: 0, tabla_c1: [], media: 0, tabla_c2: [], desv_estandar: 0, tam_muestra: 0, datos_muestra: [], media_muestra: 0, tipo_reporte:0 });
        let tipo_reporte = document.getElementById("tipo_reporte").value;
        this.state.tipo_reporte = tipo_reporte;
        let datos = [];
        let poblacion = 0;
        if (tipo_reporte === "1") {
            poblacion = this.state.temperatura_ambiente.length;
            for (let i = 0; i < poblacion; i++) {
                datos.push(this.state.temperatura_ambiente[i]["temp_ambiente"]);
            }
        }
        if (tipo_reporte === "2") {
            poblacion = this.state.humedad_suelo.length;
            for (let i = 0; i < poblacion; i++) {
                datos.push(this.state.humedad_suelo[i]["humedad_suelo"]);
            }
        }
        // this.setState({ poblacion: poblacion });
        this.state.poblacion = poblacion;
        datos.sort(function (a, b) { return a - b });
        this.setState({ datos: datos });

        let k = 0, r = 0, a = 0, log = 0, numero_clases = 0;
        log = 1 + 3.332 * Math.log10(poblacion);
        k = Math.round(log);
        numero_clases = Math.round(k);
        r = datos[datos.length - 1] - datos[0];
        a = (r) / (k);
        let a_temp = 0;
        a_temp = a.toFixed(1);
        a = parseFloat(a_temp);
        a = a + 0.1;
        // this.setState({ rango: r, k: k, amplitud: a });
        this.state.rango = r;
        this.state.k = k;
        this.state.amplitud = a;

        let clase = [], lim_inf = [], lim_sup = [], lim_inf_exa = [], lim_sup_exa = [], marca_clase = [], frec = [], frec_acu = [];
        let uv = 0.1;
        let lim_inf_temp, lim_sup_temp, lim_inf_exa_temp, lim_sup_exa_temp, marca_clase_temp;
        let media = 0;

        for (let i = 0; i < numero_clases; i++) {
            let frec_temp = 0;
            //Clase
            clase[i] = i + 1;
            //L. Inferior
            if (clase[i] === 1) {
                lim_inf[i] = datos[0];
            } else {
                lim_inf[i] = lim_sup[i - 1] + uv;
                lim_inf_temp = lim_inf[i].toFixed(2);
                lim_inf[i] = parseFloat(lim_inf_temp);
            }
            //L. Superior
            if (i === k) {
                lim_sup[i] = lim_inf[i] + a;
                lim_sup_temp = lim_sup[i].toFixed(2);
                lim_sup[i] = parseFloat(lim_sup_temp);
            } else {
                lim_sup[i] = lim_inf[i] + (a - uv);
                lim_sup_temp = lim_sup[i].toFixed(2);
                lim_sup[i] = parseFloat(lim_sup_temp);
            }
            //L. Inferior Exacto
            lim_inf_exa[i] = lim_inf[i] - (uv / 2);
            lim_inf_exa_temp = lim_inf_exa[i].toFixed(2);
            lim_inf_exa[i] = parseFloat(lim_inf_exa_temp);
            //L. Superior Exacto
            lim_sup_exa[i] = lim_sup[i] + (uv / 2);
            lim_sup_exa_temp = lim_sup_exa[i].toFixed(2);
            lim_sup_exa[i] = parseFloat(lim_sup_exa_temp);
            //Marca de Clase
            marca_clase[i] = (lim_sup[i] + lim_inf[i]) / 2;
            marca_clase_temp = marca_clase[i].toFixed(2);
            marca_clase[i] = parseFloat(marca_clase_temp);
            //Frecuencia
            for (let j = 0; j < datos.length; j++) {
                if (datos[j] >= lim_inf[i] && datos[j] <= lim_sup[i]) {
                    frec_temp = frec_temp + 1;
                }
            }
            frec[i] = frec_temp;
            //Frec. Acumulada
            if (clase[i] === 1) {
                frec_acu[i] = frec[i];
            } else {
                frec_acu[i] = frec_acu[i - 1] + frec[i];
            }
            //Media*Frec. Acu
            let media_temp = frec[i] * marca_clase[i];
            media = media + media_temp;
        }

        for (let i = 0; i < clase.length; i++) {
            let fila = [];
            fila.push(clase[i]);
            fila.push(lim_inf[i]);
            fila.push(lim_sup[i]);
            fila.push(lim_inf_exa[i]);
            fila.push(lim_sup_exa[i]);
            fila.push(marca_clase[i]);
            fila.push(frec[i]);
            fila.push(frec_acu[i]);
            this.state.tabla_c1.push(fila);
        }

        media = media / poblacion;
        let media_temp = media.toFixed(2);
        media = parseFloat(media_temp);
        // this.setState({ media: media });
        this.state.media = media;

        let marca_media = [], marca_media2 = [], marca_media2f = [];
        let marca_media_temp, marca_media2_temp, marca_media2f_temp;
        for (let i = 0; i < clase.length; i++) {
            marca_media[i] = marca_clase[i] - media;
            marca_media[i] = Math.abs(marca_media[i]);
            marca_media_temp = marca_media[i].toFixed(2);
            marca_media[i] = parseFloat(marca_media_temp);

            marca_media2[i] = Math.pow(marca_media[i], 2);
            marca_media2_temp = marca_media2[i].toFixed(2);
            marca_media2[i] = parseFloat(marca_media2_temp);

            marca_media2f[i] = marca_media2[i] * frec[i];
            marca_media2f_temp = marca_media2f[i].toFixed(2);
            marca_media2f[i] = parseFloat(marca_media2f_temp);
        }

        let desv_estandar = 0;
        for (let i = 0; i < clase.length; i++) {
            let fila = [];
            fila.push(clase[i]);
            fila.push(frec[i]);
            fila.push(marca_clase[i]);
            fila.push(marca_media[i]);
            fila.push(marca_media2[i]);
            fila.push(marca_media2f[i]);
            this.state.tabla_c2.push(fila);

            desv_estandar = desv_estandar + marca_media2[i];
        }

        desv_estandar = Math.sqrt(desv_estandar);
        let desv_estandar_temp = desv_estandar.toFixed(2);
        desv_estandar = parseFloat(desv_estandar_temp);
        // this.setState({ desv_estandar: desv_estandar });
        this.state.desv_estandar = desv_estandar;

        let z1 = 1.96;
        let z2 = Math.pow(z1, 2);
        let error = Math.pow(0.05, 2);
        let tamanio_muestra = (z2 * 0.5 * 0.5 * poblacion) / ((error * (poblacion - 1) + z2 * 0.5 * 0.5));
        tamanio_muestra = Math.round(tamanio_muestra);
        // this.setState({ tam_muestra: tamanio_muestra });
        this.state.tam_muestra = tamanio_muestra;

        let cant_temp, cantidad;
        cantidad = poblacion / tamanio_muestra;
        cant_temp = cantidad.toFixed(2);
        cantidad = parseFloat(cant_temp);

        for (let i = poblacion - 1; i >= 0; i = i - cantidad) {
            if (tipo_reporte === "1") {
                this.state.datos_muestra.push(this.state.temperatura_ambiente[i]["temp_ambiente"]);
            }
            if (tipo_reporte === "2") {
                this.state.datos_muestra.push(this.state.humedad_suelo[i]["humedad_suelo"]);
            }
        }

        let sum = this.state.datos_muestra.reduce((previous, current) => current += previous);
        let media_muestra = 0;
        media_muestra = sum / this.state.datos_muestra.length;

        let media_muestra_temp = media_muestra.toFixed(2);
        media_muestra = parseFloat(media_muestra_temp);
        // this.setState({ media_muestra: media_muestra });
        this.state.media_muestra = media_muestra;
        let zc = 0, conclusion = 0;
        zc = ((this.state.media_muestra - this.state.media) / (this.state.desv_estandar / Math.sqrt(poblacion)));
        if (zc < -1.96 || zc > 1.96) {
            conclusion = 1;
        } else {
            conclusion = 2;
        }
        // this.setState({ conclusion: conclusion });
        // this.setState({ zc: zc });
        let zc_temp = zc.toFixed(3);
        zc = parseFloat(zc_temp);
        this.state.conclusion = conclusion;
        this.state.zc = zc;
        if (media !== 0) {
            this.pdf();
        } else {
            alert("Error al generar el reporte");
        }
    }

    pdf(){
        var columnas = [["Clase", "L. Inferior", "L.Superior", "L.Inf Exacto", "L.Sup Exacto","Marca de Clase", "Frec. Absoluta", "Frec. Acumulada"]];
        let content = {
            startY: 280,
            pageBreak: 'auto',
            head: columnas,
            body: this.state.tabla_c1
        }

        var columnas1 = [["Clase", "Frecuencia", "Marca de Clase", "|Media - M. Clase|", "|Media - M. Clase|^2","|Media - M. Clase|^2*frec"]];
        let content1 = {
            startY: 350,
            pageBreak: 'auto',
            head: columnas1,
            body: this.state.tabla_c2
        }

        let hip_nula, hip_alt, aceptacion, conclusion, concP;
        hip_nula = "La lechuga posee una humedad/temperatura de " + this.state.media.toString() + " °C/% en promedio.";

        hip_alt = "La lechuga posee una humedad/temperatura diferente de " + this.state.media.toString() + " °C/% en promedio.";

        if(this.state.conclusion===1){
            aceptacion = "está en zona de rechazo";
            conclusion = "existe evidencia para rechazar la hipótesis nula y aceptar la hipótesis alternativa.";
            concP = hip_alt;
        }
        if(this.state.conclusion===2){
            aceptacion = "está en zona de aceptación";
            conclusion = "existe evidencia para aceptar la hipótesis nula y rechazar la hipótesis alternativa.";
            concP = hip_nula;
        }

        const doc = new jsPDF();

        let img = new Image();
        img.src = require('../img/grafico.png');

        doc.setFontSize(12);
        doc.text("REPORTE ESTADISTICO",15,20);
        doc.text("Población: " + this.state.poblacion.toString(),15,30);
        doc.text("Rango: " + this.state.rango.toString(),15,35);
        doc.text("Amplitud: " + this.state.amplitud.toString(),15,40);
        doc.text("K: " + this.state.k.toString(),15,45);
        doc.text("Media: " + this.state.media.toString(),15,50);
        doc.text("Desviación Estándar: " + this.state.desv_estandar.toString(),15,55);
        doc.text("Tamaño de la Muestra: " + this.state.tam_muestra.toString(),15,60);
        doc.text("Media de la muestra: " + this.state.media_muestra.toString(),15,65);
        doc.text("H. nula: " + hip_nula,15,70);
        doc.text("H. alternativa: " + hip_alt,15,75);
        doc.text("N. de Significancia: 0.05 " ,15,80);
        doc.text("N. de Confianza: 0.95 " ,15,85);
        doc.text("Valor de Zc: " + this.state.zc.toString() ,15,90);
        doc.text("Conclusión est.: El valor de Zc es de "+this.state.zc.toString()+" por lo que "+aceptacion+". Esto permite" , 15, 95);
        doc.text("llegar a la conclusión de que tras realizar un analisis estadistico con un 95% de confianza" , 15, 100);
        doc.text(conclusion , 15, 105);
        doc.text("Conclusión práctica: "+concP , 15, 110);
        doc.addImage(img, "PNG",30,115,140,70)
        doc.autoTable(content);
        doc.autoTable(content1);

        doc.save("REPORTE ESTADÍSTICO")
    }

    mostrar_nav() {
        document.getElementById('navMain').style.display = "block"
        document.getElementById('background').style.display = "block"
    }
    ocultar_nav() {
        document.getElementById('navMain').style.display = "none"
        document.getElementById('background').style.display = "none"
    }

    render() {
        return (

            <body>
                <div><Toaster
                    position="bottom-left"
                    reverseOrder={false} />
                </div>
                <div id="background" onClick={this.ocultar_nav}></div>
                <header id="headerMain">
                    <div>
                        <NavLink className="linkNav" to="/menu">
                            <h3 id="titleMain">NeoTech</h3>
                        </NavLink>
                    </div>
                    <img onClick={this.mostrar_nav} src={Menu} id="menuImg" alt="error" />
                </header>

                <div id="navMain">
                    <span className="navText"><NavLink className="linkNav" to="/valores">Valores actuales</NavLink></span>
                    <span className="navText"><NavLink className="linkNav" to="/historial_valores">Historial de valores</NavLink></span>
                    <span className="navText"><NavLink className="linkNav" to="/historial_riego">Historial de riego</NavLink></span>
                    <span className="navText"><NavLink className="linkNav" to="/reporte">Reportes</NavLink></span>
                    <button className="buttonMain" onClick={this.ocultar_nav} id="buttonNav">Salir</button>
                </div>

                <h2 id="titleBig">Generar Reportes</h2>
                <div class="container2">
                    <div class="forms-card3">
                        <h1 class="title2">Elegir opción</h1>
                        <label class="labelReport">Reporte datos sensados:</label>
                        <select name="selection" id="tipo_reporte" placeholder="Opcion:">
                            <option value="0" selected disabled>Tipo de reporte</option>
                            <option value="1">Temperatura Ambiente</option>
                            <option value="2">Humedad Suelo</option>
                        </select>
                        <button class="buttonReport" id="reporte" onClick={this.reporte}>Generar PDF</button>
                    </div>
                </div>
                <img src={ImgReporte} alt="error" id="imgReport" />
            </body>

        );
    }
}

export default Reporte;