import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ServiceCard = ({ images, title, description, icon }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const changeImage = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return images.length - 1;
      if (nextIndex >= images.length) return 0;
      return nextIndex;
    });
  };

  const carouselVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      variants={contentVariants}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: '0px 10px 30px -5px rgba(0,0,0,0.1)',
        transition: { type: 'spring', stiffness: 300, damping: 20 }
      }}
      className="service-place-card"
    >
      {/* Image Carousel Section */}
      <div className="service-card-carousel">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={title}
            custom={direction}
            variants={carouselVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="service-card-img"
          />
        </AnimatePresence>
        
        {/* Carousel Navigation */}
        <div className="service-card-nav">
          <button className="service-nav-btn" onClick={(e) => { e.stopPropagation(); changeImage(-1); }}>
            <ChevronLeft size={20} />
          </button>
          <button className="service-nav-btn" onClick={(e) => { e.stopPropagation(); changeImage(1); }}>
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Top Badges */}
        <div className="service-card-icon-badge">
          {icon}
        </div>
      </div>

      <div className="service-card-content">
        <h3 className="service-card-title">{title}</h3>
        <p className="service-card-desc">{description}</p>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
