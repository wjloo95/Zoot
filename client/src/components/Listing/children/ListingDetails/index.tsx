import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Divider, Tag, Typography } from 'antd';
import { Listing as ListingData } from '../../../../lib/graphql/queries/Listing/__generated__/Listing';
import { EnvironmentFilled } from '@ant-design/icons';

interface IProps {
  listing: ListingData['listing'];
}

const { Paragraph, Title } = Typography;

export const ListingDetails = ({ listing }: IProps) => {
  const {
    name,
    description,
    notes,
    rules,
    property,
    street,
    city,
    numOfGuests,
    bedrooms,
    bathrooms,
    rating,
    reviews,
    host,
  } = listing;

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
        <Title level={3} className="listing-details__title">
          {name}
        </Title>
      </div>

      <Divider />

      <div className="listing-details__section">
        <Link to={`/user/${host.id}`}>
          <Avatar src={host.avatar} size={64} />
          <Title level={2} className="listing-details__host-name">
            {host.name}
          </Title>
        </Link>
      </div>

      <Divider />

      <div className="listing-details__section">
        <Title level={4}>About this space</Title>
        <div className="listing-details__about-items">
          <Tag color="magenta">{property}</Tag>
          <Tag color="magenta">{numOfGuests} Guests</Tag>
        </div>
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>
          {description}
        </Paragraph>
      </div>
    </div>
  );
};
