import { useEffect, useRef } from 'react';

const FadeUp = ({ children, className = '', ...props }) => {
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div className={`fade-up ${className}`} ref={domRef} {...props}>
      {children}
    </div>
  );
};

export default FadeUp;
