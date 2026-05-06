import React, { useState } from 'react';
import FadeUp from '../components/FadeUp';
import ImagesSlider from '../components/ImagesSlider';

const Contact = () => {
  const [parallaxImages] = useState([
    { src: 'assets/photos/4d869c_429057ecc06b468884e3dcd4d4322ef9~mv2.avif', alt: 'Contact 1' },
    { src: 'assets/photos/4d869c_43586056fb6e4dbfac20c5d3ae97cab9~mv2.avif', alt: 'Contact 2' },
    { src: 'assets/photos/4d869c_43f23646b7334147a3123d790fb7aab3~mv2.avif', alt: 'Contact 3' },
  ]);

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
              fontSize: 'clamp(3.5rem, 10vw, 7rem)', 
              fontFamily: 'var(--font-serif)', 
              marginBottom: '1rem',
              textShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>Get in Touch</h1>
            <p style={{ 
              fontSize: '1.2rem', 
              opacity: 0.9, 
              letterSpacing: '4px', 
              textTransform: 'uppercase',
              fontWeight: '500',
              textShadow: '0 2px 5px rgba(0,0,0,0.3)'
            }}>Let's create something beautiful together</p>
          </div>
        </ImagesSlider>
      </div>

      <section>
        <div className="contact-container">
          <div className="contact-info">
            <FadeUp><h2>GREEN REALM LANDSCAPE</h2></FadeUp>
            <FadeUp><p>We'd love to hear from you. Whether you have a question about our services, pricing, or anything else, our team is ready to answer all your questions.</p></FadeUp>
            
            <div className="info-block" style={{ marginTop: '2rem' }}>
              <FadeUp><h3>Locations</h3></FadeUp>
              <FadeUp><p>Kochi, Thrissur, Bangalore</p></FadeUp>
            </div>
            <div className="info-block">
              <FadeUp><h3>Email</h3></FadeUp>
              <FadeUp><p>greenrealmlandscape@gmail.com</p></FadeUp>
            </div>
            <div className="info-block">
              <FadeUp><h3>Phone</h3></FadeUp>
              <FadeUp><p>+91 90720 47272<br />+91 85470 87690</p></FadeUp>
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
              <label htmlFor="phone">Mobile Number</label>
              <input type="tel" id="phone" placeholder="+91 98765 43210" required />
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
