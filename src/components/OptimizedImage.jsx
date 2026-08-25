import React, { useState, useEffect, useRef } from 'react';
import { getOptimizedUrl } from '../lib/cloudinary';
import './OptimizedImage.css';

/**
 * OptimizedImage Component
 * 
 * Features:
 * - Intersection Observer based lazy loading
 * - Native lazy loading fallback
 * - CSS Shimmer/Skeleton placeholder
 * - Blur-up transition
 * - Smart Error fallback (retries with original URL)
 * - Supabase CDN optimization
 */
const OptimizedImage = ({
  src,
  alt = 'Image',
  width,
  height,
  className = '',
  priority = false,
  quality = 80,
  objectFit = 'cover',
  objectPosition = 'center',
  onLoad,
  noBg = false,
  sizes = '100vw'
}) => {
  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [retryWithOriginal, setRetryWithOriginal] = useState(false);
  const imgRef = useRef(null);

  // Reset loading & error states when src changes so reused components don't display stale images
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
    setRetryWithOriginal(false);
  }, [src]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before it enters viewport
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Generate optimized URL
  // If width is a number, we use it. If it's a string like '100%', we default to a safe maximum or expect a number.
  const optimizedSrc = React.useMemo(() => {
    if (!src) return '';

    let targetWidth = 1400; // Default sharp resolution
    if (typeof width === 'number') {
      targetWidth = Math.min(width * 2, 1600); // 2x Retina scaling for high clarity
    } else if (className.includes('thumbnail') || className.includes('grid')) {
      targetWidth = 800; // Sharp grid thumbnail
    }

    return getOptimizedUrl(src, {
      width: targetWidth,
      quality: quality || 'auto:good',
      format: 'webp'
    });
  }, [src, width, quality, className]);

  // Decide which source to use
  const currentSrc = (retryWithOriginal || !optimizedSrc) ? src : optimizedSrc;

  const containerStyle = {
    position: 'relative',
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    height: height ? (typeof height === 'number' ? `${height}px` : height) : '100%',
    maxWidth: '100%',
    aspectRatio: width && height && typeof width === 'number' && typeof height === 'number' ? `${width}/${height}` : 'auto',
    overflow: 'hidden',
    backgroundColor: noBg ? 'transparent' : 'rgba(44, 85, 69, 0.05)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: objectFit,
    objectPosition: objectPosition,
    transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.8s ease',
    opacity: isLoaded ? 1 : 0,
    filter: isLoaded ? 'blur(0)' : 'blur(15px)',
    display: (error && retryWithOriginal) ? 'none' : 'block'
  };

  const handleError = () => {
    if (!retryWithOriginal && optimizedSrc !== src) {
      setRetryWithOriginal(true);
    } else {
      setError(true);
    }
  };

  return (
    <div
      className={`opt-img-container ${className}`}
      style={containerStyle}
      ref={imgRef}
    >
      {!isLoaded && !error && (
        <div className="opt-img-skeleton">
          <div className="opt-img-shimmer"></div>
        </div>
      )}

      {error && retryWithOriginal ? (
        <div className="opt-img-fallback">
          <span>Failed to load image</span>
        </div>
      ) : (
        (isInView || priority) && (
          <img
            src={currentSrc}
            alt={alt}
            style={imageStyle}
            loading={priority ? 'eager' : 'lazy'}
            sizes={sizes}
            onLoad={() => {
              setIsLoaded(true);
              if (onLoad) onLoad();
            }}
            onError={handleError}
          />
        )
      )}
    </div>
  );
};

export default React.memo(OptimizedImage);
