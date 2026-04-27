import FadeUp from '../components/FadeUp';

const About = () => {
  const team = [
    { name: 'Sabu Mathew', role: 'Founder and Landscape Engineer , Thrissur', img: 'assets/team-members/Sabu Mathew.jpeg' },
    { name: 'Seema K Sabu', role: 'Horticulturist , Thrissur', img: 'assets/team-members/Seema K Sabu.jpeg' },
    { name: 'Sibin.M.Sabu', role: 'Principle Architect , Kochi', img: 'assets/team-members/Sibin.M.Sabu.jpeg' },
    { name: 'Jiby Anonty', role: 'Project Architect , Kochi', img: 'assets/team-members/Jiby Anonty.jpg' },
    { name: 'Anandhakrishnan K', role: 'Landscape Architect , Kochi', img: 'assets/team-members/Anandhakrishnan K.jpg' },
    { name: 'Kaveri', role: 'Architect , Kochi', img: 'assets/team-members/Kaveri.jpg' },
    { name: 'Arun Vr', role: 'Project Manager , Thrissur', img: 'assets/team-members/Arun Vr.avif' },
    { name: 'Najiya Kareem', role: 'Landscape Engineer, Thrissur', img: 'assets/team-members/Najiya Kareem.jpg' },
    { name: 'Ashique', role: 'Irrigation Engineer', img: 'assets/team-members/Ashique.jpg' },
    { name: 'Ajayan', role: 'Landscape Supervisor', img: 'assets/team-members/ajayan.jpg' },
    { name: 'Ratheesh', role: 'Landscape Supervisor', img: 'assets/team-members/ratheesh.jpg' },
    { name: 'Sreekumar', role: 'Landscape Supervisor', img: 'assets/team-members/sreekumar.avif' },
    { name: 'Gopan', role: 'Landscape Supervisor', img: 'assets/team-members/gopan.avif' },
    { name: 'Unnikrishnan', role: 'Landscape Supervisor', img: 'assets/team-members/unnikrishnan.avif' },
    { name: 'Vishnu', role: 'Landscape Supervisor', img: 'assets/team-members/visnu.avif' },
    { name: 'Deepak Gopal', role: 'Landscape Supervisor', img: 'assets/team-members/deepak gopal.avif' },
    { name: 'Vishal', role: 'Gardener', img: 'assets/team-members/vishal.avif' },
    { name: 'Babu', role: 'Gardener', img: 'assets/team-members/babu.avif' },
    { name: 'Koyal', role: 'Gardener', img: 'assets/team-members/koyal.avif' },
    { name: 'Vivek Gopal', role: 'Gardener', img: 'assets/team-members/vivek gopal.avif' },
  ];

  const clients = [
    'assets/our-clients/Joyalukkas-logo.jpg',
    'assets/our-clients/homestay-logo.jpg',
    'assets/our-clients/viibee.png',
    'assets/our-clients/455T5Y.jpg',
    'assets/our-clients/45yy.jpg',
    'assets/our-clients/EFRGG.jpg',
    'assets/our-clients/FE224TT4_edited.jpg',
    'assets/our-clients/FGR.jpg',
    'assets/our-clients/OIP.jpeg',
    'assets/our-clients/RFGGR.jpg',
    'assets/our-clients/TRHRHJ6.jpg',
    'assets/our-clients/cdWF.jpg',
    'assets/our-clients/unnamed.jpg',
  ];

  return (
    <>
      <FadeUp className="about-hero">
        <img src="https://images.unsplash.com/photo-1598902108854-10e335adac99?q=80&w=2000" alt="About Us" className="hero-bg" />
        <div className="hero-content">
          <h1 className="hero-title">About Us</h1>
          <p className="hero-subtitle">Crafting Nature's Masterpieces</p>
        </div>
      </FadeUp>

      <section>
        <div className="about-intro">
          <FadeUp><div className="section-dot"></div></FadeUp>
          <FadeUp><h2 className="section-title">Who We Are</h2></FadeUp>
          <FadeUp><div className="about-subtitle">DESIGN – CONSTRUCT – MAINTAIN<br />Green Realm Landscape</div></FadeUp>

          <div className="about-text-content">
            <FadeUp><p>Green Realm Landscape in Thrissur, Kochi, and Bangalore is one of Kerala’s foremost landscaping and maintenance companies.</p></FadeUp>
            <FadeUp><p>Formed through the merger of Garden City Gardens, founded by Mr. Sabu Mathew in 2009, and Green Realm Landscape, founded by Ar. Sibin M. Sabu in 2015, the companies have been working collaboratively since 2017 onwards.</p></FadeUp>
            <FadeUp><p>The firm is driven by client satisfaction and quality service, supported by a team of experienced, young, energetic, and passionate professionals.</p></FadeUp>
            <FadeUp><p>For the past 15 years, the company has maintained a strong commitment to excellence, integrity, and service.</p></FadeUp>
          </div>
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

      <section>
        <FadeUp><h2 className="section-title">Meet the Team</h2></FadeUp>
        <div className="team-grid">
          {team.map((member, index) => (
            <FadeUp key={index} className="team-card">
              <div className="team-img-wrapper">
                <img src={member.img} alt={member.name} className="team-img" />
              </div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="partners-section">
        <div className="partners-wrapper">
          <div className="partners-track">
            {clients.map((src, i) => <img key={i} src={src} alt="Partner Logo" className="partner-logo" />)}
          </div>
          <div className="partners-track">
            {clients.map((src, i) => <img key={i + 'copy'} src={src} alt="Partner Logo" className="partner-logo" />)}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
