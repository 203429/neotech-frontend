import { BrowserRouter as Router, Route, NavLink, Routes, BrowserRouter, HashRouter } from "react-router-dom";
import Login from './components/login'
import Valores from './components/valores'
import Valores_h from "./components/valores_h";
import Riego_h from "./components/riego_h";
import Reporte from "./components/reporte";
import Menu from "./components/menu";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/valores" element={<Valores />} />
                    <Route exact path="/historial_valores" element={<Valores_h />} />
                    <Route exact path="/historial_riego" element={<Riego_h />} />
                    <Route exact path="/reporte" element={<Reporte />} />
                    <Route exact path="/menu" element={<Menu />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;