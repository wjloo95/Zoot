import React from 'react';
import { Card, Typography } from 'antd';
import { UserOutlined, CompassOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils';

interface IProps {
  listing: {
    id: string;
    name: string;
    thumbnail: string;
    street: string;
    reviews: number;
    rating: number;
    price: number;
    numOfGuests: number;
  };
}

const { Text, Title } = Typography;
export const ListingCard = ({ listing }: IProps) => {
  const {
    id,
    name,
    thumbnail,
    street,
    reviews,
    rating,
    price,
    numOfGuests,
  } = listing;
  return (
    <Link to={`/listing/${id}`}>
      <Card
        hoverable
        cover={
          <div
            style={{ backgroundImage: `url(${thumbnail})` }}
            className="listing-card__cover-img"
          />
        }
      >
        <div className="listing-card__details">
          <div className="listing-card__description">
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
