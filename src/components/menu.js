import { NavLink, useNavigate } from "react-router-dom";
import '../styles/Menu.css'
import img1 from '../img/list.png'
import img2 from '../img/money.png'
import img3 from '../img/finance.png'
import img4 from '../img/document.png'

function Menu() {
    let navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/', { replace: true });
    }

    return (
        <body>
            <header>
                <div id="navMenu">
                    <div><NavLink className="linkMenu" to="/menu"><h3 id="title-Menu">NeoTech - LechugaSoft</h3></NavLink></div>
                    <button id="buttonMenu" onClick={logout}>Salir</button>
                </div>
            </header>
            <div id="containerMenu">
                <div className="optionMenu">
                    <NavLink className="linkMenu" to="/valores">
                        <img src={img1} className="imgMenu" id="ctg" alt="error" />
                        <span className="spanMenu">Valores actuales</span>
                        <br /><p>Visualizar los valores actuales que se actualizan cada 1 minuto.</p>
                    </NavLink>
                </div>
                <div className="optionMenu">
                    <NavLink className="linkMenu" to="/historial_valores">
                        <img src={img2} className="imgMenu" id="money" alt="error" />
                        <span className="spanMenu">Historial de valores</span>
                        <br /><p>Visualizar el historial de valores sensados.</p>
                    </NavLink>
                </div>
                <div className="optionMenu">
                    <NavLink className="linkMenu" to="/historial_riego">
                        <img src={img3} className="imgMenu" id="ind" alt="error" />
                        <span className="spanMenu">Historial de riego</span>
                        <br /><p>Visualizar el historial de riego.</p>
                    </NavLink>
                </div>
                <div className="optionMenu">
                    <NavLink className="linkMenu" to="/reporte">
                        <img src={img4} className="imgMenu" id="ind" alt="error" />
                        <span className="spanMenu">Reporte de datos</span>
                        <br /><p>Generar reportes estadísticos de los datos sensados.</p>
                    </NavLink>
                </div>
            </div>
        </body>
    );
}
export default Menu;