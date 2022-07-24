import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/FormsUser.css'
import logo from '../img/logo.png'

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
            username: document.getElementById('user').value,
            password: document.getElementById('passw').value
        }

        axios
            .post("http://127.0.0.1:8000/neotech/login", post_data, request_options)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                navigate('/menu', { replace: true });
            })
            .catch((error) => {
                alert("Verifique los datos de ingreso")
            });
    }

    return (
        <body>
            <div className="form-boxUser">
                <img src={logo}></img>
                <h2>Iniciar Sesión</h2>
                <div className="form-user">
                    <input className="inputUser" id="user" type="text" name= "usuario" placeholder="Usuario"/> 
                    <input className="inputUser" id="passw" type="password" name= "password" placeholder="Contraseña"/>
                    <br/><button className="buttonUser" onClick={login}>Ingresar</button>
                </div>
            </div>
        </body>
    );
}

export default Login;