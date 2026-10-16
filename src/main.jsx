import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";   
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import App from "./pages/App.jsx";
import About from "./pages/About.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      {/* ✅ Har route change pe top pe scroll */}
      <ScrollToTop />

      {/* ✅ Navbar har page par */}
      <Navbar />

      <Routes>
        <Route path="/about" element={<About />} />
       
      </Routes>

      {/* ✅ Footer har page par (last me) */}
      <Footer />
    </BrowserRouter>
  </StrictMode>
);