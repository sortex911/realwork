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
  const [selectedFounder, setSelectedFounder] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const founderDetails = {
    'Sibin.M.Sabu': {
      fullName: 'Sibin M. Sabu',
      role: 'Principal Architect, Kochi',
      bio: `Completed Architecture graduate specialized in Landscape Architecture, with hands-on experience across diverse landscape projects and scales. He has worked under the guidance of renowned architect Ar. B. V. Doshi (Sangath, Ahmedabad) and respected architects in Kerala.

His project experience spans residential landscapes, resorts, parks, schools, herbal gardens, butterfly gardens, edible landscapes, Miyawaki forests, design sensibility, technical expertise, and adaptability across context.`
    },
    'Sabu Mathew': {
      fullName: 'Sabu Mathew',
      role: 'Landscape Engineer, Thrissur',
      bio: `He has over 30 years of experience in the landscape field, including 20 years as a Landscaping Engineer and Consultant with multinational companies such as Saudi ARAMCO, WESCO (England), and KEO International Consultants (UAE). He founded the firm in 2009, and for the past 14 years it has maintained a strong commitment to quality, integrity, and excellence, delivering projects across residences, resorts, parks, institutions, gardens, Miyawaki, and government sectors.`
    },
    'Seema K Sabu': {
      fullName: 'Seema K Sabu',
      role: 'Horticulturist, Thrissur',
      bio: `She graduated in 1986 with a degree in Horticulture from Thrissur. With a deep interest in plant studies, her extensive knowledge and experience are a true asset to our firm. She is the key decision-maker for all plant selection and horticultural aspects of our projects. She has collaborated on projects of various scales and plays a major role in site supervision and ongoing project maintenance, ensuring long-term health and quality of the landscape.`
    }
  };

  useEffect(() => {
    if (showGallery || selectedFounder) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'unset';
    };
  }, [showGallery, selectedFounder]);

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
      <div className="about-hero">
        <video autoPlay muted loop playsInline preload="auto" disablePictureInPicture className="hero-bg">
          <source src="assets/video/about-hero.mp4" type="video/mp4" />
        </video>
        <FadeUp className="hero-content">
          <h1 className="hero-title">About Us</h1>
          <p className="hero-subtitle">Transforming our surroundings</p>
        </FadeUp>
      </div>

      <section ref={textRef}>
        <div className="about-intro" style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--spacing-xxl) var(--spacing-md)', textAlign: 'center' }}>
          <div className="section-dot"></div>
          <h2 className="section-title" style={{ marginBottom: 'var(--spacing-sm)' }}>About Us</h2>
          <div className="about-subtitle" style={{ fontSize: '1.1rem', color: 'var(--color-accent)', marginBottom: 'var(--spacing-lg)', letterSpacing: '2px', fontWeight: '500' }}>Design . Construct . Maintain</div>

          <FadeUp>
            <div style={{ fontSize: '1.2rem', lineHeight: '1.9', color: 'var(--color-text-light)', fontWeight: '300', display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <p style={{ maxWidth: 'none' }}>
                Founded in 2009 and based in Thrissur and Kochi, Green Realm Landscape has emerged as one of Kerala’s leading landscape architecture firms. Over the past 15 years, the company has earned a strong reputation for delivering high-quality landscaping solutions with a focus on innovation, sustainability, and complete client satisfaction.
              </p>
              <p style={{ maxWidth: 'none' }}>
                The success of Green Realm Landscape is driven by a dedicated team of experienced, young, energetic, and passionate professionals who bring creativity and technical expertise to every project. The firm comprises skilled Landscape Architects, Landscape Engineers, Botanists, and well-trained landscape workers who work collaboratively to create outdoor environments that are both functional and aesthetically inspiring.
              </p>
              <p style={{ maxWidth: 'none' }}>
                Green Realm Landscape specializes in a diverse range of projects, including residential landscapes, resorts, children’s parks, educational institutions, and hospitality spaces. Their comprehensive services encompass every stage of landscaping — from conceptual design and construction to long-term maintenance.
              </p>
              <p style={{ maxWidth: 'none' }}>
                In addition to landscape architecture, the company offers expertise in hardscaping, mixed farming, horticulture consultancy, irrigation systems, and hydraulic design and installation. With an unwavering commitment to quality, integrity, and exceptional service, Green Realm Landscape continues to transform outdoor spaces into vibrant, sustainable, and enduring environments.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <section>
        <FadeUp><h2 className="section-title">Our Story</h2></FadeUp>
        <div className="timeline">
          <FadeUp className="timeline-item">
            <h3>2012 – The Beginning</h3>
            <p>Founded by Sabu Mathew as Green City, with a mission to provide sustainable landscape solutions.</p>
          </FadeUp>
          <FadeUp className="timeline-item">
            <h3>2017 – A Shared Vision</h3>
            <p>Sibin M. Sabu and Sabu Mathew came together to expand the firm with a combined vision for design, horticulture, and context-based landscape solutions.</p>
          </FadeUp>
          <FadeUp className="timeline-item">
            <h3>2019 – Formation of Green Realm Landscape</h3>
            <p>Green Realm Landscape was established with a vision to explore new approaches in landscape design, focusing on low-maintenance, sustainable, and environment-responsive solutions based on the site context and surrounding ecology.</p>
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
          <div className="founders-grid">
            {founders.map((member, index) => (
              <FadeUp
                key={member.id}
                className="team-card"
                onClick={() => setSelectedFounder(member)}
              >
                <div className="team-img-wrapper">
                  <OptimizedImage
                    src={member.image || 'assets/team-members/placeholder.jpg'}
                    alt={member.name}
                    className="team-img"
                    width={320}
                    noBg
                    objectPosition="center bottom"
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
        {selectedFounder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="founder-modal-overlay"
            onClick={() => setSelectedFounder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="founder-modal-content"
              onClick={e => e.stopPropagation()}
            >
              <button
                className="founder-modal-close"
                onClick={() => setSelectedFounder(null)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <div className="founder-modal-image">
                <OptimizedImage
                  src={selectedFounder.image || 'assets/team-members/placeholder.jpg'}
                  alt={selectedFounder.name}
                  width={400}
                />
              </div>

              <div className="founder-modal-info">
                <h2>{founderDetails[selectedFounder.name]?.fullName || selectedFounder.name}</h2>
                <span className="role">{founderDetails[selectedFounder.name]?.role || selectedFounder.role}</span>
                <div className="founder-modal-bio">
                  {founderDetails[selectedFounder.name]?.bio || "Biography details coming soon."}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                          objectPosition="center bottom"
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

    </>
  );
};

export default About;
