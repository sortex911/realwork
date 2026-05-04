import React from 'react';
import FadeUp from '../components/FadeUp';
import { ContainerScroll, CardSticky } from '../components/CardsStack';
import { AuroraHero } from '../components/AuroraHero';

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
      <FadeUp className="about-hero" style={{ height: '50vh' }}>
        <div className="hero-bg" style={{ backgroundColor: '#0f1a15', zIndex: -1 }}></div>
        <div className="hero-content">
          <h1 className="hero-title">Our Procedure</h1>
          <p className="hero-subtitle">Transforming our surroundings</p>
        </div>
      </FadeUp>

      <AuroraHero>
        <section>
          <div className="about-intro" style={{ maxWidth: '1100px', margin: '0 auto', padding: 'var(--spacing-xl) var(--spacing-md)', textAlign: 'center' }}>
            <div className="section-dot"></div>
            <h2 className="section-title" style={{ marginBottom: 'var(--spacing-sm)' }}>Green Realm Landscape</h2>
            <div className="about-subtitle" style={{ fontSize: '1.1rem', color: 'var(--color-accent)', marginBottom: 'var(--spacing-lg)', letterSpacing: '2px', fontWeight: '500' }}>Design . Construct . Maintain</div>

            <FadeUp>
              <p style={{ fontSize: '1.2rem', lineHeight: '1.9', color: 'var(--color-text-light)', fontWeight: '300' }}>
                Green Realm Landscape Architects in Thrissur and Ernakulam India, founded in 1990 and rebranded in 2012. Company with 30 years of Kerala foremost landscaping and Maintenance Company.
                <br /><br />
                We are the leading landscaping company in Kerala, offering landscape consultation, design and installation, as well as full service maintenance for all your lawn and garden needs. Client satisfaction and quality in service, backed by a Crew of young, energetic & passionate people. The firm consist of Landscape Architects, Landscape engineer Botanist and trained landscape workers of energetic and passionate people.
                <br /><br />
                We promise to continue our dedicated service to our clients, and look forward to welcoming new partners on our journey to transform our surroundings.
              </p>
            </FadeUp>
          </div>
        </section>

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
    </>
  );
};

export default Procedure;
