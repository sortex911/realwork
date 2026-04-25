document.addEventListener('DOMContentLoaded', () => {
  // Custom Cursor
  const cursor = document.querySelector('.custom-cursor');
  
  if (cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    const hoverElements = document.querySelectorAll('a, button, .service-card, .news-item, .news-card, .timeline-item');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // Fullscreen Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const fullscreenMenu = document.querySelector('.fullscreen-menu');
  const header = document.querySelector('.header');

  if (menuToggle && fullscreenMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      fullscreenMenu.classList.toggle('active');
      
      if (fullscreenMenu.classList.contains('active')) {
        header.style.mixBlendMode = 'normal';
        header.style.color = 'var(--color-text)';
      } else {
        setTimeout(() => {
          header.style.mixBlendMode = 'difference';
          header.style.color = 'var(--color-white)';
        }, 800);
      }
    });

    // Delayed Navigation for Menu Links
    const menuLinks = document.querySelectorAll('.menu-links a');
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetUrl = link.getAttribute('href');
        
        // Only delay if it's an actual page navigation
        if (targetUrl && !targetUrl.startsWith('#')) {
          e.preventDefault();
          
          menuToggle.classList.remove('active');
          fullscreenMenu.classList.remove('active');
          
          setTimeout(() => {
            header.style.mixBlendMode = 'difference';
            header.style.color = 'var(--color-white)';
          }, 800);

          // Wait for menu close animation to complete (800ms) before navigating
          setTimeout(() => {
            window.location.href = targetUrl;
          }, 800);
        }
      });
    });
  }

  // Intersection Observer for fade-up animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeUpElements = document.querySelectorAll('.fade-up');
  fadeUpElements.forEach(el => observer.observe(el));



});
