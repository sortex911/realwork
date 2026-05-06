import React, { useState } from 'react';
import { getOptimizedUrl } from '../lib/supabase';
import './OptimizedImage.css';

/**
 * OptimizedImage Component
 * 
 * Features:
 * - Native lazy loading
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
  onLoad,
  noBg = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [retryWithOriginal, setRetryWithOriginal] = useState(false);

  // Generate optimized URL
  const optimizedSrc = getOptimizedUrl(src, { 
    width: width || 800, 
    quality, 
    format: 'webp' 
  });

  // Decide which source to use
  const currentSrc = (retryWithOriginal || !optimizedSrc) ? src : optimizedSrc;

  const containerStyle = {
    position: 'relative',
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : '100%',
    aspectRatio: width && height ? `${width}/${height}` : 'auto',
    overflow: 'hidden',
    backgroundColor: noBg ? 'transparent' : 'var(--color-bg-alt, #f0f4f2)'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: objectFit,
    transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), filter 0.6s ease',
    opacity: isLoaded ? 1 : 0,
    filter: isLoaded ? 'blur(0)' : 'blur(10px)',
    display: (error && retryWithOriginal) ? 'none' : 'block'
  };

  const handleError = () => {
    if (!retryWithOriginal && optimizedSrc !== src) {
      // If optimized URL failed, try the original URL
      console.warn('[OptimizedImage] Optimization failed, falling back to original:', src);
      setRetryWithOriginal(true);
    } else {
      // If original URL also fails, show error state
      setError(true);
    }
  };

  return (
    <div className={`opt-img-container ${className}`} style={containerStyle}>
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
        <img
          src={currentSrc}
          alt={alt}
          style={imageStyle}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => {
            setIsLoaded(true);
            if (onLoad) onLoad();
          }}
          onError={handleError}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
