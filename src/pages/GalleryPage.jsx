// src/pages/GalleryPage.jsx

import React from "react";
import GalleryHero from "../components/GalleryHero";
import GalleryImages from "../components/GalleryImages";

const GalleryPage = () => {
  return (
    <div>
      {/* ✅ Gallery Hero Section */}
      <GalleryHero />
 {/* ✅ Images Grid + Lightbox */}
      <GalleryImages />
      {/* 🚧 Gallery Images Section — Agle step mein banayenge */}
      <section style={{
        padding: '100px 60px',
        background: '#0a0a0a',
        color: '#fff',
        minHeight: '50vh',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem', color: '#4ade80' }}>
          Gallery Images — Coming Soon
        </h2>
        <p style={{ color: '#8a8a8a', marginTop: '20px' }}>
          Agle step mein images grid yahan aayega
        </p>
      </section>
    </div>
  );
};

export default GalleryPage;