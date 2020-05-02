import React from 'react';
import { Col, Row, Typography, Layout, Button } from 'antd';

import { HomeHero, HomeListingsSkeleton, HomeListings } from './children';

import mapBackground from './assets/map-background.jpg';
import sanFranciscoImage from './assets/san-francisco.jpg';
import cancunImage from './assets/cancun.jpg';

import { useHistory, Link } from 'react-router-dom';
import { displayErrorMessage } from '../../lib/utils';
import { useQuery } from '@apollo/react-hooks';
import {
  ListingsVariables,
  Listings as ListingsData,
} from '../../lib/graphql/queries/Listings/__generated__/Listings';
import { LISTINGS } from '../../lib/graphql/queries';
import { ListingsSort } from '../../lib/graphql/globalTypes';

const { Content } = Layout;
const { Paragraph, Title } = Typography;

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

export const ListingsHome = () => {
  let history = useHistory();

  const { data, loading } = useQuery<ListingsData, ListingsVariables>(
    LISTINGS,
    {
      variables: {
        sort: ListingsSort.PRICE_HIGH_TO_LOW,
        limit: PAGE_LIMIT,
        page: PAGE_NUMBER,
      },
    }
  );

  const topListingsSection = loading ? (
    <HomeListingsSkeleton />
  ) : data ? (
    <HomeListings title="Premium Listings" listings={data.listings.result} />
  ) : null;

  const onSearch = (value: string) => {
    const trimmedValue = value.trim();
    const onlyChars = /^[a-zA-Z]+$/;
    if (trimmedValue === '' || !onlyChars.test(trimmedValue)) {
      displayErrorMessage('Please enter a valid search term!');
    } else {
      history.push(`/listings/${trimmedValue}`);
    }
  };
  return (
    <Content
      className="home"
      style={{ backgroundImage: `url(${mapBackground})` }}
    >
      <HomeHero onSearch={onSearch} />

      <div className="home__cta-section">
        <Title level={2} className="home__cta-section-title">
          Your guide for all things rental
        </Title>
        <Paragraph>
          Helping you make the best decisions in renting your last minute
          locations.
        </Paragraph>
        <Button>
          <Link to="/listings/united%20states">
            Popular listings in the United States
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
            <Link to="/listings/san%20fransisco">
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
            <Link to="/listings/cancún">
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
    </Content>
  );
};
