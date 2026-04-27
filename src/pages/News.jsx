import FadeUp from '../components/FadeUp';

const News = () => {
  const magazineHighlights = [
    { date: 'December 08, 2023', title: 'Landscape International Magazine', excerpt: 'A deep dive into our innovative approach to urban landscaping and Miyawaki forests.', img: 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=800' },
    { date: 'January 02, 2025', title: 'Kerala Samarambham Magazine', excerpt: 'Featured as one of the fastest-growing landscape architecture firms in the region.', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800' },
  ];

  const awards = [
    { date: 'January 16, 2025', title: 'Manorama Veedu Architecture Award', excerpt: 'Firm shortlisted for the prestigious Manorama Veedu Architecture Award for excellence in landscape design.', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800' },
    { date: 'January 16, 2025', title: '100+ Projects Milestone', excerpt: 'Celebrating the successful completion of over 100 premium landscaping projects in just 3 years.', img: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800' },
  ];

  return (
    <>
      <FadeUp className="news-hero">
        <div className="hero-content" style={{ color: 'var(--color-text)' }}>
          <h1 className="hero-title">Press & News</h1>
          <p className="hero-subtitle" style={{ color: 'var(--color-text-light)' }}>Discover our latest features</p>
        </div>
      </FadeUp>

      <section>
        <FadeUp><h2 className="news-category-title">Magazine Highlights</h2></FadeUp>
        <div className="news-grid">
          {magazineHighlights.map((item, i) => (
            <FadeUp key={i} className="news-card">
              <img src={item.img} alt={item.title} className="news-card-img" />
              <div className="news-card-content">
                <span className="news-card-date">{item.date}</span>
                <h3 className="news-card-title">{item.title}</h3>
                <p className="news-card-excerpt">{item.excerpt}</p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp><h2 className="news-category-title">Awards & Recognitions</h2></FadeUp>
        <div className="news-grid">
          {awards.map((item, i) => (
            <FadeUp key={i} className="news-card">
              <img src={item.img} alt={item.title} className="news-card-img" />
              <div className="news-card-content">
                <span className="news-card-date">{item.date}</span>
                <h3 className="news-card-title">{item.title}</h3>
                <p className="news-card-excerpt">{item.excerpt}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
};

export default News;
