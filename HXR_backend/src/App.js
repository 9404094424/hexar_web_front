import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Banner from "./pages/Banner";
import About from "./pages/About";
import MissionVision from "./pages/MissionVision";
import Vision from "./pages/Vision"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/about" element={<About />} />
        <Route path="/mission-vision" element={<MissionVision />} />
        <Route path="/vision" element={<Vision/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;