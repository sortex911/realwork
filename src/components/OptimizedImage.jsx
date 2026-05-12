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
  objectPosition = 'center',
  onLoad,
  noBg = false,
  sizes = '100vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [retryWithOriginal, setRetryWithOriginal] = useState(false);

  // Generate optimized URL - request larger than display width for high-DPI screens
  const optimizedSrc = getOptimizedUrl(src, { 
    width: typeof width === 'number' ? width * 2 : 1200, 
    quality, 
    format: 'webp' 
  });

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
          sizes={sizes}
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
