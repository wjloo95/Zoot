import React, { useState, useEffect } from 'react';
import { server } from '../../lib/api';
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData,
  Listing,
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
  const [listings, setListings] = useState<Listing[] | null>(null);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    setListings(data.listings);
  };

  const deleteListing = async (id: string) => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id, // hardcoded id variable,
      },
    });
    fetchListings();
  };

  const listingsList = listings ? (
    <ul>
      {listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title}{' '}
            <button onClick={() => deleteListing(listing.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  ) : null;

  return (
    <>
      <h2>{title}</h2>
      {listingsList}
    </>
  );
};
