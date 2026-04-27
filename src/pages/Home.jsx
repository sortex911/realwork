import FadeUp from '../components/FadeUp';

const Home = () => {
  const news = [
    { id: '01', date: '16 JANUARY 2025', text: '2025 Firm have been shortlisted for the Manorma Veedu Architecture Award for Landscape Design', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800' },
    { id: '02', date: '08 DECEMBER 2023', text: 'Work Featured on Platform Landscape International Landscape first Magazine 2023', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800' },
    { id: '03', date: '02 JANUARY 2025', text: 'Our Company was featured in Renowned Business Magazine in Kerala Samarambham 2024', img: 'https://images.unsplash.com/photo-1558904541-efa843a96f0f?q=80&w=800' },
    { id: '04', date: '16 JANUARY 2025', text: 'Completed More than 100 projects in Recent 3 years. Also completed Projects all over Kerala within 2024.', img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800' },
    { id: '05', date: '20 MARCH 2025', text: 'Our Landscape Engineering division received the Green Innovation Award for sustainable practices.', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4ce88?q=80&w=800' },
  ];

  const services = [
    { title: 'Landscape Consultation', desc: 'Professional landscape consultation by expert architects and horticulturists, offering expert guidance to transform your outdoor spaces with sustainable and aesthetic landscaping solutions.', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
    )},
    { title: 'Terrace Garden', desc: 'Designing and creating lush terrace gardens that maximize green space, enhance air quality, and bring nature closer to urban living.', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10v14" /><path d="M3 3h18v7H3z" /><path d="M8 10v6" /><path d="M16 10v4" /></svg>
    )},
    { title: 'Butterfly Garden', desc: 'Creating vibrant butterfly gardens that attract and nurture pollinators by incorporating native plants, nectar sources, and natural habitats, enhancing biodiversity and ecological balance.', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 12-4-4" /><path d="M12 12c-4-4-8-4-8-8 4 0 8 4 8 8Z" /><path d="M12 12c4-4 8-4 8-8-4 0-8 4-8 8Z" /><path d="m12 12 4 4" /><path d="M12 12c-4 4-8 4-8 8 4 0 8-4 8-8Z" /><path d="M12 12c4 4 8 4 8 8-4 0-8-4-8-8Z" /></svg>
    )},
    { title: 'Miyawaki Forest', desc: 'Developing dense, fast-growing Miyawaki forests using native plant species to restore biodiversity, improve air quality, and create a self-sustaining green ecosystem.', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22v-6" /><path d="m8 16 4-6 4 6" /><path d="m5 12 7-8 7 8" /><path d="M12 22a8 8 0 0 0-8-8v-2a10 10 0 0 1 20 0v2a8 8 0 0 0-8 8Z" /></svg>
    )},
    { title: 'Irrigation Design', desc: 'Designing and implementing efficient irrigation systems that optimize water usage, support plant health, and ensure sustainable, low-maintenance landscapes.', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6" /><path d="M8 4l4-2 4 2" /><path d="M4 14a8 8 0 0 0 16 0" /><path d="M4 14h16" /></svg>
    )},
    { title: 'Landscape Maintenance', desc: 'Providing expert landscape maintenance services to ensure healthy, thriving, and well-manicured outdoor spaces through regular care, pruning, and sustainable practices.', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21c.5-4.5 2.5-8 7-10" /><path d="M12 11c4.5 2 6.5 5.5 7 10" /><path d="M12 21v-3" /><path d="M12 11a5 5 0 0 0-5-5h0a5 5 0 0 1 10 0h0a5 5 0 0 0-5 5Z" /></svg>
    )},
  ];

  return (
    <>
      <FadeUp className="hero">
        <video autoPlay muted loop playsInline className="hero-bg">
          <source src="/assets/video/home-hero.mp4" type="video/mp4" />
        </video>
        <div className="hero-content">
          <h1 className="hero-title">Let’s Celebrate<br />Landscape with us</h1>
          <p className="hero-subtitle">Transforming our surroundings</p>
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
            <FadeUp key={item.id} className="news-card">
              <div className="news-number">{item.id}</div>
              <div className="news-image-wrapper">
                <img src={item.img} alt={item.text} />
                <div className="news-date-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  <span>{item.date}</span>
                </div>
              </div>
              <div className="news-content">
                <p>{item.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section id="services">
        <FadeUp><h2 className="section-title">Services</h2></FadeUp>
        <div className="services-grid-new">
          {services.map((service, index) => (
            <FadeUp key={index} className="service-item">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title-new">{service.title}</h3>
              <p className="service-desc">{service.desc}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <FadeUp><h2 className="section-title">Client Stories</h2></FadeUp>
        <div className="testimonial-list">
          <FadeUp className="testimonial-item">
            <p className="testimonial-text">Mr Sabu Mathew is a real professional in this field. His dedication and sincerity need all the appreciation. He restored my 2 wing home garden to its maximum beauty. I would wish him and his team all the best.</p>
            <div className="testimonial-author-block">
              <img src="/unnamed.png" alt="Taha Marikar" className="testimonial-img" />
              <p className="testimonial-author">'' Taha Marikar''</p>
            </div>
          </FadeUp>
          <FadeUp className="testimonial-item">
            <p className="testimonial-text">Highly professional team and cost effective too. Very sincere to their work and you can trust them as they deliver what they commit</p>
            <div className="testimonial-author-block">
              <img src="/unnamed (1).png" alt="Yusaf Ali" className="testimonial-img" />
              <p className="testimonial-author">'' Yusaf Ali''</p>
            </div>
          </FadeUp>
          <FadeUp className="testimonial-item">
            <p className="testimonial-text">I was not confident when I approached Mr. Sabu (Specialist in Landscaping Engineering) to transform my unstructured existing garden into a well professionally designed one. However, his team comprising experienced architects and dedicated crews managed to transform my garden completely well within the stipulated time at a very reasonable price in comparison to market rates.</p>
            <div className="testimonial-author-block">
              <img src="/unnamed (3).png" alt="Reveendranathan Kakkasseri" className="testimonial-img" />
              <p className="testimonial-author">'' Reveendranathan Kakkasseri''</p>
            </div>
          </FadeUp>
        </div>
      </section>

      <FadeUp>
        <img src="/assets/home-images/imgland.png" alt="Landscape Architecture" className="full-width-img" />
      </FadeUp>
    </>
  );
};

export default Home;
