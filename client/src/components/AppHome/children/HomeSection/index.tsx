import React from 'react';
import { Link } from 'react-router-dom';

import {
  HomeOutlined,
  TeamOutlined,
  RocketOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';

interface IProps {
  name: string;
  image: string;
  description: string;
}

export const HomeSection = ({ name, image, description }: IProps) => {
  const buttonIcon =
    name === 'Flights' ? (
      <RocketOutlined />
    ) : name === 'Stays' ? (
      <HomeOutlined />
    ) : (
      <TeamOutlined />
    );

  return (
    <div className="home-body-section">
      <div
        className="home-body-left"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="home-body-right">
        <div className="right-section-description">{description}</div>
        <Link
          to={`/${name === 'Stays' ? 'listings' : name.toLowerCase()}`}
          className={`right-section-button right-${name}-button`}
        >
          {buttonIcon}
          {' ' + name} <ArrowRightOutlined />
        </Link>
      </div>
    </div>
  );
};
