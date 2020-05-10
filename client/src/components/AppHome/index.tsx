import React from 'react';
import './style.css';

import Logo from '../../lib/assets/DarkLogo.png';

export const AppHome = () => {
  return (
    <div className="v-header container">
      <div className="fullscreen-video-wrap">
        {/* <video
          autoPlay
          loop
          muted
          playsInline
          src={MainVideo}
          className="homepage-video"
        ></video> */}
      </div>
      <div className="header-overlay"></div>
      <div className="header-content">
        <img src={Logo} alt="Zoot" />
      </div>
    </div>
  );
};
