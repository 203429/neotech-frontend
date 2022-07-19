import { BrowserRouter as Router, Route, NavLink, Routes, BrowserRouter } from "react-router-dom";
import Login from './components/login'
import Index from './components/index'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/index" element={<Index />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;