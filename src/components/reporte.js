import axios from 'axios';
import { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../styles/Main.css';
import Menu from '../img/menu.png'
import ImgReporte from '../img/reporteImg.png'
import toast, { Toaster } from 'react-hot-toast';

class Reporte extends Component {
    constructor(props) {
        super(props)
        this.state = {
            temp_ambiente: [],
            hum_ambiente: [],
            hum_suelo: [],
        }
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
                this.setState({ temp_ambiente: res.data.temp_ambiente });
                this.setState({ hum_ambiente: res.data.hum_ambiente });
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
                this.setState({ hum_suelo: res.data.hum_suelo });
            })
            .catch(error => {
                console.log(error.response);
            })
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
                            <option value="01">Temperatura Ambiente</option>
                            <option value="02">Humedad Ambiente</option>
                        </select>
                        <button class="buttonReport" id="1">Generar PDF</button>
                    </div>
                </div>
                <img src={ImgReporte} alt="error" id="imgReport" />
            </body>

        );
    }
}

export default Reporte;