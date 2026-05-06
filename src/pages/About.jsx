import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COL_TEAM } from '../services/adminService';
import FadeUp from '../components/FadeUp';
import ClientLogos from '../components/ClientLogos';
import OptimizedImage from '../components/OptimizedImage';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const About = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (showGallery) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [showGallery]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, COL_TEAM), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = docs.sort((a, b) => {
        const oa = a.order ?? 999;
        const ob = b.order ?? 999;
        if (oa !== ob) return oa - ob;
        const ta = a.createdAt?.seconds ?? 0;
        const tb = b.createdAt?.seconds ?? 0;
        return ta - tb;
      });
      setTeamMembers(sorted);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Separate founders (those marked as isFounder, or fallback to first 3)
  const founders = teamMembers.some(m => m.isFounder)
    ? teamMembers.filter(m => m.isFounder)
    : teamMembers.slice(0, 3);
  const fullTeam = teamMembers;



  const textRef = useRef(null);

  return (
    <>
      <FadeUp className="about-hero">
        <video autoPlay muted loop playsInline preload="auto" disablePictureInPicture className="hero-bg">
          <source src="assets/video/about-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1 className="hero-title">About Us</h1>
          <p className="hero-subtitle">Crafting Nature's Masterpieces</p>
        </div>
      </FadeUp>

      <section ref={textRef}>
        <div className="about-intro" style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--spacing-xxl) var(--spacing-md)', textAlign: 'center' }}>
          <div className="section-dot"></div>
          <h2 className="section-title" style={{ marginBottom: 'var(--spacing-sm)' }}>About Us</h2>
          <div className="about-subtitle" style={{ fontSize: '1.1rem', color: 'var(--color-accent)', marginBottom: 'var(--spacing-lg)', letterSpacing: '2px', fontWeight: '500' }}>Design . Construct . Maintain</div>

          <FadeUp>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: 'var(--color-text-light)', fontWeight: '300' }}>
              Green Realm Landscape, based in Thrissur and Kochi, stands as one of Kerala’s foremost landscaping and maintenance companies. Established in 2009, the company has built a strong reputation over the past 15 years by consistently delivering high-quality services and ensuring complete client satisfaction. This success is driven by a dedicated team of experienced, young, energetic, and passionate professionals who bring creativity and technical expertise to every project.
              <br /><br />
              The firm comprises skilled Landscape Architects, Landscape Engineers, Botanists, and well-trained landscape workers, all working together to create sustainable and aesthetically pleasing outdoor environments. Their collaborative approach ensures that every project reflects both functional excellence and natural beauty.
              <br /><br />
              Green Realm Landscape specializes in a wide range of projects, including residential landscapes, resorts, children’s parks, schools, and hospitality spaces. Their comprehensive services cover every stage of landscaping, from design and construction to long-term maintenance. In addition, the company offers expertise in hardscaping, mixed farming, horticulture consultancy, and irrigation hydraulic design and installation.
              <br /><br />
              With a continued commitment to superiority, integrity, and exceptional service, Green Realm Landscape has established itself as a trusted name in the industry, transforming outdoor spaces into vibrant and sustainable environments.
            </p>
          </FadeUp>
        </div>
      </section>

      <section>
        <FadeUp><h2 className="section-title">Our Story</h2></FadeUp>
        <div className="timeline">
          <FadeUp className="timeline-item">
            <h3>2022 - The Beginning</h3>
            <p>Founded with a vision to revolutionize urban landscapes through sustainable and aesthetic design.</p>
          </FadeUp>
          <FadeUp className="timeline-item">
            <h3>2023 - Recognition</h3>
            <p>Featured in Landscape International Magazine for our innovative approach to Miyawaki forests.</p>
          </FadeUp>
          <FadeUp className="timeline-item">
            <h3>2025 - Expanding Horizons</h3>
            <p>Shortlisted for prestigious architecture awards and completed our 100th project.</p>
          </FadeUp>
        </div>
      </section>

      {teamMembers.length > 0 && (
        <section style={{ textAlign: 'center', padding: '80px 40px' }}>

          {/* Section Header */}
          <FadeUp>
            <h2 style={{
              fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400, color: '#0f1a15', marginBottom: '60px',
            }}>Our Founders</h2>
          </FadeUp>

          {/* Founder Cards */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '32px',
            maxWidth: '1100px',
            margin: '0 auto',
          }}>
            {founders.map((member, index) => (
              <FadeUp key={member.id} className="team-card" style={{ flex: '0 0 auto' }}>
                <div className="team-img-wrapper">
                  <OptimizedImage
                    src={member.image || 'assets/team-members/placeholder.jpg'}
                    alt={member.name}
                    className="team-img"
                    width={320}
                    noBg
                  />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                {member.name === 'Sabu Mathew' && (
                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '12px' }}>
                    <a href="https://www.facebook.com/share/1BmRq29mBX/?mibextid=wwXIfr"
                      target="_blank" rel="noopener noreferrer"
                      style={{ color: '#6b7280', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#1877f2'}
                      onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                    >
                      <FaFacebookF size={18} />
                    </a>
                    <a href="https://www.instagram.com/sabu.m.mathew?igsh=MTVhb2VyNGhxOXIwNA%3D%3D&utm_source=qr"
                      target="_blank" rel="noopener noreferrer"
                      style={{ color: '#6b7280', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#e4405f'}
                      onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                    >
                      <FaInstagram size={18} />
                    </a>
                  </div>
                )}
                {member.name === 'Seema K Sabu' && (
                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '12px' }}>
                    <a href="https://www.facebook.com/share/1DuMcwgYp3/?mibextid=wwXIfr"
                      target="_blank" rel="noopener noreferrer"
                      style={{ color: '#6b7280', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#1877f2'}
                      onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                    >
                      <FaFacebookF size={18} />
                    </a>
                    <a href="https://www.instagram.com/seemaksabu2013?igsh=dWRiMXQwOXR0aWds"
                      target="_blank" rel="noopener noreferrer"
                      style={{ color: '#6b7280', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#e4405f'}
                      onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                    >
                      <FaInstagram size={18} />
                    </a>
                  </div>
                )}
                {member.name === 'Sibin.M.Sabu' && (
                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '12px' }}>
                    <a href="https://www.facebook.com/share/1DwMa1Yyxq/?mibextid=wwXIfr"
                      target="_blank" rel="noopener noreferrer"
                      style={{ color: '#6b7280', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#1877f2'}
                      onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                    >
                      <FaFacebookF size={18} />
                    </a>
                    <a href="https://www.instagram.com/sibin.m.sabu?igsh=dDFiYmVrZ2EzNTJo&utm_source=qr"
                      target="_blank" rel="noopener noreferrer"
                      style={{ color: '#6b7280', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#e4405f'}
                      onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                    >
                      <FaInstagram size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/sibin-m-sabu?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                      target="_blank" rel="noopener noreferrer"
                      style={{ color: '#6b7280', transition: 'color 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#0077b5'}
                      onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}
                    >
                      <FaLinkedinIn size={18} />
                    </a>
                  </div>
                )}
              </FadeUp>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{ marginTop: '56px' }}>
            <FadeUp>
              <button
                onClick={() => setShowGallery(true)}
                className="meet-team-btn"
              >
                Meet the Team
              </button>
            </FadeUp>
          </div>
        </section>
      )}

      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="team-gallery-overlay"
          >
            <div className="gallery-container" data-lenis-prevent>
              <div className="team-gallery-header">
                <h2 className="section-title">Our Dedicated Team</h2>
                <button onClick={() => setShowGallery(false)} className="close-gallery-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="gallery-content">
                <div className="team-gallery-grid">
                  {fullTeam.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="team-gallery-card"
                    >
                      <div className="team-gallery-img-wrapper">
                        <OptimizedImage
                          src={member.image || 'assets/team-members/placeholder.jpg'}
                          alt={member.name}
                          width={300}
                        />
                      </div>
                      <div className="team-gallery-info">
                        <h3>{member.name}</h3>
                        <p>{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ClientLogos />
    </>
  );
};

export default About;
