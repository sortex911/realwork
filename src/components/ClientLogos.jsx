import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import OptimizedImage from './OptimizedImage';
import './ClientLogos.css';

const WIPE_DURATION = 0.92;
const WIPE_TIMES = [0, 0.4, 1];

function LogoWaveItem({ logo, index, isWaving, stagger, totalCount, onDone }) {
  return (
    <motion.div
      aria-label={`Client Logo ${index + 1}`}
      animate={
        isWaving
          ? {
              clipPath: [
                "inset(0 0% 0 0)",
                "inset(0 100% 0 0)",
                "inset(0 0% 0 0)",
              ],
              filter: ["blur(0px)", "blur(8px)", "blur(0px)"],
              opacity: [1, 0.2, 1],
            }
          : {
              clipPath: "inset(0 0% 0 0)",
              filter: "blur(0px)",
              opacity: 1,
            }
      }
      transition={
        isWaving
          ? {
              clipPath: {
                duration: WIPE_DURATION,
                times: WIPE_TIMES,
                ease: ["easeIn", [0.16, 1, 0.3, 1]],
                delay: index * stagger,
              },
              filter: {
                duration: WIPE_DURATION * 0.9,
                times: WIPE_TIMES,
                ease: "easeInOut",
                delay: index * stagger,
              },
              opacity: {
                duration: WIPE_DURATION * 0.85,
                times: WIPE_TIMES,
                ease: "easeInOut",
                delay: index * stagger,
              },
            }
          : {
              duration: 0.3,
              ease: "easeOut",
            }
      }
      onAnimationComplete={() => {
        if (isWaving && index === totalCount - 1) onDone();
      }}
      whileHover={{
        scale: 1.07,
        opacity: 1,
        filter: "blur(0px)",
        transition: { type: "spring", stiffness: 340, damping: 24 },
      }}
      className="client-logo-item"
    >
      <OptimizedImage
        src={logo}
        alt={`Client ${index + 1}`}
        width={200}
        objectFit="contain"
        noBg
      />
    </motion.div>
  );
}

const ClientLogos = ({ variant = 'marquee', title = 'OUR CLIENTS', interval = 3200, stagger = 0.11 }) => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [waving, setWaving] = useState(false);

  useEffect(() => {
    if (!db) return;

    const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const logosData = snapshot.docs.map((doc) => doc.data().imageUrl);
        setLogos(logosData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching client logos: ", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (variant === 'wave') {
      const id = setInterval(() => setWaving(true), interval);
      return () => clearInterval(id);
    }
  }, [variant, interval]);

  if (loading || logos.length === 0) {
    return null;
  }

  if (variant === 'wave') {
    return (
      <section className="client-logos-section">
        {title && (
          <div className="client-logos-heading">
            <span className="line"></span>
            <h2 className="section-title-small">{title}</h2>
            <span className="line"></span>
          </div>
        )}
        <div className="logo-cloud-container">
          <div className="logo-cloud-grid">
            {logos.map((logo, i) => (
              <LogoWaveItem
                key={i}
                logo={logo}
                index={i}
                isWaving={waving}
                stagger={stagger}
                totalCount={logos.length}
                onDone={() => setWaving(false)}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Default: Marquee loop (Home Page style)
  return (
    <section className="client-logos-section">
      {title && (
        <div className="client-logos-heading">
          <span className="line"></span>
          <h2 className="section-title-small">{title}</h2>
          <span className="line"></span>
        </div>
      )}
      <div className="logos-marquee-container">
        <div className="logos-marquee">
          {logos.map((logo, index) => (
            <div key={`logo-a-${index}`} className="client-logo-item">
              <OptimizedImage
                src={logo}
                alt={`Client ${index + 1}`}
                width={200}
                objectFit="contain"
                noBg
              />
            </div>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="logos-marquee" aria-hidden="true">
          {logos.map((logo, index) => (
            <div key={`logo-b-${index}`} className="client-logo-item">
              <OptimizedImage
                src={logo}
                alt={`Client ${index + 1}`}
                width={200}
                objectFit="contain"
                noBg
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
