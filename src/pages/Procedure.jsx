import React from 'react';
import FadeUp from '../components/FadeUp';
import { ContainerScroll, CardSticky } from '../components/CardsStack';
import { AuroraHero } from '../components/AuroraHero';
import ImagesSlider from '../components/ImagesSlider';

const Procedure = () => {
  const services = [
    {
      title: 'Landscape Consultation',
      desc: 'Professional landscape consultation by expert architects and horticulturists, offering expert guidance to transform your outdoor spaces with sustainable and aesthetic landscaping solutions.'
    },
    {
      title: 'Butterfly Garden',
      desc: 'Creating vibrant butterfly gardens that attract and nurture pollinators by incorporating native plants, nectar sources, and natural habitats, enhancing biodiversity and ecological balance.'
    },
    {
      title: 'Miyawaki Forest',
      desc: 'Developing dense, fast-growing Miyawaki forests using native plant species to restore biodiversity, improve air quality, and create a self-sustaining green ecosystem.'
    },
    {
      title: 'Irrigation Design',
      desc: 'Designing and implementing efficient irrigation systems that optimize water usage, support plant health, and ensure sustainable, low-maintenance landscapes.'
    },
    {
      title: 'Terrace Garden',
      desc: 'Designing and creating lush terrace gardens that maximize green space, enhance air quality, and bring nature closer to urban living.'
    },
    {
      title: 'Landscape Maintenance',
      desc: 'Providing expert landscape maintenance services to ensure healthy, thriving, and well-manicured outdoor spaces through regular care, pruning, and sustainable practices.'
    }
  ];

  return (
    <>
      <div style={{ position: 'relative', height: '50vh', width: '100vw', overflow: 'hidden' }}>
        <ImagesSlider
          images={[
            'assets/photos/4d869c_5b2a9aac04db4bbaa5b0b4d24245ae59~mv2.avif',
            'assets/photos/4d869c_8d57d4542d144c39bcf43318c5ef8b8f~mv2.avif',
            'assets/photos/4d869c_d0b4c72f0a3c4dea96407244c270603e~mv2.avif'
          ]}
          autoplay={true}
          direction="up"
          overlay={true}
        >
          <div className="hero-content" style={{ zIndex: 10, textAlign: 'center', color: '#fff' }}>
            <h1 className="hero-title" style={{ fontSize: '50px' }}>Our Procedure</h1>

          </div>
        </ImagesSlider>
      </div>

      <AuroraHero>


        <section style={{ backgroundColor: 'transparent' }}>
          <FadeUp><h2 className="section-title">Our Services</h2></FadeUp>
          <div className="services-grid-new" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-xl)' }}>
            {services.map((service, idx) => (
              <FadeUp key={idx} className="service-item" style={{ alignItems: 'flex-start', textAlign: 'left', padding: '20px', background: 'rgba(255, 255, 255, 0.4)', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.5)' }}>
                <h3 className="service-title-new" style={{ color: 'var(--color-accent)', borderBottom: '2px solid var(--color-accent)', paddingBottom: '10px', width: '100%' }}>{service.title}</h3>
                <p className="service-desc" style={{ marginTop: '15px' }}>{service.desc}</p>
              </FadeUp>
            ))}
          </div>
        </section>
      </AuroraHero>

      <section style={{ backgroundColor: 'rgba(44, 85, 69, 0.03)' }}>
        <FadeUp><h2 className="section-title">Planning Methodology</h2></FadeUp>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: '#fff', padding: 'var(--spacing-xl)', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <ol style={{ paddingLeft: '20px', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text-light)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <li>Collection of site photos and small video of the site, including specific measurements of the site.</li>
            <li>Meeting with client for gathering initials details - Clients specific requirements etc.</li>
            <li>First time discussion and detailing basic plan. After attaining mutual agreement; start of Design work.</li>
            <li>Submission of 2D drawings and detailing.</li>
            <li>After agreement with the client, start preparation of 3D views and preparing other details of work specified.</li>
            <li>The payment of each stage requires confirmation before proceeding.</li>
          </ol>

          <div style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-md)', background: 'var(--color-accent)', color: '#fff', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ color: '#fff', margin: 0, fontStyle: 'italic', fontSize: '1rem' }}>
              "We are truly honored to be entrusted as the landscape architects for your project and sincerely appreciate your confidence in our expertise."
            </p>
          </div>
          <p style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--color-text-light)', textAlign: 'center' }}>
            This initial payment will enable us to allocate our resources effectively. Site visit is mandatory request from client side for First site visit is chargeable according to site location.
          </p>
        </div>
      </section>

      <section>
        <FadeUp><h2 className="section-title">Project Stages</h2></FadeUp>
        <ContainerScroll style={{ minHeight: '150vh', padding: 'var(--spacing-xl) 0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {[
            {
              id: "stage-1",
              title: "Quotation of Design Fee",
              description: "After receiving site photos and Site Drawings, we will prepare a design fee quote.",
            },
            {
              id: "stage-2",
              title: "Site Visit",
              description: "After confirmation of the Fee Terms, After receiving 20 % of the design fee, we schedule a site visit.",
            },
            {
              id: "stage-3",
              title: "Conceptual Design",
              description: "After Site visit, we will start the conceptual design.",
            },
            {
              id: "stage-4",
              title: "Detailed Drawing",
              description: "After confirmation of conceptual design, we will do the the detail drawing. During this stage, we will provide the estimate, bill of quantities and plant list - detailed drawing.",
            },
            {
              id: "stage-5",
              title: "Execution",
              description: "If the client requires both design and execution by our team, and the project is awarded to Green Realm Landscape, 50% of the design fee will be deducted from the contract.",
            }
          ].map((phase, index) => (
            <CardSticky
              key={phase.id}
              index={index + 2}
              incrementY={25}
              style={{
                background: '#fff',
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.1)',
                padding: 'var(--spacing-xl)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
                margin: '0 auto',
                maxWidth: '800px',
                width: '90%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--color-accent)', margin: 0 }}>
                  Stage {index + 1} - {phase.title}
                </h2>
                <h3 style={{ fontSize: '2rem', fontFamily: 'var(--font-sans)', color: 'var(--color-accent)', opacity: 0.3, margin: 0, fontWeight: '800' }}>
                  {String(index + 1).padStart(2, "0")}
                </h3>
              </div>

              <p style={{ color: 'var(--color-text-light)', fontSize: '1.1rem', lineHeight: '1.6' }}>{phase.description}</p>
            </CardSticky>
          ))}
        </ContainerScroll>
      </section>

      <section style={{ backgroundColor: 'var(--color-text)', color: 'var(--color-white)', padding: 'var(--spacing-xl) var(--spacing-md)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <FadeUp><h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>Terms and Conditions</h2></FadeUp>
          <FadeUp>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', margin: '0 auto' }}>
              Any additions or alterations requested by the client after the approval of the drawing will incur additional charges. Drawings will be submitted only after the contract is approved and the advance payment has been received.
            </p>
          </FadeUp>
        </div>
      </section>
      <section style={{ padding: 'var(--spacing-xxl) 0', textAlign: 'center', backgroundColor: 'rgba(44, 85, 69, 0.05)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 var(--spacing-md)' }}>
          <FadeUp>
            <h2 style={{ marginBottom: 'var(--spacing-md)', fontSize: '2.5rem' }}>Full Procedure & Profile</h2>
            <p style={{ margin: '0 auto var(--spacing-lg) auto', color: 'var(--color-text-light)', fontSize: '1.1rem' }}>
              For a comprehensive overview of our design methodology and company profile, please view or download our official documentation.
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
                  /* e.currentTarget.style.transform = 'translateY(-3px)'; */
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(44, 85, 69, 0.25)';
                }}
                onMouseOut={(e) => {
                  /* e.currentTarget.style.transform = 'translateY(0)'; */
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
                  /* e.currentTarget.style.transform = 'translateY(-3px)'; */
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-accent)';
                  /* e.currentTarget.style.transform = 'translateY(0)'; */
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

export default Procedure;
