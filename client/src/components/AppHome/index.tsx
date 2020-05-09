import React, { useState } from 'react';
import './style.css';

import MainVideo from './assets/MainVideo.mp4';
import ExperiencesVideo from './assets/FoodVideo.mp4';
import PlaneVideo from './assets/PlaneVideo.mp4';
import BookingsVideo from './assets/BookingsVideo.mp4';

import ZootLogo from '../AppHeader/assets/Logo1NoBG.png';

export const AppHome = () => {
  const [currentVideo, setCurrentVideo] = useState(MainVideo);

  return (
    <>
      <div className="homepage-hero">
        <video
          autoPlay
          loop
          muted
          playsInline
          src={MainVideo}
          style={{
            opacity: currentVideo === MainVideo ? 1 : 0,
            transition: 'opacity, 0.25s ease-in-out',
          }}
          className="homepage-video homepage-video-main"
        ></video>
        <video
          autoPlay
          loop
          muted
          playsInline
          src={PlaneVideo}
          style={{
            opacity: currentVideo === PlaneVideo ? 1 : 0,
            transition: 'opacity, 0.25s ease-in-out',
          }}
          className="homepage-video homepage-video-flights"
        ></video>
        <video
          autoPlay
          loop
          muted
          playsInline
          src={BookingsVideo}
          style={{
            opacity: currentVideo === BookingsVideo ? 1 : 0,
            transition: 'opacity, 0.25s ease-in-out',
          }}
          className="homepage-video homepage-video-bookings"
        ></video>
        <video
          autoPlay
          loop
          muted
          playsInline
          src={ExperiencesVideo}
          style={{
            opacity: currentVideo === ExperiencesVideo ? 1 : 0,
            transition: 'opacity, 0.25s ease-in-out',
          }}
          className="homepage-video homepage-video-experiences"
        ></video>
        <div className="homepage-hero-content">
          <div className="hero-text">
            <img src={ZootLogo} />
            <p>Start your adventure!</p>
          </div>
          <div className="hero-nav">
            <div
              className="hero-card hero-card-flights"
              onMouseEnter={() => {
                setCurrentVideo(PlaneVideo);
              }}
              onMouseLeave={() => {
                setCurrentVideo(MainVideo);
              }}
            >
              Plan your Flight!
            </div>
            <div
              className="hero-card hero-card-bookings"
              onMouseEnter={() => {
                setCurrentVideo(BookingsVideo);
              }}
              onMouseLeave={() => {
                setCurrentVideo(MainVideo);
              }}
            >
              Book your Stay!
            </div>
            <div
              className="hero-card hero-card-experiences"
              onMouseEnter={() => {
                setCurrentVideo(ExperiencesVideo);
              }}
              onMouseLeave={() => {
                setCurrentVideo(MainVideo);
              }}
            >
              Have an Adventure!
            </div>
          </div>
        </div>
      </div>
      <div className="homepage-content">
        <h1>TEXT</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores
          omnis aut est qui asperiores facilis non sequi libero! Nesciunt
          repellendus quaerat laboriosam illo soluta expedita labore eos, sit
          perspiciatis debitis! Lorem ipsum dolor, sit amet consectetur
          adipisicing elit. Earum blanditiis recusandae, corporis expedita
          nesciunt omnis veniam laboriosam nihil fugiat dolor explicabo, quaerat
          asperiores dolores error voluptatibus in numquam ullam? Nemo.
        </p>
      </div>
    </>
  );
};
