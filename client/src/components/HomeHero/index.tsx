import React from 'react';

import StaysVideo from '../../lib/assets/StaysVideo.mp4';
import FlightsVideo from '../../lib/assets/FlightsVideo.mp4';
import ExperiencesVideo from '../../lib/assets/ExperiencesVideo.mp4';
import MainVideo from '../../lib/assets/MainVideo.mp4';
import Logo from '../../lib/assets/LightLogo.png';
import { NavLink, useHistory } from 'react-router-dom';
import { SearchBar } from '../index';
import './style.css';

export const HomeHero = () => {
  const history = useHistory();

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
        <NavLink to="/">
          <img src={Logo} alt="Zoot" />
        </NavLink>
        <div className="listings-header-nav">
          <NavLink to="/flights" activeClassName="listings-header-active">
            <div>Flights</div>
          </NavLink>
          <NavLink to="/listings" activeClassName="listings-header-active">
            <div>Stays</div>
          </NavLink>
          <NavLink to="/experiences" activeClassName="listings-header-active">
            <div>Experiences</div>
          </NavLink>
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
