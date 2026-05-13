import React from 'react';
import './ClientStories.css';
import { useMediaQuery } from '../lib/hooks';

const testimonials = [
  {
    name: "Charles Heavenly",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "Best landscape architects in Kerala , Great works and designs , very committed and trustful people , very happy of your service",
    role: "Client"
  },
  {
    name: "curveddimension M",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "Excellent landscape consultancy and execution team. Design and execution delivered by a highly skilled and dedicated team of landscape architects.",
    role: "Client"
  },
  {
    name: "Aathira Mohan",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "Working with green realms would possibly be one of the best experiences ever. They’re such skilled professionals and know exactly what they’re doing. Sibin and his team took over GVQ cafe landscaping and made it into nature’s paradise.",
    role: "Client"
  },
  {
    name: "Riaz Ibrahim",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "Excellent Work from Green Realm Landscape. Commitment towards the work i excited more from there's side. And after service and maintenance also doing perfectly.",
    role: "Client"
  },
  {
    name: "beena m b",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "Very good and highly professional team. Low cost effective too. Very sincere to their work. Their service doesn’t end at the completion of work but they provide after care.",
    role: "Client"
  },
  {
    name: "Saju Xavier",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "They are wonderful to work with, have an amazing talent to transform an ordinary home to an outstanding one. Professional and very much accommodating to clients. Their service doesn’t end at the completion of work but they provide after care. Marvelous, dedicated Team !",
    role: "Client"
  },
  {
    name: "surej kiran",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "I must say...Mr Sabu is one among the few persons that i admire for their professionalism and dedication towards the job they do. Explains things well.. executes them perfectly .. addresses every customer related concerns...finishes job on time , cost-effectively too.",
    role: "Client"
  },
  {
    name: "Babu",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "I would like to appreciate Mr Sabu for his professionalism and dedication towards his job.Explains things well. Executes the work perfectly. He cares every customer related concerns. Finishes job on time. I got chance to see lot of works done by him. All his works are unique in all aspects. Wish him all success in every job he undertake.",
    role: "Client"
  },
  {
    name: "Zakeer mm",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "We are really happy with Mr. Sabu's services. Very sincere approach. They take care the plants in my house same like how parents look after their children. I have done with his team, landscaping & automated irrigation system and both he did to my expectation. Cost effective too.",
    role: "Client"
  },
  {
    name: "Pramisha C P",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "Thank you, Mr Sabu & his team was prompt with communication, ideas and and his landscaping service was 5 star. Will use him again. You won’t be disappointed with his service. No job too big or small.",
    role: "Client"
  },
  {
    name: "Taha Marikar",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "Mr Sabu Mathew is a real professional in this field. His dedication and sincerity need all the appreciation. He restored my 2 wing home garden to its maximum beauty. I would wish him and his team all the best.",
    role: "Client"
  },
  {
    name: "Susanmariya Vinod",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "Great landscape design and service with genuine commitment to work and client needs",
    role: "Client"
  },
  {
    name: "Yusaf Ali",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "Highly professional team and cost effective too. Very sincere to their work and you can trust them as they deliver what they commit",
    role: "Client"
  },
  {
    name: "Pratheep G",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "The best landscape designer.... Perfect combination of talented designer and dedicated team members. Thank you very much Mr. Sibin & team for the beautiful tropical garden at my home...🙏",
    role: "Client"
  },
  {
    name: "Reveendranathan Kakkasseri",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "I was not confident when I approached Mr Sabu (Specialist in Landscaping Engineering) for transforming from my unstructured existing garden to a well professionally designed one. However, his team comprising of experienced Architect and dedicated crews managed to transform my garden completely well within stipulated time at a very reasonable price in caparison to market rates. The main attraction of design which is unique as you cannot find anywhere. I really appreciate Mr Sibin for the design and Mrs Sabu for specialising in landscaping and botanical requirements. I wish them all the best ahead.",
    role: "Client"
  },
  {
    name: "ANUVIND .S",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "Systematic approach with good communication stands out .Perfect firm to approach for landscaping and gardening in kerala.",
    role: "Client"
  },
  {
    name: "Ano j Satheesan",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "Amazing and impressive work, Professional team Good experience",
    role: "Client"
  },
  {
    name: "Sona Aby",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "Great experience..... Awesome work at reasonable rate.",
    role: "Client"
  },
  {
    name: "Priyadatha M K",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "I came to know about Green Realm landscape from my sister . Amazing service and work . Trust me you won't regret or get disappoint of their work.",
    role: "Client"
  },
  {
    name: "SUCHITHRA Y",
    stars: "⭐️⭐️⭐️⭐️⭐️",
    text: "Green Realm is one of the best landscaping firm in Kerala according to my personal experience.The owner of this firm who is MR.Sabu Sir, is a very kind and a professional person who is very passionate about his work.He and his team transformed my ordinary garden into a beautiful space with creative ideas.The ideas of Sabu Sir, is inspiring and unique.I had a great experience with Green Realm and I would highly recommend them for anyone who plans to make their garden unique.",
    role: "Client"
  }
];

const TestimonialCard = ({ testimonial }) => (
  <div className="testimonial-card">
    <div className="testimonial-stars mb-3">{testimonial.stars}</div>
    <p className="testimonial-text">{testimonial.text}</p>
    <div className="testimonial-footer">
      <div className="testimonial-info">
        <h4 className="testimonial-name">{testimonial.name}</h4>
        <span className="testimonial-role">{testimonial.role}</span>
      </div>
    </div>
  </div>
);

const TestimonialsColumn = ({ list, speed }) => {
  return (
    <div className="testimonials-column-wrapper">
      <div
        className="testimonials-column"
        style={{ '--scroll-speed': speed }}
      >
        <div className="testimonials-list">
          {list.map((t, i) => <TestimonialCard key={`a-${i}`} testimonial={t} />)}
          {list.map((t, i) => <TestimonialCard key={`b-${i}`} testimonial={t} />)}
        </div>
      </div>
    </div>
  );
};

const ClientStories = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  // Split 20 testimonials into 3 columns for desktop: 7, 7, 6
  const col1 = testimonials.slice(0, 7);
  const col2 = testimonials.slice(7, 14);
  const col3 = testimonials.slice(14);

  return (
    <section className="client-stories-modern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-40">
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-slate-900" style={{ textAlign: "center" }}>What our clients say</h2>
          <div style={{ marginTop: '150px' }}></div>
        </div>

        <div className="testimonials-grid-container">
          <div className="testimonials-fade-top"></div>
          <div className="testimonials-grid">
            {isMobile ? (
              <TestimonialsColumn list={testimonials} speed="120s" />
            ) : (
              <>
                <TestimonialsColumn list={col1} speed="40s" />
                <TestimonialsColumn list={col2} speed="60s" />
                <TestimonialsColumn list={col3} speed="50s" />
              </>
            )}
          </div>
          <div className="testimonials-fade-bottom"></div>
        </div>
      </div>
    </section>
  );
};

export default ClientStories;
