import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

// Configuration - Replace with your actual Supabase URL and assets
const SUPABASE_VIDEO_URL = "https://your-project-id.supabase.co/storage/v1/object/public/videos/hero-bg.mp4";
const POSTER_IMAGE_URL = "/assets/images/hero-thumbnail.jpg"; // Small optimized thumbnail
const FALLBACK_IMAGE_URL = "/assets/images/hero-fallback.jpg"; // High-quality static fallback

const ModernHero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [startTypewriter, setStartTypewriter] = useState(false);

  // Sync Typewriter start with the entrance animation completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTypewriter(true);
    }, 1200); // Matches the 0.8s + small delay of the main container animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Layer */}
      <AnimatePresence>
        {!videoError ? (
          <motion.div
            key="video-container"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: isVideoLoaded ? 1 : 0, 
              scale: isVideoLoaded ? 1 : 1.1 
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={POSTER_IMAGE_URL}
              onLoadedData={() => setIsVideoLoaded(true)}
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover"
            >
              <source src={SUPABASE_VIDEO_URL} type="video/mp4" />
            </video>
          </motion.div>
        ) : (
          /* Fallback Gradient/Image Layer */
          <motion.div
            key="fallback-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.8)), url(${FALLBACK_IMAGE_URL})`,
              backgroundColor: '#0f172a' // Dark slate fallback color
            }}
          />
        )}
      </AnimatePresence>

      {/* Dark Overlay (Always present for consistency) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Title */}
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tighter leading-tight">
            Design <span className="text-emerald-400">Integrity.</span>
            <br />
            <span className="text-3xl md:text-5xl font-extralight text-gray-300">
              {startTypewriter && (
                <Typewriter
                  words={['Tropical Sanctuaries.', 'Miyawaki Forests.', 'Butterfly Havens.']}
                  loop={0}
                  cursor
                  cursorStyle='|'
                  typeSpeed={60}
                  deleteSpeed={40}
                  delaySpeed={2000}
                />
              )}
            </span>
          </h1>

          {/* Glassmorphism Feature Card */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="inline-block bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] mb-12 max-w-2xl"
          >
            <p className="text-lg md:text-xl text-emerald-50/80 font-light leading-relaxed">
              Elevating landscape architecture through technical precision and ecological sensitivity. Based in Kerala, serving the globe.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(52, 211, 153, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-emerald-500 text-black font-bold rounded-full transition-all w-full sm:w-auto"
            >
              Our Projects
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 border border-white/20 text-white font-medium rounded-full backdrop-blur-md transition-all w-full sm:w-auto"
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Modern Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-medium">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-emerald-500/80 to-transparent" />
      </motion.div>
    </section>
  );
};

export default ModernHero;
