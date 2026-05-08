import { useEffect, useState } from "react";

export function Typewriter({
  words,
  speed = 100,
  delayBetweenWords = 2000,
  cursor = true,
  cursorChar = "|",
  loop = true,
  mode = "typewriter", // "typewriter", "glitch", "fade"
  className = "",
  style = {},
  onComplete
}) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [glitchChar, setGlitchChar] = useState("");

  const currentWord = words[wordIndex];
  const glitchChars = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

  useEffect(() => {
    if (!loop && !isDeleting && charIndex === currentWord.length) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          if (mode === "glitch" && Math.random() > 0.7) {
            setGlitchChar(glitchChars[Math.floor(Math.random() * glitchChars.length)]);
            setTimeout(() => {
              setDisplayText(currentWord.substring(0, charIndex + 1));
              setCharIndex(charIndex + 1);
              setGlitchChar("");
            }, 50);
          } else {
            setDisplayText(currentWord.substring(0, charIndex + 1));
            setCharIndex(charIndex + 1);
          }
        } else if (loop) {
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        } else {
          // If not looping and finished typing the word
          if (onComplete) onComplete();
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex, words, loop, speed, delayBetweenWords, currentWord, mode, onComplete]);

  useEffect(() => {
    if (!cursor) return;
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, [cursor]);

  return (
    <div className={`typewriter-container ${className}`} style={{ ...style, display: 'inline-block' }}>
      <span className={`typewriter-text ${mode === 'fade' ? 'fade-mode' : ''}`}>
        {displayText}
        {glitchChar && <span className="glitch-char" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>{glitchChar}</span>}
        {cursor && (
          <span
            className="typewriter-cursor"
            style={{
              opacity: showCursor ? 1 : 0,
              marginLeft: '2px',
              fontWeight: 'bold',
              color: 'inherit'
            }}
          >
            {cursorChar}
          </span>
        )}
      </span>
      <style dangerouslySetInnerHTML={{
        __html: `
        .fade-mode {
          animation: typewriterFade 0.3s ease-out;
        }
        @keyframes typewriterFade {
          from { opacity: 0; transform: translateY(2px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .glitch-char {
          font-family: monospace;
          filter: blur(0.5px);
        }
      `}} />
    </div>
  );
}
