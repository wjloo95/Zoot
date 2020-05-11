import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils';

import { UserOutlined, CompassOutlined, StarFilled } from '@ant-design/icons';

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
      <div className="listing-card-container">
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="map-card-cover-img"
        />
        <div className="map-card-details">
          <div className="map-card-description">
            <StarFilled
              style={{
                color: 'var(--light-secondary-color)',
                marginRight: '3px',
              }}
            />
            {starSection}
            <h4 className="listing-card-price">
              {`${formatPrice(price)}`}
              <span>/night</span>
            </h4>
          </div>
        </div>
      </div>
    </Link>
  ) : (
    <Link to={`/listing/${id}`}>
      <div className="listing-card-container">
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="listing-card-cover-img"
        />
        <div className="listing-card-details">
          <div className="listing-card-description">
            <StarFilled style={{ color: '#f6b93b', marginRight: '3px' }} />
            {starSection}
            <h4 className="listing-card-price">
              {`${formatPrice(price)}`}
              <span>/night</span>
            </h4>
            <span className="listing-card-title">{name}</span>
          </div>
          <div className="listing-card-bottom">
            <div className="listing-card-bottom-address">
              <CompassOutlined />
              <span className="listing-card-street">{street}</span>
            </div>
            <div className="listing-card-bottom-guests">
              <UserOutlined />
              <span>{numOfGuests} guests</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
