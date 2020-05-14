import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Divider, Typography } from 'antd';
import { Listing as ListingData } from '../../../../../lib/graphql/queries/Listing/__generated__/Listing';
import { EnvironmentFilled, UserOutlined, StarFilled } from '@ant-design/icons';

import placeholder from '../../../../../lib/assets/UserPlaceholder.png';
import { ListingMap } from '../ListingMap';

interface IProps {
  listing: ListingData['listing'];
}

const { Paragraph } = Typography;

export const ListingDetails = ({ listing }: IProps) => {
  const [avatarImage, setAvatarImage] = useState(listing.host.avatar);
  const {
    name,
    description,
    notes,
    rules,
    property,
    room,
    street,
    city,
    latitude,
    longitude,
    numOfGuests,
    bedrooms,
    bathrooms,
    rating,
    reviews,
    host,
  } = listing;

  const starSection =
    reviews > 0 ? (
      <>
        {((rating * 5) / 100).toFixed(2)} - {reviews} Reviews
      </>
    ) : (
      <>Be the first to submit a review!</>
    );

  const descriptionElement = description.length ? (
    <>
      <h2>Description</h2>
      <Paragraph ellipsis={{ rows: 3, expandable: true }}>
        {description}
      </Paragraph>
    </>
  ) : null;

  const rulesElement = rules.length ? (
    <>
      <h2>House Rules</h2>
      <Paragraph ellipsis={{ rows: 3, expandable: true }}>{rules}</Paragraph>
    </>
  ) : null;

  const notesElement = notes.length ? (
    <>
      <h2>Additional Notes</h2>
      <Paragraph ellipsis={{ rows: 3, expandable: true }}>{notes}</Paragraph>
    </>
  ) : null;

  return (
    <div className="listing-details">
      <div className="listing-details__information">
        <Paragraph
          type="secondary"
          ellipsis
          className="listing-details__city-address"
        >
          <Link to={`/listings/${city}`}>
            <EnvironmentFilled /> {city}
          </Link>
          <Divider type="vertical" />
          {street}
        </Paragraph>
        <h1 className="listing-details__title">{name}</h1>
        <UserOutlined />
        {numOfGuests} Guests
        <Divider type="vertical" />
        <StarFilled style={{ color: '#f6b93b', marginRight: '3px' }} />
        {starSection}
      </div>

      <Divider />

      <div className="listing-details__section">
        <Link to={`/user/${host.id}`}>
          <Avatar
            onError={() => {
              setAvatarImage(placeholder);
              return false;
            }}
            src={avatarImage}
            size={64}
          />
          <h1 className="listing-details__host-name">{host.name}</h1>
        </Link>
      </div>

      <Divider />

      <div className="listing-details__section">
        <div className="listing-details-tags">
          <span>{property}</span>
          <span>{room}</span>
          <span>{bedrooms} Bedrooms</span>
          <span>{bathrooms} Bathrooms</span>
        </div>
        {descriptionElement}
        {rulesElement}
        {notesElement}
      </div>

      <ListingMap latitude={latitude} longitude={longitude} />
    </div>
  );
};
