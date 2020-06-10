import React from 'react';

import StaysVideo from '../../lib/assets/StaysResize.mp4';
import FlightsVideo from '../../lib/assets/FlightsResize.mp4';
import ExperiencesVideo from '../../lib/assets/ExperiencesResize.mp4';
import MainVideo from '../../lib/assets/MainResize.mp4';
import MainFrame from '../../lib/assets/MainResizeFrame.jpeg';
import FlightsFrame from '../../lib/assets/FlightsResizeFrame.jpeg';
import ExperiencesFrame from '../../lib/assets/ExperiencesResizeFrame.jpeg';
import StaysFrame from '../../lib/assets/StaysResizeFrame.jpeg';
import Logo from '../../lib/assets/LightLogo.png';
import { NavLink, useHistory } from 'react-router-dom';
import { SearchBar } from '../index';
import './style.css';

export const HomeHero = () => {
  const history = useHistory();

  const pageConfig =
    history.location.pathname === '/flights'
      ? {
          video: FlightsVideo,
          image: FlightsFrame,
          overlayColor: 'var(--orange-transparent-color)',
        }
      : history.location.pathname === '/experiences'
      ? {
          video: ExperiencesVideo,
          image: ExperiencesFrame,
          overlayColor: 'var(--red-transparent-color)',
        }
      : history.location.pathname === '/listings'
      ? {
          video: StaysVideo,
          image: StaysFrame,
          overlayColor: 'var(--primary-transparent-color)',
        }
      : {
          video: MainVideo,
          image: MainFrame,
          overlayColor: 'var(--dark-transparent-color)',
        };

  const { video, image, overlayColor } = pageConfig;

  return (
    <div
      className="listings-video-container"
      style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="listings-header">
        <NavLink to="/">
          <img src={Logo} alt="Zoot" className="listings-header-logo" />
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
        src={video}
        className="listings-video"
      ></video>
      <div
        className="listings-overlay"
        style={{ backgroundColor: overlayColor }}
      ></div>
      {history.location.pathname === '/listings' ? (
        <div className="home-hero__search">
          <SearchBar placeholder="Search 'San Francisco'" type="landing" />
        </div>
      ) : null}
    </div>
  );
};
