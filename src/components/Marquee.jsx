import React, { useRef, useEffect } from 'react';
import './Marquee.css';

const Marquee = ({ 
  children, 
  direction = 'left', 
  speed = 30, 
  pauseOnHover = true, 
  className = '' 
}) => {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);
  const isPaused = useRef(false);

  useEffect(() => {
    if (!marqueeRef.current || !containerRef.current) return;

    const marquee = marqueeRef.current;
    const container = containerRef.current;

    const animationSpeed = direction === 'left' ? -1 : 1;
    let position = 0;

    // Clone children to create the infinite effect
    const clone = marquee.cloneNode(true);
    container.appendChild(clone);

    const handleMouseEnter = () => {
      if (pauseOnHover) isPaused.current = true;
    };

    const handleMouseLeave = () => {
      isPaused.current = false;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      if (!isPaused.current) {
        position += animationSpeed * (speed / 100);
        
        const width = marquee.offsetWidth;
        if (Math.abs(position) >= width) {
          position = 0;
        }
        
        marquee.style.transform = `translateX(${position}px)`;
        clone.style.transform = `translateX(${position}px)`;
      }
      
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [direction, speed]);

  return (
    <div 
      ref={containerRef} 
      className={`marquee-container ${className} ${pauseOnHover ? 'pause-on-hover' : ''}`}
    >
      <div ref={marqueeRef} className="marquee-content">
        {children}
      </div>
    </div>
  );
};

export default Marquee;
