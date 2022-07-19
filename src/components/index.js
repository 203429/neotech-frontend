import axios from 'axios';
import { Component } from 'react';

class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valores: [],
        }
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
                this.setState({ valores: res.data.pay_load[res.data.pay_load.length-1] });
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    render() {
        return (
            <body>
                <h1>Valores actuales</h1>
                <table>
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
                        {/* {
                            this.state.valores.map
                            (valores => <tr key={valores.id}>
                                <td>{valores.temp_ambiente}</td>
                                <td>{valores.humedad_ambiente}</td>
                                <td>{valores.humedad_suelo}</td>
                                <td>{valores.nivel_agua}</td>
                                <td>{valores.fecha}</td>
                            </tr>)
                        } */}
                        <td>{this.state.valores.temp_ambiente}</td>
                        <td>{this.state.valores.humedad_ambiente}</td>
                        <td>{this.state.valores.humedad_suelo}</td>
                        <td>{this.state.valores.nivel_agua}</td>
                        <td>{this.state.valores.fecha}</td>
                    </tbody>
                </table>
            </body>
        );
    }
}

export default Index;