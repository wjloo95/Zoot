import React from 'react';

import BookingsVideo from '../../assets/MainVideo.mp4';
import Logo from '../../assets/NewLogoCropped.png';
import { LandingSearchBar } from '../../../LandingSearchBar';

export const HomeHero = () => {
  return (
    <div className="listings-video-container">
      <div className="listings-header">
        <div className="listings-flights">Flights</div>
        <img src={Logo} alt="Zoot" />
        <div className="listings-experiences">Experiences</div>
      </div>
      <video
        autoPlay
        loop
        muted
        playsInline
        src={BookingsVideo}
        className="listings-video"
      ></video>
      <div className="listings-overlay"></div>
      <div className="home-hero__search">
        <h1 className="home-hero__title">Find a place you'll love to stay</h1>
        <LandingSearchBar placeholder="Search 'San Francisco'" />
      </div>
    </div>
  );
};
