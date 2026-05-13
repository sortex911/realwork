import { useState, useEffect, useMemo, memo, useRef } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { m, AnimatePresence } from 'framer-motion';
import FadeUp from '../components/FadeUp';
import ImagesSlider from '../components/ImagesSlider';
import OptimizedImage from '../components/OptimizedImage';
import LazyVideo from '../components/LazyVideo';
import '../styles/portfolio.css';

// ─── Component ────────────────────────────────────────────────────────────────
// ─── Memoized Project Card ───────────────────────────────────────────────────
const ProjectCardItem = memo(({ project, onClick }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className="project-card"
      onClick={() => onClick(project)}
    >
      <div className={`project-img-container ${!loaded ? 'skeleton-loading' : ''}`} style={{ width: '100%', height: '100%' }}>
        {project.imageUrl ? (
          <OptimizedImage
            src={project.imageUrl}
            alt={project.title}
            className="project-img thumbnail"
            width={400}
            height={300}
            quality={60}
            objectFit="contain"
            noBg={true}
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <div className="project-img-placeholder">No Image</div>
        )}
      </div>
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <div className="view-details">View Gallery</div>
      </div>
    </div>
  );
});

// ─── Gallery Modal with Slider ──────────────────────────────────────────────
const GalleryItem = memo(({ url, project, idx, onOpen }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={`gallery-item-inner ${!loaded ? 'skeleton-loading' : ''}`}
      style={{ overflow: 'hidden', cursor: 'pointer' }}
      onClick={() => onOpen(url)}
    >
      <OptimizedImage
        src={url}
        alt={`${project.title} — photo ${idx + 1}`}
        className="gallery-img thumbnail"
        width={400}
        height={300}
        quality={60}
        objectFit="contain"
        noBg={true}
        onLoad={() => setLoaded(true)}
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
    // The "Nuclear" Body Lock
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalHeight = window.getComputedStyle(document.body).height;

    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';

    return () => {
      // Restore styles when gallery is closed
      document.body.style.overflow = originalStyle;
      document.body.style.height = originalHeight;
    };
  }, []);

  // Auto-sliding removed for static layout
  /*
  useEffect(() => {
    if (images.length <= 1 || fullscreenImage) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images, fullscreenImage, currentIndex]);
  */

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <m.div
      id="project-gallery"
      className="project-gallery active"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      style={{ zIndex: 2000000 }}
      onWheel={(e) => e.stopPropagation()} // Stop event propagation
    >
      <div className="gallery-hero">
        <div className="gallery-hero-bg-wrapper" style={{ position: 'absolute', inset: 0 }}>
          <OptimizedImage
            src={images[currentIndex]}
            alt={`${project.title} slide ${currentIndex + 1}`}
            priority={true}
            width={1920}
            height="100%"
            quality={80}
            className="gallery-hero-bg"
            objectFit="contain"
            noBg={true}
          />
        </div>

        <div className="gallery-hero-overlay" />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button className="gallery-nav-btn prev" onClick={prevImage} aria-label="Previous image">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button className="gallery-nav-btn next" onClick={nextImage} aria-label="Next image">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        <div className="gallery-hero-content">
          {/* Title and Description removed from here as per user request */}
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
          <span>{project.title} {project.location && `— ${project.location}`}</span>
          <div className="line" />
        </div>

        {(project.description || project.location) && (
          <div className="gallery-project-description">
            <p>{project.description}</p>
          </div>
        )}

        <div className="gallery-grid">
          {images.map((url, idx) => (
            <div key={idx} className="gallery-item">
              <GalleryItem url={url} project={project} idx={idx} onOpen={setFullscreenImage} />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Fullscreen Image View */}
      <AnimatePresence>
        {fullscreenImage && (
          <m.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(255,255,255,0.98)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-out',
              padding: '40px'
            }}
          >
            <OptimizedImage
              src={fullscreenImage}
              width={1200}
              height={1200}
              quality={90}
              objectFit="contain"
              noBg={true}
            />
            <button
              style={{
                position: 'absolute', top: '30px', right: '30px',
                background: 'white', color: 'black', border: '1px solid rgba(0,0,0,0.1)',
                width: '40px', height: '40px', borderRadius: '50%',
                fontSize: '1.5rem', cursor: 'pointer', display: 'flex',
                alignItems: 'center', justifyContent: 'center', padding: 0,
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              onClick={() => setFullscreenImage(null)}
            >
              &times;
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};

const CategoryTab = memo(({ cat, activeCategory, onClick }) => (
  <button
    className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
    onClick={() => onClick(cat.id)}
  >
    {cat.name}
  </button>
));

const Portfolio = () => {
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState(null);
  const [galleryActive, setGalleryActive] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(9); // For Infinite Scroll
  const loadMoreRef = useRef(null);
  const [parallaxImages] = useState([
    { src: 'assets/photos/4d869c_fa129e99a0ee407e9df27b3947046f28~mv2.webp', alt: 'Project 1' },
    { src: 'assets/photos/4d869c_dae3a776502b42a5a3a5b62b8d5dc682~mv2.webp', alt: 'Project 2' },
    { src: 'assets/photos/4d869c_d0b4c72f0a3c4dea96407244c270603e~mv2.webp', alt: 'Project 3' },
    { src: 'assets/photos/4d869c_9b23c6d326fc435ca07e746e0fcd668d~mv2.webp', alt: 'Project 4' },
    { src: 'assets/photos/4d869c_8d57d4542d144c39bcf43318c5ef8b8f~mv2.webp', alt: 'Project 5' },
    { src: 'assets/photos/4d869c_7fbf11bfac984a0b9ced41540874f37c~mv2.webp', alt: 'Project 6' },
    { src: 'assets/photos/4d869c_5b2a9aac04db4bbaa5b0b4d24245ae59~mv2.webp', alt: 'Project 7' },
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

  useEffect(() => {
    if (galleryActive) {
      document.body.classList.add('gallery-open');
    } else {
      document.body.classList.remove('gallery-open');
    }
    return () => document.body.classList.remove('gallery-open');
  }, [galleryActive]);

  // Support both "categoryId" (new admin docs) and "category" (legacy docs)
  const filteredProjects = useMemo(() => {
    return projects.filter(
      p => (p.categoryId ?? p.category) === activeCategory
    );
  }, [projects, activeCategory]);

  // Infinite Scroll Observer
  useEffect(() => {
    if (loading || filteredProjects.length <= visibleCount) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => prev + 9);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [loading, filteredProjects.length, visibleCount]);

  // Reset visible count when category changes
  useEffect(() => {
    setVisibleCount(9);
  }, [activeCategory]);

  // ── Gallery helpers ───────────────────────────────────────────────────────
  const openGallery = (project) => { setSelectedProject(project); setGalleryActive(true); };
  const closeGallery = () => setGalleryActive(false);

  const getCatName = (catId) =>
    categories.find(c => c.id === catId)?.name ?? catId ?? '—';

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="portfolio-page">

      <div className="portfolio-hero">
        <LazyVideo 
          src="https://res.cloudinary.com/daivsnmcc/video/upload/q_auto/f_auto/v1778673521/portfolio-hero_qsaqbr.webm" 
          className="hero-bg"
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
        />
        <FadeUp className="hero-content">
          <h1 className="hero-title">Work</h1>
          <p className="hero-subtitle">TRANSFORMING OUR SURROUNDINGS</p>
        </FadeUp>
      </div>

      {/* Category Tabs — hidden while loading */}
      {!loading && categories.length > 0 && (
        <div className="portfolio-nav-sticky">
          <div className="portfolio-tabs">
            {categories.map(cat => (
              <CategoryTab
                key={cat.id}
                cat={cat}
                activeCategory={activeCategory}
                onClick={(id) => { setActiveCategory(id); setGalleryActive(false); }}
              />
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '2.5rem 1rem', justifyItems: 'center' }}>
            {filteredProjects.length > 0 ? (
              <>
                {filteredProjects.slice(0, visibleCount).map(project => (
                  <ProjectCardItem
                    key={project.id}
                    project={project}
                    onClick={openGallery}
                  />
                ))}
                {filteredProjects.length > visibleCount && (
                  <div ref={loadMoreRef} style={{ height: '100px', width: '100%', gridColumn: '1/-1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="portfolio-spinner" style={{ width: '30px', height: '30px' }} />
                  </div>
                )}
              </>
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
