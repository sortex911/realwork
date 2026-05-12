import React, { useRef, useState, useEffect } from 'react';

/**
 * LazyVideo Component
 * 
 * Features:
 * - Intersection Observer for lazy loading
 * - Mobile/Desktop source switching
 * - Low-bandwidth preload strategy
 * - Smooth transition from poster/skeleton
 */
const LazyVideo = ({ 
  src, 
  mobileSrc, 
  poster, 
  className = '', 
  autoPlay = true, 
  muted = true, 
  loop = true,
  playsInline = true,
  threshold = 0.1
}) => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, [threshold]);

  const source = (isMobile && mobileSrc) ? mobileSrc : src;
  const isImage = source && /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(source);

  if (isImage) {
    return (
      <img
        ref={videoRef}
        src={source}
        className={className}
        alt=""
        loading="eager"
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      poster={poster}
      autoPlay={autoPlay && isInView}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      preload={isInView ? "auto" : "metadata"}
    >
      {isInView && <source src={source} type={source.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />}
    </video>
  );
};

export default LazyVideo;
