import React from 'react';

import StaysVideo from '../../lib/assets/StaysVideo.mp4';
import FlightsVideo from '../../lib/assets/FlightsVideo.mp4';
import ExperiencesVideo from '../../lib/assets/ExperiencesVideo.mp4';
import MainVideo from '../../lib/assets/MainVideo.mp4';
import Logo from '../../lib/assets/LightLogo.png';
import { Link, useHistory } from 'react-router-dom';
import { SearchBar } from '../index';
import './style.css';

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

  const currentVideo =
    history.location.pathname === '/flights'
      ? FlightsVideo
      : history.location.pathname === '/experiences'
      ? ExperiencesVideo
      : history.location.pathname === '/listings'
      ? StaysVideo
      : MainVideo;

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
        src={currentVideo}
        className="listings-video"
      ></video>
      <div className="listings-overlay"></div>
      <div className="home-hero__search">
        <SearchBar placeholder="Search 'San Francisco'" type="landing" />
      </div>
    </div>
  );
};
