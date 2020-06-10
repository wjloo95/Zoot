import React from 'react';

import { HomeHero } from '../HomeHero';
import { HomeSection, LoginSection } from './children';

import FlightsImage from '../../lib/assets/FlightsHome.jpg';
import StaysImage from '../../lib/assets/StaysHome.jpg';
import ExperiencesImage from '../../lib/assets/ExperiencesHome.jpg';

import './style.css';
import { Viewer } from '../../lib/types';

interface IProps {
  viewer: Viewer;
}

export const AppHome = ({ viewer }: IProps) => {
  return (
    <>
      <HomeHero />
      <div className="home-body">
        <LoginSection viewer={viewer} />
        <HomeSection
          name="Flights"
          image={FlightsImage}
          description="Take the hassle out of airplane travel. Zoot can help you find the most convenient flights at the best prices so you can be on your way!"
        />
        <HomeSection
          name="Stays"
          image={StaysImage}
          description="Find an incredible place to stay from Zoot's repository of over 500,000 apartments and houses around the globe!"
        />
        <HomeSection
          name="Experiences"
          image={ExperiencesImage}
          description="Meet amazing people and discover unforgettable experiences wherever you're headed!"
        />
      </div>
    </>
  );
};
