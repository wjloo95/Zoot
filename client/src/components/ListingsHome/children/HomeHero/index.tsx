import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Input, Row, Typography } from 'antd';

import torontoImage from '../../assets/toronto.jpg';
import franceImage from '../../assets/france.jpg';
import losAngelesImage from '../../assets/los-angeles.jpg';
import londonImage from '../../assets/london.jpg';

const { Title } = Typography;
const { Search } = Input;

interface IProps {
  onSearch: (value: string) => void;
}

export const HomeHero = ({ onSearch }: IProps) => {
  return (
    <div className="home-hero">
      <div className="home-hero__search">
        <Title className="home-hero__title">
          Find a place you'll love to stay
        </Title>
        <Search
          placeholder="Search 'San Francisco'"
          size="large"
          enterButton
          className="home-hero__search-input"
          onSearch={onSearch}
        />
      </div>
      <Row gutter={12} className="home-hero__cards">
        <Col xs={12} md={6}>
          <Link to="/listings/Toronto">
            <Card cover={<img alt="toronto" src={torontoImage} />}>
              Toronto
            </Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
          <Link to="/listings/Los%20Angeles">
            <Card cover={<img alt="los-angeles" src={losAngelesImage} />}>
              Los Angeles
            </Card>
          </Link>
        </Col>
        <Col xs={0} md={6}>
          <Link to="/listings/London">
            <Card cover={<img alt="london" src={londonImage} />}>London</Card>
          </Link>
        </Col>
        <Col xs={12} md={6}>
          <Link to="/listings/Paris">
            <Card cover={<img alt="france" src={franceImage} />}>Paris</Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
};
