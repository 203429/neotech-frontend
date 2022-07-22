import axios from 'axios';
import { Component } from 'react';
import { NavLink } from "react-router-dom";

class Reporte extends Component{
    constructor(props) {
        super(props)
        this.state = {
            valores: [],
        }
    }

    render() {
        return (
            <body>
                <nav>
                    <h1>Lechuga Software</h1>

                    <div>
                        <ul>
                            <li>
                                <NavLink to="/index">Valores actuales</NavLink>
                            </li>
                            <li>
                                <NavLink to="/historial_valores">Historial de Valores</NavLink>
                            </li>
                            <li>
                                <NavLink to="/historial_riego">Historial de Riego</NavLink>
                            </li>
                            <li>
                                <NavLink to="/reporte">Reporte</NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div>
                    <h1>Reporte</h1>
                    <h2>Tipo de reporte</h2>
                    <select placeholder='Tipo de reporte'>
                        <option value="0" selected disabled>Seleccione una opción</option>
                        <option value="1">Temperatura ambiente</option>
                        <option value="2">Humedad ambiente</option>
                        <option value="3">Humedad de suelo</option>
                    </select>
                </div>
            </body>
        );
    }
}

export default Reporte;