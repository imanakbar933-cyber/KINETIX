import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";   
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";              // 👈 Footer import
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/App.jsx";
import About from "./pages/About.jsx";
import GymHome from "./pages/GymHome.jsx";
import Team from "./pages/Team.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      {/* ✅ Har route change pe top pe scroll */}
      <ScrollToTop />

      {/* ✅ Navbar har page par */}
      <Navbar />

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/gym-home" element={<GymHome />} />
  
         <Route path="/team" element={<Team />} />  
      </Routes>

      {/* ✅ Footer har page par (last me) */}
      <Footer />

    </BrowserRouter>
  </StrictMode>
);