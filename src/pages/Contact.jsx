import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import FadeUp from '../components/FadeUp';
import ImagesSlider from '../components/ImagesSlider';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import '../styles/contact.css';

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

    // 1. Prepare data for Web3Forms
    const web3FormData = new FormData();
    web3FormData.append("access_key", "0efbd2ff-d520-432c-bba6-5469a0c3027d");
    web3FormData.append("name", formData.name);
    web3FormData.append("email", formData.email);
    web3FormData.append("phone", formData.phone);
    web3FormData.append("message", formData.message);
    web3FormData.append("from_name", "Green Realm Website");
    web3FormData.append("subject", "New Inquiry from " + formData.name);

    try {
      // 2. Send to Web3Forms (Email)
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: web3FormData
      });
      const web3Data = await web3Response.json();

      // 3. Save to Firebase (Dashboard)
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        createdAt: serverTimestamp(),
        status: 'new'
      });

      if (web3Data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Web3Forms submission failed');
      }
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
              fontSize: '50px',
              fontFamily: 'var(--font-serif)',
              marginBottom: '1rem',
              textShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>Get in Touch</h1>
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
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  type="submit"
                  className={`submit-btn ${status === 'submitting' ? 'submitting' : ''}`}
                  disabled={status === 'submitting'}
                  style={{ margin: 0 }}
                >
                  {status === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>

                <a
                  href="https://wa.me/919072047272"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#25D366',
                    color: 'white',
                    padding: '0.9rem 2rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.3)';
                    e.currentTarget.style.backgroundColor = '#22c35e';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.2)';
                    e.currentTarget.style.backgroundColor = '#25D366';
                  }}
                >
                  <FaWhatsapp size={22} />
                  <span>WhatsApp</span>
                </a>
              </div>
              {status === 'success' && <p style={{ color: '#2c5545', marginTop: '10px', fontWeight: '500' }}>Message sent successfully!</p>}
              {status === 'error' && <p style={{ color: '#ef4444', marginTop: '10px', fontWeight: '500' }}>Failed to send message. Please try again.</p>}
            </FadeUp>
          </form>
        </div>
      </section>
      <section style={{ padding: 'var(--spacing-xxl) 0', textAlign: 'center', backgroundColor: 'rgba(44, 85, 69, 0.05)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--spacing-md)' }}>
          <FadeUp>
            <h2 style={{ marginBottom: 'var(--spacing-md)', fontSize: '2.5rem' }}>Company Procedure</h2>
            <p style={{ margin: '0 auto var(--spacing-lg) auto', color: 'var(--color-text-light)', fontSize: '1.1rem' }}>
              Interested in our workflow? Download or view our complete procedure and profile documentation.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '30px' }}>
              <a
                href="/assets/pdf/Green%20Realm%20Landscape%20_%20Profile%20and%20Procedure.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '16px 40px',
                  backgroundColor: 'var(--color-accent)',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: '600',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '2px solid var(--color-accent)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  letterSpacing: '1px',
                  boxShadow: '0 10px 20px rgba(44, 85, 69, 0.15)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(44, 85, 69, 0.25)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(44, 85, 69, 0.15)';
                }}
              >
                View Procedure
              </a>
              <a
                href="/assets/pdf/Green%20Realm%20Landscape%20_%20Profile%20and%20Procedure.pdf"
                download="Green_Realm_Landscape_Procedure.pdf"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '16px 40px',
                  backgroundColor: 'transparent',
                  color: 'var(--color-accent)',
                  borderRadius: '12px',
                  fontWeight: '600',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '2px solid var(--color-accent)',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  letterSpacing: '1px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-accent)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-accent)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Download Procedure
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
};

export default Contact;
