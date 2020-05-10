import React, { useState } from 'react';
import './style.css';

import MainVideo from './assets/coverr-aerial-view-of-rocky-mountains-1585320758193.mp4';

import Logo from '../../lib/assets/DarkLogo.png';

export const AppHome = () => {
  const [menuOptionSelected, setmenuOptionSelected] = useState<string | null>(
    null
  );

  const backdropColor = menuOptionSelected ? 'rgb(0,0,0,0.5)' : '#263a3a49';

  return (
    <div className="v-header container">
      <div className="fullscreen-video-wrap">
        <video
          autoPlay
          loop
          muted
          playsInline
          src={MainVideo}
          className="homepage-video"
        ></video>
      </div>
      <div
        className="header-overlay"
        style={{
          backgroundColor: backdropColor,
        }}
      ></div>
      <div className="header-content">
        <img src={Logo} />
      </div>
    </div>
  );
};
