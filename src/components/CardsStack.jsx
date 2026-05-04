import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const ContainerScroll = forwardRef(({ children, className, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`relative w-full ${className || ''}`}
      style={{ perspective: "1000px", ...style }}
      {...props}
    >
      {children}
    </div>
  );
});
ContainerScroll.displayName = "ContainerScroll";

const CardSticky = forwardRef(
  ({ index, incrementY = 10, incrementZ = 10, children, className, style, ...props }, ref) => {
    const y = index * incrementY;
    const z = index * incrementZ;

    return (
      <motion.div
        ref={ref}
        layout="position"
        style={{
          top: y,
          z,
          backfaceVisibility: "hidden",
          position: "sticky",
          ...style,
        }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
CardSticky.displayName = "CardSticky";

export { ContainerScroll, CardSticky };
