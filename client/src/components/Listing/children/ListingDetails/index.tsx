import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Divider, Tag, Typography } from 'antd';
import { Listing as ListingData } from '../../../../lib/graphql/queries/Listing/__generated__/Listing';
import { EnvironmentFilled, UserOutlined, StarFilled } from '@ant-design/icons';

import placeholder from '../../../../lib/assets/UserPlaceholder.png';

interface IProps {
  listing: ListingData['listing'];
}

const { Paragraph, Title } = Typography;

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
      <Title level={3}>Description</Title>
      <Paragraph ellipsis={{ rows: 3, expandable: true }}>
        {description}
      </Paragraph>
    </>
  ) : null;

  const rulesElement = rules.length ? (
    <>
      <Title level={3}>House Rules</Title>
      <Paragraph ellipsis={{ rows: 3, expandable: true }}>{rules}</Paragraph>
    </>
  ) : null;

  const notesElement = notes.length ? (
    <>
      <Title level={3}>Additional Notes</Title>
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
          <Divider type="vertical" />
        </Paragraph>
        <Title level={2} className="listing-details__title">
          {name}
        </Title>
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
          <Title level={2} className="listing-details__host-name">
            {host.name}
          </Title>
        </Link>
      </div>

      <Divider />

      <div className="listing-details__section">
        <div className="listing-details__about-items">
          <Tag color="magenta">{property}</Tag>
          <Tag color="magenta">{room}</Tag>
          <Tag color="magenta">{bedrooms} Bedrooms</Tag>
          <Tag color="magenta">{bathrooms} Bathrooms</Tag>
        </div>
        {descriptionElement}
        {rulesElement}
        {notesElement}
      </div>
    </div>
  );
};
