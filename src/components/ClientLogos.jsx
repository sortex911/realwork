import React from 'react';
import './ClientLogos.css';

const logos = [
  '/assets/our-clients/Joyalukkas-logo.jpg',
  '/assets/our-clients/viibee.png',
  '/assets/our-clients/homestay-logo.jpg',
  '/assets/our-clients/logo-1.png',
  '/assets/our-clients/logo-2.png',
  '/assets/our-clients/logo-3.png',
  '/assets/our-clients/logo-4.png',
  '/assets/our-clients/logo-5.png',
  '/assets/our-clients/455T5Y.jpg',
  '/assets/our-clients/45yy.jpg',
  '/assets/our-clients/EFRGG.jpg',
  '/assets/our-clients/FE224TT4_edited.jpg',
  '/assets/our-clients/FGR.jpg',
  '/assets/our-clients/OIP.jpeg',
  '/assets/our-clients/RFGGR.jpg',
  '/assets/our-clients/TRHRHJ6.jpg',
  '/assets/our-clients/cdWF.jpg',
  '/assets/our-clients/unnamed.jpg'
];

const ClientLogos = () => {
  return (
    <section className="client-logos-section">
      <div className="logos-marquee-container">
        <div className="logos-marquee">
          {logos.map((logo, index) => (
            <div key={`logo-a-${index}`} className="client-logo-item">
              <img src={logo} alt={`Client ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="logos-marquee" aria-hidden="true">
          {logos.map((logo, index) => (
            <div key={`logo-b-${index}`} className="client-logo-item">
              <img src={logo} alt={`Client ${index + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
