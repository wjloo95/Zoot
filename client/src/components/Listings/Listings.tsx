import React from 'react';
import { useQuery, useMutation } from '../../lib/api';
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData,
} from './types';

const LISTINGS = `
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

const DELETE_LISTING = `
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
    await deleteListing({ id });
    refetch();
  };
  if (error) {
    return <h2>Uh Oh! Something went wrong - please try again later</h2>;
  }

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => (
        <li key={listing.id}>
          {listing.title}{' '}
          <button onClick={() => handleDeleteListing(listing.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
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
    <>
      <h2>{title}</h2>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </>
  );
};
