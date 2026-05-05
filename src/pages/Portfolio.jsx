import { useState, useEffect, useMemo, memo } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import FadeUp from '../components/FadeUp';
import ImagesSlider from '../components/ImagesSlider';

// ─── Component ────────────────────────────────────────────────────────────────
// ─── Memoized Project Card ───────────────────────────────────────────────────
const ProjectCardItem = memo(({ project, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <FadeUp
      className="project-card"
      onClick={() => onClick(project)}
    >
      <div className={`project-img-container ${!loaded ? 'skeleton-loading' : ''}`} style={{ width: '100%', height: '100%' }}>
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="project-img"
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.6s ease' }}
          />
        ) : (
          <div className="project-img-placeholder">No Image</div>
        )}
      </div>
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <div className="view-details">View Gallery</div>
      </div>
    </FadeUp>
  );
});

// ─── Gallery Modal with Slider ──────────────────────────────────────────────
const GalleryItem = memo(({ url, project, idx, onOpen }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div 
      className={`gallery-item-inner ${!loaded ? 'skeleton-loading' : ''}`} 
      style={{ borderRadius: '12px', overflow: 'hidden', height: '100%', cursor: 'pointer' }}
      onClick={() => onOpen(url)}
    >
      <img 
        src={url} 
        alt={`${project.title} — photo ${idx + 1}`} 
        loading="lazy" 
        decoding="async"
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.8s ease' }}
      />
      <div className="gallery-item-overlay">
        <span>View Full</span>
      </div>
    </div>
  );
});

const GalleryModal = ({ project, onClose, getCatName }) => {
  const images = useMemo(() => {
    return (project.images?.length > 0 ? project.images : [project.imageUrl]).filter(Boolean);
  }, [project]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    if (images.length <= 1 || fullscreenImage) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images, fullscreenImage]);

  return (
    <div id="project-gallery" className="project-gallery active">
      <div className="gallery-hero">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${project.title} slide ${currentIndex + 1}`}
            className="gallery-hero-bg"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: [0.23, 1, 0.32, 1] }}
          />
        </AnimatePresence>
        
        <div className="gallery-hero-overlay" />
        
        <div className="gallery-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="gallery-category-badge">
              {getCatName(project.categoryId ?? project.category)}
            </span>
            <h1 className="gallery-hero-title">{project.title}</h1>
            {project.description && (
              <p className="gallery-hero-desc">{project.description}</p>
            )}
          </motion.div>
        </div>

        {images.length > 1 && (
          <div className="gallery-slider-dots">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`slider-dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        )}

        <button className="close-gallery-floating" onClick={onClose}>
          &times;
        </button>
      </div>

      <div className="gallery-body">
        <div className="gallery-section-label">
          <div className="line" />
          <span>Full Collection</span>
          <div className="line" />
        </div>
        
        <div className="gallery-grid">
          {images.map((url, idx) => (
            <FadeUp key={idx} className="gallery-item">
              <GalleryItem url={url} project={project} idx={idx} onOpen={setFullscreenImage} />
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Lightbox / Fullscreen Image View */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.95)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out',
              padding: '40px'
            }}
          >
            <motion.img 
              src={fullscreenImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
              }}
            />
            <button 
              style={{
                position: 'absolute', top: '30px', right: '30px',
                background: 'white', color: 'black', border: 'none',
                width: '40px', height: '40px', borderRadius: '50%',
                fontSize: '1.5rem', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyCenter: 'center', padding: 0
              }}
              onClick={() => setFullscreenImage(null)}
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Portfolio = () => {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState(null);
  const [galleryActive, setGalleryActive] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [parallaxImages] = useState([
    { src: 'assets/photos/4d869c_fa129e99a0ee407e9df27b3947046f28~mv2.avif', alt: 'Project 1' },
    { src: 'assets/photos/4d869c_dae3a776502b42a5a3a5b62b8d5dc682~mv2.avif', alt: 'Project 2' },
    { src: 'assets/photos/4d869c_d0b4c72f0a3c4dea96407244c270603e~mv2.avif', alt: 'Project 3' },
    { src: 'assets/photos/4d869c_9b23c6d326fc435ca07e746e0fcd668d~mv2.avif', alt: 'Project 4' },
    { src: 'assets/photos/4d869c_8d57d4542d144c39bcf43318c5ef8b8f~mv2.avif', alt: 'Project 5' },
    { src: 'assets/photos/4d869c_7fbf11bfac984a0b9ced41540874f37c~mv2.avif', alt: 'Project 6' },
    { src: 'assets/photos/4d869c_5b2a9aac04db4bbaa5b0b4d24245ae59~mv2.avif', alt: 'Project 7' },
  ]);

  const loading = loadingCats || loadingProjects;

  // ── Listener 1: categories ────────────────────────────────────────────────
  useEffect(() => {
    if (!db) {
      console.warn('[Portfolio] Firestore (db) is not initialised.');
      setLoadingCats(false);
      return;
    }

    const unsub = onSnapshot(
      collection(db, 'categories'),
      (snap) => {
        const cats = snap.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .sort((a, b) => {
            const oa = a.order ?? 999;
            const ob = b.order ?? 999;
            if (oa !== ob) return oa - ob;
            return (a.name ?? '').localeCompare(b.name ?? '');
          });

        console.log('[Portfolio] Categories loaded:', cats.length);
        setCategories(cats);
        setActiveCategory(prev => prev || cats[0]?.id || '');
        setLoadingCats(false);
      },
      (err) => {
        console.error('[Portfolio] categories snapshot error:', err);
        setError('Failed to load categories. Please try refreshing.');
        setLoadingCats(false);
      }
    );

    return () => unsub();
  }, []);

  // ── Listener 2: projects ──────────────────────────────────────────────────
  useEffect(() => {
    if (!db) {
      console.warn('[Portfolio] Firestore (db) is not initialised.');
      setLoadingProjects(false);
      return;
    }

    const unsub = onSnapshot(
      collection(db, 'projects'),
      (snap) => {
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));

        const sorted = data.sort((a, b) => {
          const oa = a.order ?? 999;
          const ob = b.order ?? 999;
          if (oa !== ob) return oa - ob;
          const ta = a.createdAt?.seconds ?? 0;
          const tb = b.createdAt?.seconds ?? 0;
          return tb - ta;
        });

        console.log('[Portfolio] Projects loaded:', sorted.length);
        setProjects(sorted);
        setLoadingProjects(false);
      },
      (err) => {
        console.error('[Portfolio] projects snapshot error:', err);
        setError('Failed to load projects. Please try refreshing.');
        setLoadingProjects(false);
      }
    );

    return () => unsub();
  }, []);

  // Support both "categoryId" (new admin docs) and "category" (legacy docs)
  const filteredProjects = projects.filter(
    p => (p.categoryId ?? p.category) === activeCategory
  );

  // ── Gallery helpers ───────────────────────────────────────────────────────
  const openGallery = (project) => { setSelectedProject(project); setGalleryActive(true); };
  const closeGallery = () => setGalleryActive(false);

  const getCatName = (catId) =>
    categories.find(c => c.id === catId)?.name ?? catId ?? '—';

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="portfolio-page">

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
              fontSize: 'clamp(3.5rem, 10vw, 7rem)',
              fontFamily: 'var(--font-serif)',
              marginBottom: '1rem',
              textShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>Our Work</h1>
            <p style={{
              fontSize: '1.2rem',
              opacity: 0.9,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: '500',
              textShadow: '0 2px 5px rgba(0,0,0,0.3)'
            }}>Curated Landscaping Excellence</p>
          </div>
        </ImagesSlider>
      </div>

      {/* Category Tabs — hidden while loading */}
      {!loading && categories.length > 0 && (
        <div className="portfolio-nav-sticky">
          <div className="portfolio-tabs">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => { setActiveCategory(cat.id); setGalleryActive(false); }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div style={{
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)',
          color: '#ef4444', padding: '0.75rem 1.5rem', textAlign: 'center',
          fontSize: '0.9rem'
        }}>
          {error}
        </div>
      )}

      {/* Projects grid */}
      <section id="portfolio-main">
        {loading ? (
          <div className="portfolio-loading">
            <div className="portfolio-spinner" />
            <p>Loading projects…</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="no-projects">
            <p>No projects found. Add your first project from the Admin Dashboard.</p>
          </div>
        ) : (
          <div className="portfolio-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <ProjectCardItem
                  key={project.id}
                  project={project}
                  onClick={openGallery}
                />
              ))
            ) : (
              <div className="no-projects">
                <p>No projects in this category yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Project Gallery Detail */}
        {galleryActive && selectedProject && (
          <GalleryModal 
            project={selectedProject} 
            onClose={closeGallery} 
            getCatName={getCatName} 
          />
        )}
      </section>
    </div>
  );
};

export default Portfolio;
