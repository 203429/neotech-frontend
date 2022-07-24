import axios from 'axios';
import { Component } from 'react';
import { NavLink } from "react-router-dom";
import '../styles/Main.css'
import Menu from '../img/menu.png'
import toast, { Toaster } from 'react-hot-toast';

class Valores extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valores: [],
            fecha: "",
        }
        this.splitText = this.splitText.bind(this);
    }

    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/neotech/valores", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                },
            })
            .then(res => {
                this.setState({ valores: res.data.pay_load[res.data.pay_load.length - 1] });
                this.setState({ fecha: res.data.pay_load[res.data.pay_load.length - 1].fecha });
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

    splitText(f) {
        let fecha = f
        let x = fecha.split(".");
        let result = x[0].replace("T"," ");
        return (result)
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

                <h2 id="titleBig">Valores Actuales</h2>
                <div className="container">
                    <div id="data-categories">
                        <h1 className="title" id="title-table">Actual</h1>
                        <table id="table">
                            <thead>
                                <tr>
                                    <th>Temp. Ambiente</th>
                                    <th>Humedad Ambiente</th>
                                    <th>Humedad de Suelo</th>
                                    <th>Nivel de Agua</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>{this.state.valores.temp_ambiente}</td>
                                <td>{this.state.valores.humedad_ambiente}</td>
                                <td>{this.state.valores.humedad_suelo}</td>
                                <td>{this.state.valores.nivel_agua}</td>
                                <td>{this.splitText(this.state.fecha)}</td>
                            </tbody>
                        </table>
                    </div>
                </div>


            </body>
        );
    }
}

export default Valores;