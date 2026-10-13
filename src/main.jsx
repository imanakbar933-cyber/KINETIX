
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";   
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";              // 👈 Footer import
import ScrollToTop from "./components/ScrollToTop";

import App from "./pages/App.jsx";
import About from "./pages/About.jsx";
import Members from "./pages/Members.jsx";
import Home from "./pages/Home.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>

      {/* ✅ Har route change pe top pe scroll */}
      <ScrollToTop />

      {/* ✅ Navbar har page par */}
      <Navbar />

      {/* ✅ Routes */}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/members" element={<Members />} />
         <Route path="/" element={<App />} />
         <Route path="/home" element={<Home />} />

      </Routes>

      {/* ✅ Footer har page par (last me) */}
      <Footer />

    </BrowserRouter>
  </StrictMode>
);