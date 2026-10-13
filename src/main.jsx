import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import App from "./pages/App.jsx";
import About from "./pages/About.jsx";
import GymHome from "./pages/GymHome.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {/* ✅ Scroll to top on every route change */}
      <ScrollToTop />

      {/* ✅ Navbar on every page */}
      <Navbar />

      {/* ✅ Routes */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/gym-home" element={<GymHome />} />
      </Routes>

      {/* ✅ Footer on every page */}
      <Footer />
    </BrowserRouter>
  </StrictMode>
);