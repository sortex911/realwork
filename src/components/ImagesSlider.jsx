import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getOptimizedUrl } from "../lib/supabase";

const ImagesSlider = ({
  images,
  children,
  overlay = true,
  overlayClassName,
  className,
  autoplay = true,
  direction = "up",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = () => {
    setLoading(true);
    const loadPromises = images.map((image) => {
      return new Promise((resolve) => {
        // Optimize slider images - usually full screen but quality can be lowered
        const optimizedUrl = getOptimizedUrl(image, { width: 1200, quality: 75 });
        const img = new Image();
        img.src = optimizedUrl;
        img.onload = () => resolve(optimizedUrl);
        img.onerror = () => resolve(image); // Fallback to original
      });
    });

    Promise.all(loadPromises)
      .then((loadedImages) => {
        setLoadedImages(loadedImages);
        setLoading(false);
      })
      .catch((error) => console.error("Failed to load images", error));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [autoplay, images.length]);

  const slideVariants = {
    initial: {
      scale: 0,
      opacity: 0,
      rotateX: 45,
    },
    visible: {
      scale: 1,
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1.0],
      },
    },
    upExit: {
      opacity: 0,
      y: "-150%",
      transition: {
        duration: 1,
      },
    },
    downExit: {
      opacity: 0,
      y: "150%",
      transition: {
        duration: 1,
      },
    },
  };

  const areImagesLoaded = loadedImages.length > 0;

  return (
    <div
      className={className}
      style={{
        overflow: "hidden",
        height: "100%",
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1000px",
      }}
    >
      {areImagesLoaded && (
        <div style={{ zIndex: 50, position: 'relative' }}>
          {children}
        </div>
      )}

      {areImagesLoaded && overlay && (
        <div
          className={overlayClassName}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 40
          }}
        />
      )}

      {areImagesLoaded && (
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={loadedImages[currentIndex]}
            initial="initial"
            animate="visible"
            exit={direction === "up" ? "upExit" : "downExit"}
            variants={slideVariants}
            loading="lazy"
            decoding="async"
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              inset: 0,
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </AnimatePresence>
      )}
    </div>
  );
};

export default ImagesSlider;
