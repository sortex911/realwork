import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import OptimizedImage from './OptimizedImage';
import './ClientLogos.css';

const ClientLogos = () => {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) return;

    const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const logosData = snapshot.docs.map(doc => doc.data().imageUrl);
      setLogos(logosData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching client logos: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading || logos.length === 0) {
    return null; // Or a placeholder if desired
  }

  return (
    <section className="client-logos-section">
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
