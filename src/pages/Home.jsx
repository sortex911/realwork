
import React, { useRef, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import FadeUp from '../components/FadeUp';
import ClientStories from '../components/ClientStories';
import ClientLogos from '../components/ClientLogos';
import { collection, query, where, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { COL_NEWS, NEWS_CAT_RECENT } from '../services/adminService';
import { Typewriter } from '../components/Typewriter';
import ServiceCard from '../components/ServiceCard';
import OptimizedImage from '../components/OptimizedImage';

const Home = () => {
  const containerRef = useRef(null);

  const [news, setNews] = useState([]);
  const [firstComplete, setFirstComplete] = useState(false);

  useEffect(() => {
    if (!db) return;
    const q = query(
      collection(db, COL_NEWS),
      where('category', '==', NEWS_CAT_RECENT)
    );
    const unsub = onSnapshot(q, (snap) => {
      const fetched = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const sorted = fetched.sort((a, b) => {
        const orderA = a.order ?? 999;
        const orderB = b.order ?? 999;
        if (orderA !== orderB) return orderA - orderB;
        const timeA = a.createdAt?.seconds ?? 0;
        const timeB = b.createdAt?.seconds ?? 0;
        return timeB - timeA;
      });
      setNews(sorted);
    });
    return () => unsub();
  }, []);

  const allPhotos = [
    "/assets/photos/4d869c_429057ecc06b468884e3dcd4d4322ef9~mv2.avif",
    "/assets/photos/4d869c_43586056fb6e4dbfac20c5d3ae97cab9~mv2.avif",
    "/assets/photos/4d869c_43f23646b7334147a3123d790fb7aab3~mv2.avif",
    "/assets/photos/4d869c_5b2a9aac04db4bbaa5b0b4d24245ae59~mv2.avif",
    "/assets/photos/4d869c_7fbf11bfac984a0b9ced41540874f37c~mv2.avif",
    "/assets/photos/4d869c_8d57d4542d144c39bcf43318c5ef8b8f~mv2.avif",
    "/assets/photos/4d869c_9b23c6d326fc435ca07e746e0fcd668d~mv2.avif",
    "/assets/photos/4d869c_d0b4c72f0a3c4dea96407244c270603e~mv2.avif",
    "/assets/photos/4d869c_dae3a776502b42a5a3a5b62b8d5dc682~mv2.avif",
    "/assets/photos/4d869c_fa129e99a0ee407e9df27b3947046f28~mv2.avif"
  ];

  const services = [
    {
      title: 'Landscape Consultation', desc: 'Professional landscape consultation by expert architects and horticulturists, offering expert guidance to transform your outdoor spaces with sustainable and aesthetic landscaping solutions.', icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5(6.1 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
      ),
      images: [allPhotos[0], allPhotos[1], allPhotos[2]]
    },
    {
      title: 'Terrace Garden', desc: 'Designing and creating lush terrace gardens that maximize green space, enhance air quality, and bring nature closer to urban living.', icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10v14" /><path d="M3 3h18v7H3z" /><path d="M8 10v6" /><path d="M16 10v4" /></svg>
      ),
      images: [allPhotos[3], allPhotos[4], allPhotos[5]]
    },
    {
      title: 'Butterfly Garden', desc: 'Creating vibrant butterfly gardens that attract and nurture pollinators by incorporating native plants, nectar sources, and natural habitats, enhancing biodiversity and ecological balance.', icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 12-4-4" /><path d="M12 12c-4-4-8-4-8-8 4 0 8 4 8 8Z" /><path d="M12 12c4-4 8-4 8-8-4 0-8 4-8 8Z" /><path d="m12 12 4 4" /><path d="M12 12c-4 4-8 4-8 8 4 0 8-4 8-8Z" /><path d="M12 12c4 4 8 4 8 8-4 0-8-4-8-8Z" /></svg>
      ),
      images: [allPhotos[6], allPhotos[7], allPhotos[8]]
    },
    {
      title: 'Miyawaki Forest', desc: 'Developing dense, fast-growing Miyawaki forests using native plant species to restore biodiversity, improve air quality, and create a self-sustaining green ecosystem.', icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-6" /><path d="m8 16 4-6 4 6" /><path d="m5 12 7-8 7 8" /><path d="M12 22a8 8 0 0 0-8-8v-2a10 10 0 0 1 20 0v2a8 8 0 0 0-8 8Z" /></svg>
      ),
      images: [allPhotos[9], allPhotos[0], allPhotos[1]]
    },
    {
      title: 'Irrigation Design', desc: 'Designing and implementing efficient irrigation systems that optimize water usage, support plant health, and ensure sustainable, low-maintenance landscapes.', icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6" /><path d="M8 4l4-2 4 2" /><path d="M4 14a8 8 0 0 0 16 0" /><path d="M4 14h16" /></svg>
      ),
      images: [allPhotos[2], allPhotos[3], allPhotos[4]]
    },
    {
      title: 'Landscape Maintenance', desc: 'Providing expert landscape maintenance services to ensure healthy, thriving, and well-manicured outdoor spaces through regular care, pruning, and sustainable practices.', icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21c.5-4.5 2.5-8 7-10" /><path d="M12 11c4.5 2 6.5 5.5 7 10" /><path d="M12 21v-3" /><path d="M12 11a5 5 0 0 0-5-5h0a5 5 0 0 1 10 0h0a5 5 0 0 0-5 5Z" /></svg>
      ),
      images: [allPhotos[5], allPhotos[6], allPhotos[7]]
    },
  ];

  return (
    <>
      <Helmet>
        <title>Best Landscape Architects & Designers in Kerala | Green Realm</title>
        <meta name="description" content="Green Realm Landscape is the best landscape firm in Kerala. We specialize in tropical landscaping, butterfly gardens, and Miyawaki forests. Hire the best landscape consultants today." />
        <meta name="keywords" content="best landscaping website, best Landscape Architects in kerala, Landscape Architects Kerala, Best Landscape Firm in Kerala, Tropical Landscaper kerala, Best Tropical Consultant in Kerala, Best Landscaper, Butterfly garden Kerala, Miyawaki Kerala, best Landscape consultant kerala, Best Landscape Designers kerala" />
        <link rel="canonical" href="https://www.greenrealmlandscape.com/" />
      </Helmet>
      <FadeUp className="hero">
        <video autoPlay muted loop playsInline preload="auto" disablePictureInPicture className="hero-bg">
          <source src="assets/video/home-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-content" ref={containerRef} style={{ position: 'relative' }}>
          <h1 className="hero-title" style={{ color: '#ffffff' }}>
            <Typewriter 
              words={['Let’s celebrate landscape']} 
              speed={150} 
              loop={false}
              cursor={false}
              mode="glitch"
              onComplete={() => setFirstComplete(true)}
            />
            <br />
            {firstComplete && (
              <Typewriter 
                words={['Landscape with us']} 
                speed={100} 
                delayBetweenWords={1000}
                loop={false}
                cursor={true}
                cursorChar="_"
                mode="typewriter"
              />
            )}

          </h1>
          <p className="hero-subtitle"></p>
        </div>
      </FadeUp>

      <section id="news" className="news-section">
        <FadeUp>
          <div className="section-header">
            <span className="line"></span>
            <h2 className="section-title-small">RECENT NEWS</h2>
            <span className="line"></span>
          </div>
        </FadeUp>
        <div className="news-grid-new">
          {news.map((item) => (
            <div key={item.id} className="news-card-minimal" style={{
              opacity: 1,
              padding: '0 20px'
            }}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '4rem',
                fontStyle: 'italic',
                opacity: 0.1,
                marginBottom: '5px',
                color: 'var(--color-text)',
                lineHeight: 1
              }}>{item.title}</div>

              <div style={{
                color: 'var(--color-accent)',
                fontSize: '0.75rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                letterSpacing: '3px',
                opacity: 0.7,
                textTransform: 'uppercase'
              }}>{item.date}</div>

              <p style={{
                fontSize: '1rem',
                lineHeight: '1.7',
                color: 'var(--color-text)',
                opacity: 0.9,
                margin: '0 auto',
                maxWidth: '300px'
              }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services">
        <FadeUp><h2 className="section-title">Services</h2></FadeUp>
        <div className="services-grid-new">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.desc}
              icon={service.icon}
              images={service.images}
            />
          ))}
        </div>
      </section>

      <div style={{ marginTop: '100px' }}>
        <ClientStories />
        <div style={{ marginTop: '100px' }}>
          <ClientLogos />
        </div>
      </div>


      <FadeUp>
        <OptimizedImage
          src="assets/home-images/imgland.png"
          alt="Landscape Architecture"
          className="full-width-img"
          width={1550}
        />
      </FadeUp>
    </>
  );
};

export default Home;
