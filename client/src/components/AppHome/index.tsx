import React, { useState } from 'react';
import './style.css';

import MainVideo from './assets/coverr-aerial-view-of-rocky-mountains-1585320758193.mp4';
// import ExperiencesVideo from './assets/FoodVideo.mp4';
// import BookingsVideo from './assets/BookingsVideo.mp4';
// import FlightsVideo from './assets/PlaneVideo.mp4';

import Logo from '../AppHeader/assets/NewLogoCropped.png';
// import { Link } from 'react-router-dom';

export const AppHome = () => {
  const [menuOptionSelected, setmenuOptionSelected] = useState<string | null>(
    null
  );

  const backdropColor = menuOptionSelected ? 'rgb(0,0,0,0.5)' : '#263a3a49';

  // const cardContent =
  //   menuOptionSelected === FlightsVideo
  //     ? 'Book a flight to your next destination!'
  //     : menuOptionSelected === BookingsVideo
  //     ? 'Find the perfect place to stay!'
  //     : menuOptionSelected === ExperiencesVideo
  //     ? 'Embark on your next exciting adventure!'
  //     : null;

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
        {/* <div className="hero-nav">
          <div
            className="hero-card hero-card-flights"
            onClick={() => {
              setmenuOptionSelected(FlightsVideo);
            }}
          >
            Flights
          </div>
          <div
            className="hero-card hero-card-bookings"
            onClick={() => {
              setmenuOptionSelected(BookingsVideo);
            }}
          >
            Accommodations
          </div>
          <div
            className="hero-card hero-card-experiences"
            onClick={() => {
              setmenuOptionSelected(ExperiencesVideo);
            }}
          >
            Experiences
          </div>
        </div> */}
        {/* <div className="information-card">
          <Link to="/comingsoon">
            <video
              autoPlay
              loop
              muted
              playsInline
              src={FlightsVideo}
              style={{ opacity: menuOptionSelected === FlightsVideo ? 1 : 0 }}
              className="video-card"
            ></video>
          </Link>
          <Link to="/listings">
            <video
              autoPlay
              loop
              muted
              playsInline
              src={BookingsVideo}
              style={{ opacity: menuOptionSelected === BookingsVideo ? 1 : 0 }}
              className="video-card"
            ></video>
          </Link>
          <Link to="/comingsoon">
            <video
              autoPlay
              loop
              muted
              playsInline
              src={ExperiencesVideo}
              style={{
                opacity: menuOptionSelected === ExperiencesVideo ? 1 : 0,
              }}
              className="video-card"
            ></video>
          </Link>
        </div> */}
      </div>
    </div>
  );
};
