import React from 'react';

import BookingsVideo from '../../assets/MainVideo.mp4';
import Logo from '../../../../lib/assets/LightLogo.png';
import { LandingSearchBar } from '../../../LandingSearchBar';
import { Link } from 'react-router-dom';

export const HomeHero = () => {
  return (
    <div className="listings-video-container">
      <div className="listings-header">
        <img src={Logo} alt="Zoot" />
        <div className="listings-header-nav">
          <Link to="/flights">
            <div className="listings-flights">Flights</div>
          </Link>
          <Link to="/listings">
            <div className="listings-stays">Stays</div>
          </Link>
          <Link to="/experiences">
            <div className="listings-experiences">Experiences</div>
          </Link>
        </div>
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
        <LandingSearchBar placeholder="Search 'San Francisco'" />
      </div>
    </div>
  );
};
