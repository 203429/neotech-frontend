import { BrowserRouter as Router, Route, NavLink, Routes, BrowserRouter } from "react-router-dom";
import Login from './components/login'
import Index from './components/index'
import Valores_h from "./components/valores_h";
import Riego_h from "./components/riego_h";
import Reporte from "./components/reporte";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/index" element={<Index />} />
                    <Route exact path="/historial_valores" element={<Valores_h />} />
                    <Route exact path="/historial_riego" element={<Riego_h />} />
                    <Route exact path="/reporte" element={<Reporte />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;