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
    </div>
  );
};

export default GalleryPage;