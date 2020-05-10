import React from 'react';
import { Link } from 'react-router-dom';

import torontoImage from '../../assets/toronto.jpg';
import losAngelesImage from '../../assets/los-angeles.jpg';
import londonImage from '../../assets/london.jpg';
import parisImage from '../../assets/france.jpg';

export const HomeSuggestions = () => {
  return (
    <div className="listings-suggestions">
      <div className="suggestion-container">
        <Link to="/listings/Toronto">
          <div className="suggestion-card">
            <img
              alt="toronto"
              src={torontoImage}
              className="suggestion-image"
            />
            <h1 className="suggestion-name">Toronto</h1>
          </div>
        </Link>
      </div>
      <div className="suggestion-container">
        <Link to="/listings/Los%20Angeles">
          <div className="suggestion-card">
            <img
              alt="los-angeles"
              src={losAngelesImage}
              className="suggestion-image"
            />
            <h1 className="suggestion-name">Los Angeles</h1>
          </div>
        </Link>
      </div>
      <div className="suggestion-container">
        <Link to="/listings/London">
          <div className="suggestion-card">
            <img alt="london" src={londonImage} className="suggestion-image" />
            <h1 className="suggestion-name">London</h1>
          </div>
        </Link>
      </div>
      <div className="suggestion-container">
        <Link to="/listings/Paris">
          <div className="suggestion-card">
            <img alt="paris" src={parisImage} className="suggestion-image" />
            <h1 className="suggestion-name">Paris</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};
