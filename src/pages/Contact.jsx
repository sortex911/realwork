import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import FadeUp from '../components/FadeUp';
import ImagesSlider from '../components/ImagesSlider';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const [parallaxImages] = useState([
    { src: 'assets/photos/4d869c_429057ecc06b468884e3dcd4d4322ef9~mv2.avif', alt: 'Contact 1' },
    { src: 'assets/photos/4d869c_43586056fb6e4dbfac20c5d3ae97cab9~mv2.avif', alt: 'Contact 2' },
    { src: 'assets/photos/4d869c_43f23646b7334147a3123d790fb7aab3~mv2.avif', alt: 'Contact 3' },
  ]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new'
      });
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

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

          <form className="contact-form" onSubmit={handleSubmit}>
            <FadeUp className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="John Doe" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </FadeUp>
            <FadeUp className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="john@example.com" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </FadeUp>
            <FadeUp className="form-group">
              <label htmlFor="phone">Mobile Number</label>
              <input 
                type="tel" 
                id="phone" 
                placeholder="+91 98765 43210" 
                required 
                value={formData.phone}
                onChange={handleChange}
              />
            </FadeUp>
            <FadeUp className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                rows="5" 
                placeholder="Tell us about your project..." 
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </FadeUp>
            <FadeUp>
              <button 
                type="submit" 
                className={`submit-btn ${status === 'submitting' ? 'submitting' : ''}`}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && <p style={{ color: '#2c5545', marginTop: '10px', fontWeight: '500' }}>Message sent successfully!</p>}
              {status === 'error' && <p style={{ color: '#ef4444', marginTop: '10px', fontWeight: '500' }}>Failed to send message. Please try again.</p>}
            </FadeUp>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
