import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ContainerScroll = ({ children, className, style }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className || ''}`}
      style={{ 
        perspective: "1200px",
        ...style 
      }}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, { scrollYProgress, index, total: React.Children.count(children) });
      })}
    </div>
  );
};

const CardSticky = ({ 
  index, 
  total,
  scrollYProgress, 
  children, 
  className, 
  style 
}) => {
  // Each card starts sticking at a certain point in the container's scroll
  const start = index / total;
  const end = 1;

  // Subtle scaling and fading as more cards stack on top
  const scale = useTransform(scrollYProgress, [start, end], [1, 1 - (total - index) * 0.02]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.1], [1, 1]);
  
  // Staggered top positions to create the overlapping effect
  const topOffset = 80 + (index * 40);

  return (
    <motion.div
      style={{
        position: "sticky",
        top: `${topOffset}px`,
        scale,
        opacity,
        zIndex: index,
        ...style,
      }}
      className={`w-full ${className || ''}`}
    >
      {children}
    </motion.div>
  );
};

export { ContainerScroll, CardSticky };
