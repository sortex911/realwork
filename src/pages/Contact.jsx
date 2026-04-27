import FadeUp from '../components/FadeUp';

const Contact = () => {
  return (
    <>
      <FadeUp className="contact-hero">
        <div className="hero-content" style={{ color: 'var(--color-text)' }}>
          <h1 className="hero-title">Get in Touch</h1>
          <p className="hero-subtitle" style={{ color: 'var(--color-text-light)' }}>Let's create something beautiful together.</p>
        </div>
      </FadeUp>

      <section>
        <div className="contact-container">
          <div className="contact-info">
            <FadeUp><h2>Our Studio</h2></FadeUp>
            <FadeUp><p>We'd love to hear from you. Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.</p></FadeUp>
            
            <div className="info-block" style={{ marginTop: '2rem' }}>
              <FadeUp><h3>Location</h3></FadeUp>
              <FadeUp><p>123 Landscape Avenue, Design District<br />Kochi, Kerala 682001</p></FadeUp>
            </div>
            <div className="info-block">
              <FadeUp><h3>Email</h3></FadeUp>
              <FadeUp><p>hello@lndscp.com</p></FadeUp>
            </div>
            <div className="info-block">
              <FadeUp><h3>Phone</h3></FadeUp>
              <FadeUp><p>+91 98765 43210</p></FadeUp>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <FadeUp className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="John Doe" required />
            </FadeUp>
            <FadeUp className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="john@example.com" required />
            </FadeUp>
            <FadeUp className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Tell us about your project..." required></textarea>
            </FadeUp>
            <FadeUp>
              <button type="submit" className="submit-btn">Send Message</button>
            </FadeUp>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
