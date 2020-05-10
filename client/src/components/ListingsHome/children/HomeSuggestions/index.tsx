import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';

import torontoImage from '../../assets/toronto.jpg';
import losAngelesImage from '../../assets/los-angeles.jpg';
import londonImage from '../../assets/london.jpg';
import franceImage from '../../assets/france.jpg';

export const HomeSuggestions = () => {
  return (
    <div className="home-hero__cards">
      <div>
        <Link to="/listings/Toronto">
          <Card cover={<img alt="toronto" src={torontoImage} />}>Toronto</Card>
        </Link>
      </div>
      <div>
        <Link to="/listings/Los%20Angeles">
          <Card cover={<img alt="los-angeles" src={losAngelesImage} />}>
            Los Angeles
          </Card>
        </Link>
      </div>
      <div>
        <Link to="/listings/London">
          <Card cover={<img alt="london" src={londonImage} />}>London</Card>
        </Link>
      </div>
      <div>
        <Link to="/listings/Paris">
          <Card cover={<img alt="france" src={franceImage} />}>Paris</Card>
        </Link>
      </div>
    </div>
  );
};
