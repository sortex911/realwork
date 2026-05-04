import React from "react";

const AuroraAnimation = () => (
  <style>
    {`
      @keyframes aurora-1 {
        0% { transform: translate(0%, 0%) scale(1); }
        25% { transform: translate(20%, -20%) scale(1.2); }
        50% { transform: translate(-20%, 20%) scale(0.8); }
        75% { transform: translate(10%, -10%) scale(1.1); }
        100% { transform: translate(0%, 0%) scale(1); }
      }
      @keyframes aurora-2 {
        0% { transform: translate(0%, 0%) scale(1); }
        25% { transform: translate(-20%, 20%) scale(1.1); }
        50% { transform: translate(20%, -20%) scale(0.9); }
        75% { transform: translate(-10%, 10%) scale(1.2); }
        100% { transform: translate(0%, 0%) scale(1); }
      }
      .aurora-container {
        position: relative;
        width: 100%;
        min-height: 100vh;
        overflow: hidden;
        background-color: var(--color-bg);
      }
      .aurora-bg {
        position: absolute;
        inset: 0;
        z-index: 0;
        pointer-events: none;
      }
      .aurora-blob-1 {
        position: absolute;
        top: -10%;
        left: 20%;
        height: 50vh;
        width: 50vw;
        animation: aurora-1 20s ease-in-out infinite;
        border-radius: 50%;
        background-color: rgba(44, 85, 69, 0.15); /* Accent Green */
        filter: blur(80px);
      }
      .aurora-blob-2 {
        position: absolute;
        bottom: -10%;
        right: 20%;
        height: 50vh;
        width: 50vw;
        animation: aurora-2 20s ease-in-out infinite;
        border-radius: 50%;
        background-color: rgba(200, 180, 140, 0.15); /* Gold Accent */
        filter: blur(80px);
      }
      .aurora-content {
        position: relative;
        z-index: 10;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    `}
  </style>
);

export const AuroraHero = ({ children, className, style }) => {
  return (
    <div className={`aurora-container ${className || ''}`} style={style}>
      <AuroraAnimation />
      <div className="aurora-bg">
        <div className="aurora-blob-1" />
        <div className="aurora-blob-2" />
      </div>
      <div className="aurora-content">{children}</div>
    </div>
  );
};
