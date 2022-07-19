import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
    let navigate = useNavigate();

    const login = () => {
        const request_options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        var post_data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }

        axios
            .post("http://127.0.0.1:8000/neotech/login", post_data, request_options)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                alert(localStorage.getItem('token'));
                navigate('/index',{replace:true});
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }

    return (
        <body>
            <h1>NeoTech - Inicio de Sesión</h1>
            <div>
                <input id="username" type="text" placeholder="username"/>
                <input id="password" type="password" placeholder="password"/>
                <button onClick={login}>Ingresar</button>
            </div>
        </body>
    );
}

export default Login;