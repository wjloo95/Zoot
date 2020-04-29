import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { List, Avatar, Button, Spin } from 'antd';
import { ListingsSkeleton } from './children';
import './style.css';

import { Listings as ListingsData } from './__generated__/Listings';
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from './__generated__/DeleteListing';

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface IProps {
  title: string;
}

export const Listings = ({ title }: IProps) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);
  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError },
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <List
      header="Our Listings"
      dataSource={listings}
      itemLayout="horizontal"
      renderItem={(listing) => (
        <List.Item
          actions={[
            <Button
              type="primary"
              onClick={() => handleDeleteListing(listing.id)}
            >
              {' '}
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} size={48} shape="square" />}
          />
        </List.Item>
      )}
    />
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>
      Uh oh! Something went wrong with deleting :(. Please try again soon.
    </h4>
  ) : null;

  if (error) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} error />
      </div>
    );
  }

  return loading ? (
    <div className="listings">
      <ListingsSkeleton title={title} />
    </div>
  ) : (
    <div className="listings">
      <Spin spinning={deleteListingLoading}>
        <h2>{title}</h2>
        {listingsList}
        {deleteListingErrorMessage}
      </Spin>
    </div>
  );
};
