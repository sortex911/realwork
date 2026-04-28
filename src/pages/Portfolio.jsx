import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { db } from '../firebase';
import FadeUp from '../components/FadeUp';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('');
  const [galleryActive, setGalleryActive] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultCategories = [
    { id: 'residence', name: 'Residence Landscape Projects' },
    { id: 'resort', name: 'Resort Landscape' },
    { id: 'commercial', name: 'Commercial Landscape' },
    { id: 'interior', name: 'Interior Landscape Projects' },
    { id: 'terrace', name: 'Terrace Garden' },
    { id: 'butterfly', name: 'Butterfly and Miyawaki Garden' },
    { id: 'public', name: 'Public and Park Landscape' },
    { id: 'international', name: 'International Landscape' },
    { id: 'institutions', name: 'Institutions Landscape' },
    { id: 'large-scale', name: 'Large Scale Projects' }
  ];

  const defaultProjects = [
    { id: 'p1', category: 'residence', title: 'Modern Villa Pool', imageUrl: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800' },
    { id: 'p2', category: 'residence', title: 'Luxury Residence', imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800' },
    { id: 'p3', category: 'residence', title: 'Contemporary Pool', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800' },
  ];

  // ── Live Firestore listeners ──────────────────────────────────────────────
  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }

    const unsubCats = onSnapshot(collection(db, 'categories'), (snap) => {
      const dbCats = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      const finalCats = dbCats.length > 0 ? dbCats : defaultCategories;
      setCategories(finalCats);
      if (finalCats.length > 0 && !activeCategory) setActiveCategory(finalCats[0].id);
    });

    const unsubProjects = onSnapshot(
      query(collection(db, 'projects'), orderBy('createdAt', 'desc')),
      (snap) => {
        const dbProjects = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setProjects(dbProjects.length > 0 ? dbProjects : defaultProjects);
        setLoading(false);
      }
    );

    return () => { unsubCats(); unsubProjects(); };
  }, [activeCategory]);

  const openGallery = (project) => {
    setSelectedProject(project);
    setGalleryActive(true);
  };

  const closeGallery = () => setGalleryActive(false);

  const filteredProjects = projects.filter(p => (p.categoryId || p.category) === activeCategory);

  return (
    <div className="portfolio-page">
      <FadeUp className="portfolio-hero">
        <img
          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000"
          alt="Portfolio Hero"
          className="hero-bg"
        />
        <div className="hero-content">
          <h1 className="hero-title">Our Work</h1>
          <p className="hero-subtitle">Curated Landscaping Excellence</p>
        </div>
      </FadeUp>

      {/* Category tabs */}
      <div className="portfolio-nav-sticky">
        <div className="portfolio-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => { setActiveCategory(cat.id); setGalleryActive(false); }}
            >
              {cat.name || cat.label}
            </button>
          ))}
        </div>
      </div>

      <section id="portfolio-main">
        {loading ? (
          <div className="portfolio-loading">
            <div className="portfolio-spinner" />
            <p>Loading projects…</p>
          </div>
        ) : (
          <div className="portfolio-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map(project => (
                <FadeUp key={project.id} className="project-card" onClick={() => openGallery(project)}>
                  <img src={project.imageUrl} alt={project.title} className="project-img" loading="lazy" />
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="view-details">View Gallery</div>
                  </div>
                </FadeUp>
              ))
            ) : (
              <div className="no-projects">
                <p>Projects for this category will be updated soon.</p>
              </div>
            )}
          </div>
        )}

        {galleryActive && selectedProject && (
          <div id="project-gallery" className="project-gallery active">
            <div className="gallery-header">
              <div className="gallery-title-group">
                <span className="gallery-category">
                  {categories.find(c => c.id === (selectedProject.categoryId || selectedProject.category))?.name || 
                   categories.find(c => c.id === (selectedProject.categoryId || selectedProject.category))?.label}
                </span>
                <h2 className="gallery-title">{selectedProject.title}</h2>
                {selectedProject.description && (
                  <p className="gallery-description">{selectedProject.description}</p>
                )}
              </div>
              <button className="close-gallery" onClick={closeGallery}>
                <span>Close</span> &times;
              </button>
            </div>
            <div className="gallery-grid">
              <FadeUp className="gallery-item">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  loading="lazy"
                />
              </FadeUp>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Portfolio;
