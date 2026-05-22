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

  // Safari requires explicit .load() when dynamically adding <source> elements
  useEffect(() => {
    if (isInView && videoRef.current && !isImage) {
      const video = videoRef.current;
      
      const onLoadedMetadata = () => console.log(`[Safari Video] loadedmetadata for ${source}`);
      const onLoadedData = () => console.log(`[Safari Video] loadeddata for ${source}`);
      const onCanPlay = () => console.log(`[Safari Video] canplay for ${source}`);
      const onPlay = () => console.log(`[Safari Video] play for ${source}`);
      const onError = (e) => console.error(`[Safari Video] error for ${source}:`, video.error);

      video.addEventListener('loadedmetadata', onLoadedMetadata);
      video.addEventListener('loadeddata', onLoadedData);
      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('play', onPlay);
      video.addEventListener('error', onError);

      video.load();
      if (autoPlay) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.error(`[Safari Video] autoplay prevented error for ${source}:`, err);
          });
        }
      }

      return () => {
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
        video.removeEventListener('loadeddata', onLoadedData);
        video.removeEventListener('canplay', onCanPlay);
        video.removeEventListener('play', onPlay);
        video.removeEventListener('error', onError);
      };
    }
  }, [isInView, source, isImage, autoPlay]);

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
      webkit-playsinline="true"
      preload={isInView ? "auto" : "none"}
      onClick={() => {
        // Fallback for Safari if autoPlay was blocked
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play();
        }
      }}
    >
      {isInView && <source src={source} type={source.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />}
    </video>
  );
};

export default LazyVideo;
