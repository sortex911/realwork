import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter'; // Assuming this or similar is available, or use a custom one

const VIDEO_URL = "/assets/video/home-hero.mp4"; // Swap with Supabase URL

const ModernHero = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={VIDEO_URL} type="video/mp4" />
      </video>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Bold Heading with Typewriter */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Building Digital <span className="text-blue-400">Experiences</span>
            <br />
            <span className="text-3xl md:text-5xl font-light italic opacity-90">
              <Typewriter
                words={['Modern.', 'Performant.', 'Scalable.']}
                loop={0}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h1>

          {/* Subtext Card (Glassmorphism) */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl mb-10 max-w-2xl mx-auto transform hover:scale-[1.02] transition-transform duration-300">
            <p className="text-lg md:text-xl text-gray-200 font-light">
              Full-stack developer specialized in creating stunning user interfaces and robust architectures. Let's turn your vision into reality.
            </p>
          </div>

          {/* CTA Buttons (Glassmorphism & Contrast) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-black font-semibold rounded-full shadow-lg hover:bg-gray-100 transition-colors w-full sm:w-auto"
            >
              View Projects
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/30 text-white font-semibold rounded-full backdrop-blur-sm transition-all w-full sm:w-auto"
            >
              Contact Me
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Glass Element */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="w-32 h-32 bg-blue-500/10 backdrop-blur-xl rounded-full border border-white/10 animate-pulse" />
      </div>
    </section>
  );
};

export default ModernHero;
