import React from 'react';
import { Input } from 'antd';

import BookingsVideo from '../../assets/MainVideo.mp4';
import Logo from '../../assets/NewLogoCropped.png';

const { Search } = Input;

interface IProps {
  onSearch: (value: string) => void;
}

export const HomeHero = ({ onSearch }: IProps) => {
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
        <Search
          placeholder="Search 'San Francisco'"
          size="large"
          enterButton
          className="home-hero__search-input"
          onSearch={onSearch}
        />
      </div>
    </div>
  );
};
