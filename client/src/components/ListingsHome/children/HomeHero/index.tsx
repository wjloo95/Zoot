import React from 'react';

import BookingsVideo from '../../assets/MainVideo.mp4';
import Logo from '../../../../lib/assets/LightLogo.png';
import { LandingSearchBar } from '../../../LandingSearchBar';
import { Link, useHistory } from 'react-router-dom';

export const HomeHero = () => {
  const history = useHistory();

  const flightStyles =
    history.location.pathname === '/flights' ? ' listings-header-active' : '';
  const listingStyles =
    history.location.pathname === '/listings' ? ' listings-header-active' : '';
  const experienceStyles =
    history.location.pathname === '/experiences'
      ? ' listings-header-active'
      : '';

  return (
    <div className="listings-video-container">
      <div className="listings-header">
        <img src={Logo} alt="Zoot" />
        <div className="listings-header-nav">
          <Link to="/flights" className={flightStyles}>
            <div>Flights</div>
          </Link>
          <Link to="/listings" className={listingStyles}>
            <div>Stays</div>
          </Link>
          <Link to="/experiences" className={experienceStyles}>
            <div>Experiences</div>
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
