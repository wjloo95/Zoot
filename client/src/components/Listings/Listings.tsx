import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { List } from 'antd';
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
  if (error) {
    return <h2>Uh Oh! Something went wrong - please try again later</h2>;
  }

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <List
      header="Our Listings"
      dataSource={listings}
      itemLayout="horizontal"
      renderItem={(listing) => (
        <List.Item>
          <List.Item.Meta title={listing.title} />
          <button onClick={() => handleDeleteListing(listing.id)}>
            Delete
          </button>
        </List.Item>
      )}
    />
  ) : null;

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deletion in progress...</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>
      Uh oh! Something went wrong with deleting :(. Please try again soon.
    </h4>
  ) : null;

  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <div className="listings">
      <h2>{title}</h2>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};
