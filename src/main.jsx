import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";   

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/App.jsx";
import About from "./pages/About.jsx";
import GymHome from "./pages/GymHome.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      <ScrollToTop />
      <Navbar />

      <Routes>
       <Route path="/" element={<Home   />} />
        <Route path="/about" element={<About />} />
        <Route path="/gym-home" element={<GymHome />} />
       
      </Routes>

      <Footer />
      
    </BrowserRouter>
  </StrictMode>
);