import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useHistory, Link } from 'react-router-dom';

import { HomeHero, HomeListingsSkeleton, HomeListings } from './children';

import mapBackground from './assets/map-background.jpg';
import sanFranciscoImage from './assets/san-francisco.jpg';
import cancunImage from './assets/cancun.jpg';
import torontoImage from './assets/toronto.jpg';
import franceImage from './assets/france.jpg';
import losAngelesImage from './assets/los-angeles.jpg';
import londonImage from './assets/london.jpg';

import {
  ListingsVariables,
  Listings as ListingsData,
} from '../../lib/graphql/queries/Listings/__generated__/Listings';
import { LISTINGS } from '../../lib/graphql/queries';
import { ListingsSort } from '../../lib/graphql/globalTypes';

import { Col, Row, Typography, Layout, Button, Card } from 'antd';
const { Content } = Layout;
const { Paragraph, Title } = Typography;

const PAGE_LIMIT = 6;
const PAGE_NUMBER = 1;

export const ListingsHome = () => {
  const { data, loading } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      variables: {
        sort: ListingsSort.RATINGS_COUNT,
        limit: PAGE_LIMIT,
        page: PAGE_NUMBER,
      },
      fetchPolicy: 'cache-and-network',
    }
  );

  const topListingsSection = loading ? (
    <HomeListingsSkeleton />
  ) : data ? (
    <HomeListings listings={data.listings.result} />
  ) : null;

  return (
    <>
      <HomeHero />
      <div className="listings-home-bottom">
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
        <div className="home__cta-section">
          <Title level={2} className="home__cta-section-title">
            Your guide for all things rental
          </Title>
          <Paragraph>
            Helping you make the best decisions in renting your last minute
            locations.
          </Paragraph>
          <Button>
            <Link to="/listings/United%20States">
              Highly Rated Listings in the United States
            </Link>
          </Button>
        </div>
        {topListingsSection}
        <div className="home__listings">
          <Title level={4} className="home__listings-title">
            Listings of any kind
          </Title>
          <Row gutter={12}>
            <Col xs={24} sm={12}>
              <Link to="/listings/San%20Francisco">
                <div className="home__listings-img-cover">
                  <img
                    src={sanFranciscoImage}
                    alt="San Francisco"
                    className="home__listings-img"
                  />
                </div>
              </Link>
            </Col>
            <Col xs={24} sm={12}>
              <Link to="/listings/Cancún">
                <div className="home__listings-img-cover">
                  <img
                    src={cancunImage}
                    alt="Cancún"
                    className="home__listings-img"
                  />
                </div>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
