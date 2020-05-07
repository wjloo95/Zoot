import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils';

import { UserOutlined, CompassOutlined, StarFilled } from '@ant-design/icons';
import { Card, Typography } from 'antd';
const { Text, Title } = Typography;

interface IProps {
  listing: {
    id: string;
    name: string;
    image: string;
    street: string;
    reviews: number;
    rating: number;
    price: number;
    numOfGuests: number;
  };
  map?: boolean;
}

export const ListingCard = ({ listing, map }: IProps) => {
  const {
    id,
    name,
    image,
    street,
    reviews,
    rating,
    price,
    numOfGuests,
  } = listing;

  const starSection =
    reviews > 0 ? (
      <>
        {((rating * 5) / 100).toFixed(2)} - {reviews} Reviews
      </>
    ) : (
      <>No Reviews</>
    );
  return map ? (
    <Link to={`/listing/${id}`}>
      <Card
        hoverable
        cover={
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="map-card__cover-img"
          />
        }
      >
        <div className="map-card__details">
          <div className="map-card__description">
            <StarFilled style={{ color: '#f6b93b', marginRight: '3px' }} />
            {starSection}
            <Title level={4} className="map-card__price">
              {`${formatPrice(price)}`}
              <span>/night</span>
            </Title>
            <Text strong ellipsis className="map-card__title">
              {name}
            </Text>
          </div>
        </div>
      </Card>
    </Link>
  ) : (
    <Link to={`/listing/${id}`}>
      <Card
        hoverable
        cover={
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="listing-card__cover-img"
          />
        }
      >
        <div className="listing-card__details">
          <div className="listing-card__description">
            <StarFilled style={{ color: '#f6b93b', marginRight: '3px' }} />
            {starSection}
            <Title level={4} className="listing-card__price">
              {`${formatPrice(price)}`}
              <span>/night</span>
            </Title>
            <Text strong ellipsis className="listing-card__title">
              {name}
            </Text>
          </div>
          <div className="listing-card-bottom">
            <div className="listing-card-bottom-address">
              <CompassOutlined />
              <Text ellipsis>{street}</Text>
            </div>
            <div className="listing-card-bottom-guests">
              <UserOutlined />
              <Text>{numOfGuests} guests</Text>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
