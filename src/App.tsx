import Problem1 from "./components/Problem1";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Problem2 from "./components/Problem2";
import Problem3 from "./components/Problem3";
import "./styles/styles.css";
import "./styles/App.css";
import Problem4 from "./components/Problem4";

export default function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<Problem1 />} />
                <Route path="/problem2" element={<Problem2 />} />
                <Route path="/problem3" element={<Problem3 />} />
                <Route path="/problem4" element={<Problem4 />} />
            </Routes>
        </BrowserRouter>
    );
}
