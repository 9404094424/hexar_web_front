import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './components/App';
import Main from './components/Main';
import Footer from './components/Footer';


export default function Pagerout() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="" element={<App />} />
                <Route path="/main" element={<Main />} />
                <Route path="/footer" element={<Footer />} />



            </Routes>
        </BrowserRouter>
    )
}
