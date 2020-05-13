import React from 'react';

import StaysVideo from '../../assets/StaysVideo.mp4';
import Logo from '../../../../lib/assets/LightLogo.png';
import { Link, useHistory } from 'react-router-dom';
import { SearchBar } from '../../../index';

export const HomeHero = () => {
  const history = useHistory();

  const flightStyles =
    history.location.pathname === '/flights' ? ' listings-header-active' : '';
  const listingStyles =
    history.location.pathname === '/listings' ||
    history.location.pathname === '/'
      ? ' listings-header-active'
      : '';
  const experienceStyles =
    history.location.pathname === '/experiences'
      ? ' listings-header-active'
      : '';

  return (
    <div className="listings-video-container">
      <div className="listings-header">
        <Link to="/">
          <img src={Logo} alt="Zoot" />
        </Link>
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
        src={StaysVideo}
        className="listings-video"
      ></video>
      <div className="listings-overlay"></div>
      <div className="home-hero__search">
        <SearchBar placeholder="Search 'San Francisco'" type="landing" />
      </div>
    </div>
  );
};
