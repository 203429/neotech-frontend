import axios from 'axios';
import { Component } from 'react';
import { NavLink } from "react-router-dom";

class Riego_h extends Component{
    constructor(props) {
        super(props)
        this.state = {
            valores: [],
        }
    }

    componentDidMount() {
        axios
            .get("http://127.0.0.1:8000/neotech/riego", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Token ' + localStorage.getItem('token'),
                },
            })
            .then(res => {
                this.setState({ valores: res.data.pay_load});
            })
            .catch(error => {
                console.log(error.response);
            })
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

                <h1>Historial de Riego</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Tipo de Riego</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.valores.map
                            (valores => <tr key={valores.id}>
                                <td>{valores.tipo}</td>
                                <td>{valores.fecha}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </body>
        );
    }
}

export default Riego_h;