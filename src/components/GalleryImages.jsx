// src/components/GalleryImages.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./GalleryImages.css";

const GalleryImages = () => {
  // ✅ Current index state (Next/Prev ke liye zaroori hai)
  const [currentIndex, setCurrentIndex] = useState(null);

  // ✅ Gallery Images
  const images = [
    { id: 1, src: "/gym-assets/picture1.png", title: "Modern Gym Floor", size: "tall" },
    { id: 2, src: "/gym-assets/picture2.png", title: "Group Training",   size: "normal" },
    { id: 3, src: "/gym-assets/picture3.png", title: "Cardio Zone",      size: "wide" },
    { id: 4, src: "/gym-assets/picture4.png", title: "Strength Area",    size: "normal" },
    { id: 5, src: "/gym-assets/picture5.png", title: "Free Weights",     size: "wide" },
    { id: 6, src: "/gym-assets/picture6.png", title: "Personal Training", size: "normal" },
    { id: 7, src: "/gym-assets/picture7.png", title: "Functional Zone",  size: "normal" },
    { id: 8, src: "/gym-assets/picture8.png", title: "Locker Room",      size: "wide" },
  ];

  const closeModal = () => setCurrentIndex(null);

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // ✅ Keyboard Support
  useEffect(() => {
    const handleKey = (e) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  // ✅ Body scroll lock jab modal open ho
  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [currentIndex]);

  return (
    <section className="galleryimages-section">
      <div className="galleryimages-container">

        {/* HEADER */}
        <div className="galleryimages-header">
          <motion.p
            className="galleryimages-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            EXPLORE OUR SPACE
          </motion.p>

          <motion.h2
            className="galleryimages-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            OUR <span className="galleryimages-highlight">GALLERY</span>
          </motion.h2>
        </div>

        {/* GRID */}
        <div className="galleryimages-grid">
          {images.map((img, index) => (
            <GalleryItem
              key={img.id}
              img={img}
              index={index}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        {/* ============================================
            LIGHTBOX MODAL (Screenshot Style)
           ============================================ */}
        <AnimatePresence>
          {currentIndex !== null && (
            <motion.div
              className="gallery-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
            >
              {/* ✅ Close Button (Top Right) */}
              <motion.button
                className="gallery-modal-close"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                onClick={closeModal}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>

              {/* ✅ Main Image Area with Arrows */}
              <div className="gallery-modal-main" onClick={(e) => e.stopPropagation()}>

                {/* LEFT ARROW */}
                <motion.button
                  className="gallery-modal-arrow gallery-modal-prev"
                  onClick={prevImage}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </motion.button>

                {/* BIG IMAGE */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[currentIndex].id}
                    src={images[currentIndex].src}
                    alt={images[currentIndex].title}
                    className="gallery-modal-image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </AnimatePresence>

                {/* RIGHT ARROW */}
                <motion.button
                  className="gallery-modal-arrow gallery-modal-next"
                  onClick={nextImage}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </motion.button>
              </div>

              {/* ✅ Caption */}
              <motion.p
                className="gallery-modal-caption"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                {images[currentIndex].title}
              </motion.p>

              {/* ✅ Bottom Thumbnail Strip */}
              <motion.div
                className="gallery-thumbnail-strip"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                onClick={(e) => e.stopPropagation()}
              >
                {images.map((img, index) => (
                  <div
                    key={img.id}
                    className={`gallery-thumb ${index === currentIndex ? "active" : ""}`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <img src={img.src} alt={img.title} />
                  </div>
                ))}
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

/* ============================================
   Gallery Item
   ============================================ */
const GalleryItem = ({ img, index, onClick }) => {
  return (
    <motion.div
      className={`galleryimages-item gallery-${img.size}`}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: (index % 4) * 0.12,
        ease: "easeOut",
      }}
      whileHover={{ y: -8 }}
      onClick={onClick}
    >
      <img src={img.src} alt={img.title} className="galleryimages-img" />

      <div className="galleryimages-overlay">
        <div className="galleryimages-plus">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <p className="galleryimages-item-title">{img.title}</p>
      </div>
    </motion.div>
  );
};

export default GalleryImages;