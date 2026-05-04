import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mt-2 md:text-3xl sm:text-2xl text-xl font-semibold inline-block">
      <span className="opacity-20">{children}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};

export const MagicText = ({ text }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <div ref={container} className="flex flex-wrap justify-center leading-relaxed py-4 gap-x-2">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </div>
  );
};
