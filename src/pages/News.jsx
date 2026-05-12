import React, { useState, useEffect } from 'react';
import FadeUp from '../components/FadeUp';
import '../styles/news.css';
import { m, AnimatePresence } from 'framer-motion';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { COL_NEWS, NEWS_CAT_PUBLICATIONS, NEWS_CAT_INTERVIEWS, NEWS_CAT_ONLINE } from '../services/adminService';
import ImagesSlider from '../components/ImagesSlider';
import ZoomParallax from '../components/ZoomParallax';
import OptimizedImage from '../components/OptimizedImage';

const News = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    if (!db) return;
    const q = query(collection(db, COL_NEWS), orderBy('createdAt', 'desc'));
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
      setNewsItems(sorted);
    });
    return () => unsub();
  }, []);

  const publications = newsItems.filter(item => item.category === NEWS_CAT_PUBLICATIONS);
  const interviews = newsItems.filter(item => item.category === NEWS_CAT_INTERVIEWS);
  const onlineFeatures = newsItems.filter(item => item.category === NEWS_CAT_ONLINE);

  const parallaxImages = [
    { src: 'assets/photos/4d869c_429057ecc06b468884e3dcd4d4322ef9~mv2.avif', alt: 'Project 1' },
    { src: 'assets/photos/4d869c_43586056fb6e4dbfac20c5d3ae97cab9~mv2.avif', alt: 'Project 2' },
    { src: 'assets/photos/4d869c_43f23646b7334147a3123d790fb7aab3~mv2.avif', alt: 'Project 3' },
    { src: 'assets/photos/4d869c_5b2a9aac04db4bbaa5b0b4d24245ae59~mv2.avif', alt: 'Project 4' },
    { src: 'assets/photos/4d869c_7fbf11bfac984a0b9ced41540874f37c~mv2.avif', alt: 'Project 5' },
    { src: 'assets/photos/4d869c_8d57d4542d144c39bcf43318c5ef8b8f~mv2.avif', alt: 'Project 6' },
    { src: 'assets/photos/4d869c_9b23c6d326fc435ca07e746e0fcd668d~mv2.avif', alt: 'Project 7' },
  ];

  return (
    <>
      <div style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        margin: 0,
        padding: 0
      }}>
        <ImagesSlider
          images={parallaxImages.map(img => img.src)}
          autoplay={true}
          direction="up"
          overlay={true}
        >
          <div style={{
            textAlign: 'center',
            color: '#fff',
            zIndex: 50,
            position: 'relative',
            padding: '0 20px'
          }}>
            <h1 style={{
              fontSize: '50px',
              fontFamily: 'var(--font-sans)',
              marginBottom: '1rem',
              textShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>Press & News</h1>
          </div>
        </ImagesSlider>
      </div>

      <ZoomParallax images={parallaxImages} />

      {publications.length > 0 && (
        <section className="news-section">
          <FadeUp><h2 className="news-category-title">Recent Publications</h2></FadeUp>
          <div className="news-grid">
            {publications.map((item, i) => (
              <FadeUp key={item.id} className="news-card">
                <div
                  className="news-card-img-wrapper"
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => setSelectedImg(item.image)}
                >
                  <OptimizedImage 
                    src={item.image} 
                    alt={item.title} 
                    className="news-card-img" 
                    width={500}
                    height={400}
                    quality={70}
                  />
                </div>
                <div className="news-card-content">
                  <div className="news-card-meta">
                    <span className="news-card-date">{item.date}</span>
                  </div>
                  <h3 className="news-card-title">{item.title}</h3>
                  <p className="news-card-location">{item.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>
      )}

      {interviews.length > 0 && (
        <section className="news-section" style={{ paddingTop: 0 }}>
          <FadeUp><h2 className="news-category-title">Media Interviews</h2></FadeUp>
          <div className="news-grid">
            {interviews.map((item) => (
              <FadeUp key={item.id} className="news-card">
                <div
                  className="news-card-img-wrapper"
                  style={{ cursor: 'pointer' }}
                  onClick={() => window.open(item.link, '_blank')}
                >
                  <OptimizedImage 
                    src={item.image} 
                    alt={item.title} 
                    className="news-card-img" 
                    width={500}
                    height={400}
                    quality={70}
                  />
                  <div className="video-play-overlay">
                    <div className="video-play-icon" style={{ scale: 0.8 }}>
                      <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </div>
                <div className="news-card-content">
                  <div className="news-card-meta">
                    <span className="news-card-date">{item.date}</span>
                  </div>
                  <h3 className="news-card-title">{item.title}</h3>
                  <p className="news-card-location">{item.text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>
      )}

      {onlineFeatures.length > 0 && (
        <section className="news-section" style={{ paddingTop: 0 }}>
          <FadeUp><h2 className="news-category-title">Online Features</h2></FadeUp>
          <div className="featured-story-container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="news-grid">
              {onlineFeatures.map((item) => (
                <FadeUp
                  key={item.id}
                  className="news-card"
                  style={{ cursor: 'pointer' }}
                  onClick={() => window.open(item.link, '_blank')}
                >
                  <div className="news-card-img-wrapper">
                    <OptimizedImage 
                      src={item.image} 
                      alt={item.title} 
                      className="news-card-img" 
                      width={500}
                      height={400}
                      quality={70}
                    />
                  </div>
                  <div className="news-card-content">
                    <div className="news-card-meta">
                      <span className="news-card-date">{item.date}</span>
                    </div>
                    <h3 className="news-card-title">{item.title}</h3>
                    <p className="news-card-location">{item.text}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            style={{
              position: 'fixed',
              top: 0, left: 0,
              width: '100%', height: '100%',
              backgroundColor: 'rgba(0,0,0,0.9)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out',
              padding: '40px'
            }}
          >
            <OptimizedImage
              src={selectedImg}
              alt="Enlarged view"
              width={1200}
              height={1200}
              quality={85}
              objectFit="contain"
              noBg={true}
            />
            <button
              onClick={() => setSelectedImg(null)}
              style={{
                position: 'absolute',
                top: '20px', right: '20px',
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px', height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default News;

