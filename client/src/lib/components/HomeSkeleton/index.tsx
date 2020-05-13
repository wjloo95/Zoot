import React from 'react';
import Logo from '../../../lib/assets/LightLogo.png';
import FlightsFrame from '../../assets/FlightsFrame.jpeg';
import StaysFrame from '../../assets/StaysFrame.jpeg';
import ExperiencesFrame from '../../assets/ExperiencesFrame.jpeg';
import MainFrame from '../../assets/MainFrame.jpeg';
import { SearchOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

export const HomeSkeleton = () => {
  const location = useLocation();

  const currentImage =
    location.pathname === '/'
      ? MainFrame
      : location.pathname === '/flights'
      ? FlightsFrame
      : location.pathname === '/listings'
      ? StaysFrame
      : ExperiencesFrame;

  return (
    <div
      className="listings-video-container"
      style={{
        backgroundImage: `url(${currentImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="listings-header">
        <img src={Logo} alt="Zoot" className="listings-header-logo" />
        <div className="listings-header-nav">
          <div
            className="listings-skeleton-nav"
            style={{
              borderBottom:
                location.pathname === '/flights'
                  ? '2px solid var(--light-font-color)'
                  : '',
            }}
          >
            Flights
          </div>
          <div
            className="listings-skeleton-nav"
            style={{
              borderBottom:
                location.pathname === '/listings'
                  ? '2px solid var(--light-font-color)'
                  : '',
            }}
          >
            Stays
          </div>
          <div
            className="listings-skeleton-nav"
            style={{
              borderBottom:
                location.pathname === '/experiences'
                  ? '2px solid var(--light-font-color)'
                  : '',
            }}
          >
            Experiences
          </div>
        </div>
      </div>
      {/* <img
        src={currentImage}
        alt="Loading"
        className="listings-video listings-skeleton-image"
        style={{ height: '55vh' }}
      /> */}
      <div className="listings-overlay"></div>
      <div className="home-hero__search">
        <div className={`landing-search-bar`}>
          <input
            type="text"
            className={`landing-search-input`}
            placeholder="Search 'San Francisco'"
          ></input>
          <div className={`landing-search-button`}>
            <SearchOutlined className={`landing-search-icon`} />
          </div>
        </div>
      </div>
    </div>
  );
};
