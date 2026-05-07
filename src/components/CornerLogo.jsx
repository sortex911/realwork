import React from 'react';

const CornerLogo = () => (
  <div className="corner-logo-container">
    <video
      className="corner-logo-video"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
    >
      <source src="assets/video/logo4.mp4" type="video/mp4" />
    </video>
  </div>
);

export default CornerLogo;
