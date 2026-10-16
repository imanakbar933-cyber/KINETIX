// src/components/GalleryImages.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./GalleryImages.css";

const GalleryImages = () => {
  // ✅ Selected image state
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ 10 Gallery Images — Picture1 se Picture10
  const images = [
    { id: 1, src: "/gym-assets/Picture1.jpg", title: "Modern Gym" },
    { id: 2, src: "/gym-assets/Picture2.jpg", title: "Group Training" },
    { id: 3, src: "/gym-assets/Picture3.jpg", title: "Cardio Area" },
    { id: 4, src: "/gym-assets/Picture4.jpg", title: "Strength Training" },
    { id: 5, src: "/gym-assets/Picture5.jpg", title: "Kettlebell Workout" },
    { id: 6, src: "/gym-assets/Picture6.jpg", title: "Free Weights" },
    { id: 7, src: "/gym-assets/Picture7.jpg", title: "Battle Ropes" },
    { id: 8, src: "/gym-assets/Picture8.jpg", title: "Workout Session" },
    { id: 9, src: "/gym-assets/Picture9.jpg", title: "Treadmill Row" },
  ];

  // ✅ Close modal
  const closeModal = () => setSelectedImage(null);

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

        {/* IMAGES GRID — Masonry */}
        <div className="galleryimages-grid">
          {images.map((img, index) => (
            <GalleryItem
              key={img.id}
              img={img}
              index={index}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="gallery-modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
            >
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
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </motion.button>

              <motion.img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="gallery-modal-image"
                initial={{ scale: 0.7, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.7, opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              />

              <motion.p
                className="gallery-modal-caption"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {selectedImage.title}
              </motion.p>
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
  const sizeClasses = ["gallery-tall", "gallery-normal", "gallery-wide", "gallery-normal"];
  const sizeClass = sizeClasses[index % sizeClasses.length];

  return (
    <motion.div
      className={`galleryimages-item ${sizeClass}`}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: (index % 4) * 0.12,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3 },
      }}
      onClick={onClick}
    >
      <img
        src={img.src}
        alt={img.title}
        className="galleryimages-img"
      />

      <div className="galleryimages-overlay">
        <div className="galleryimages-plus">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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