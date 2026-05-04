import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SplitText = ({
  text = '',
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars', // 'chars' or 'words'
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const containerRef = useRef(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !text || !fontsLoaded) return;

      const el = containerRef.current;
      const targets = el.querySelectorAll('.split-item');

      gsap.fromTo(
        targets,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          scrollTrigger: {
            trigger: el,
            start: `top ${100 - threshold * 100}%`,
            end: 'bottom center',
            toggleActions: 'play none none none',
            once: true,
          },
          onComplete: onLetterAnimationComplete,
        }
      );
    },
    {
      dependencies: [text, fontsLoaded, delay, duration, ease, splitType, threshold],
      scope: containerRef,
    }
  );

  const words = text.split(' ');

  const renderContent = () => {
    if (splitType === 'words') {
      return words.map((word, i) => (
        <span
          key={i}
          className="split-item split-word"
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {word}{i !== words.length - 1 ? ' ' : ''}
        </span>
      ));
    }

    // Default to 'chars'
    return words.map((word, wordIndex) => (
      <span key={wordIndex} className="split-word" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
        {word.split('').map((char, charIndex) => (
          <span
            key={charIndex}
            className="split-item split-char"
            style={{ display: 'inline-block' }}
          >
            {char}
          </span>
        ))}
        {wordIndex !== words.length - 1 ? (
          <span className="split-char" style={{ display: 'inline-block' }}>
            &nbsp;
          </span>
        ) : null}
      </span>
    ));
  };

  const Tag = tag;

  return (
    <Tag
      ref={containerRef}
      className={`split-parent ${className}`}
      style={{
        textAlign,
        display: 'inline-block',
        overflow: 'hidden',
        width: '100%',
        margin: 0,
        padding: 0
      }}
    >
      {renderContent()}
    </Tag>
  );
};

export default SplitText;
