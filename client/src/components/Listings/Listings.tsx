import React, { FunctionComponent } from 'react';
import { server } from '../../lib/api';
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

interface IProps {}

export const Listings: FunctionComponent<IProps> = () => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data);
  };

  const deleteListing = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id: '5d4507a9cf295034813b35c2', // hardcoded id variable,
      },
    });
    console.log(data); // check the console to see the result of the mutation!
  };

  return (
    <>
      <h2>Tiny House Listings</h2>
      <button onClick={fetchListings}>Get our Listings!</button>
      <button onClick={deleteListing}>Delete a Listing!</button>
    </>
  );
};
