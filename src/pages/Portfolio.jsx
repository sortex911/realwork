import { useState } from 'react';
import FadeUp from '../components/FadeUp';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('residence');
  const [galleryActive, setGalleryActive] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'residence', label: 'Residence Landscape Projects' },
    { id: 'resort', label: 'Resort Landscape' },
    { id: 'commercial', label: 'Commercial Landscape' },
    { id: 'interior', label: 'Interior Landscape Projects' },
    { id: 'terrace', label: 'Terrace Garden' },
    { id: 'butterfly', label: 'Butterfly and Miyawaki Garden' },
    { id: 'public', label: 'Public and Park Landscape' },
    { id: 'international', label: 'International Landscape' },
    { id: 'institutions', label: 'Institutions Landscape' },
    { id: 'large-scale', label: 'Large Scale Projects' },
  ];

  const projects = [
    // --- RESIDENCE PROJECTS (60) ---
    { id: 1, title: 'Mr. Thrimurthy Landscape Tamil Nadu', category: 'residence', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800'] },
    { id: 2, title: 'Mr. Jeeth Anand', category: 'residence', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1513584684374-8bdb74838a0f?q=80&w=800', 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800'] },
    { id: 3, title: 'Mr. Alvin Pala Landscape Kottayam', category: 'residence', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=800', 'https://images.unsplash.com/photo-1599809278530-4318ee161ac0?q=80&w=800'] },
    { id: 4, title: 'Residence Project 4', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 5, title: 'Residence Project 5', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 6, title: 'Residence Project 6', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 7, title: 'Residence Project 7', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 8, title: 'Residence Project 8', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 9, title: 'Residence Project 9', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 10, title: 'Residence Project 10', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 11, title: 'Residence Project 11', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 12, title: 'Residence Project 12', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 13, title: 'Residence Project 13', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 14, title: 'Residence Project 14', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 15, title: 'Residence Project 15', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 16, title: 'Residence Project 16', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 17, title: 'Residence Project 17', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 18, title: 'Residence Project 18', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 19, title: 'Residence Project 19', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 20, title: 'Residence Project 20', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 21, title: 'Residence Project 21', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 22, title: 'Residence Project 22', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 23, title: 'Residence Project 23', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 24, title: 'Residence Project 24', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 25, title: 'Residence Project 25', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 26, title: 'Residence Project 26', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 27, title: 'Residence Project 27', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 28, title: 'Residence Project 28', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 29, title: 'Residence Project 29', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 30, title: 'Residence Project 30', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 31, title: 'Residence Project 31', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 32, title: 'Residence Project 32', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 33, title: 'Residence Project 33', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 34, title: 'Residence Project 34', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 35, title: 'Residence Project 35', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 36, title: 'Residence Project 36', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 37, title: 'Residence Project 37', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 38, title: 'Residence Project 38', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 39, title: 'Residence Project 39', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 40, title: 'Residence Project 40', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 41, title: 'Residence Project 41', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 42, title: 'Residence Project 42', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 43, title: 'Residence Project 43', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 44, title: 'Residence Project 44', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 45, title: 'Residence Project 45', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 46, title: 'Residence Project 46', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 47, title: 'Residence Project 47', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 48, title: 'Residence Project 48', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 49, title: 'Residence Project 49', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 50, title: 'Residence Project 50', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 51, title: 'Residence Project 51', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 52, title: 'Residence Project 52', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 53, title: 'Residence Project 53', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 54, title: 'Residence Project 54', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 55, title: 'Residence Project 55', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 56, title: 'Residence Project 56', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 57, title: 'Residence Project 57', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 58, title: 'Residence Project 58', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 59, title: 'Residence Project 59', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },
    { id: 60, title: 'Residence Project 60', category: 'residence', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1600585154340-be6199f7d209?q=80&w=800'] },

    // --- OTHER PROJECTS ---
    { id: 101, title: 'Azure Wellness Resort', category: 'resort', img: 'https://images.unsplash.com/photo-1499803270242-467f08117f16?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800'] },
    { id: 102, title: 'Mist Valley Munnar', category: 'resort', img: 'https://images.unsplash.com/photo-1590523741491-258a94e97e79?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1590523741491-258a94e97e79?q=80&w=800'] },
    { id: 103, title: 'Tech Park Greens', category: 'commercial', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4ce88?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800'] },
    { id: 104, title: 'Lobby Green Wall', category: 'interior', img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1530633762170-1bc6e34360e2?q=80&w=800'] },
    { id: 105, title: 'Skyline Retreat', category: 'terrace', img: 'https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1586724230410-662580795c4b?q=80&w=800'] },
    { id: 106, title: 'Biodiversity Hub', category: 'butterfly', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=600', gallery: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800'] },
  ];

  const openGallery = (project) => {
    setSelectedProject(project);
    setGalleryActive(true);
  };

  const closeGallery = () => {
    setGalleryActive(false);
  };

  const filteredProjects = projects.filter(p => p.category === activeCategory);

  return (
    <div className="portfolio-page">
      <FadeUp className="portfolio-hero">
        <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000" alt="Portfolio Hero" className="hero-bg" />
        <div className="hero-content">
          <h1 className="hero-title">Our Work</h1>
          <p className="hero-subtitle">Curated Landscaping Excellence</p>
        </div>
      </FadeUp>

      <div className="portfolio-nav-sticky">
        <div className="portfolio-tabs">
          {categories.map(cat => (
            <button 
              key={cat.id} 
              className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => { setActiveCategory(cat.id); setGalleryActive(false); }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <section id="portfolio-main">
        <div className="portfolio-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <FadeUp key={project.id} className="project-card" onClick={() => openGallery(project)}>
                <img src={project.img} alt={project.title} className="project-img" />
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

        {galleryActive && selectedProject && (
          <div id="project-gallery" className="project-gallery active">
            <div className="gallery-header">
              <div className="gallery-title-group">
                <span className="gallery-category">{categories.find(c => c.id === selectedProject.category)?.label}</span>
                <h2 className="gallery-title">{selectedProject.title}</h2>
              </div>
              <button className="close-gallery" onClick={closeGallery}>
                <span>Close</span> &times;
              </button>
            </div>
            <div className="gallery-grid">
              {selectedProject.gallery?.map((img, i) => (
                <FadeUp key={i} className="gallery-item">
                  <img src={img} alt={`${selectedProject.title} detail ${i + 1}`} loading="lazy" />
                </FadeUp>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Portfolio;
