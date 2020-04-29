import React, { FunctionComponent } from 'react';
import { server } from '../../lib/api';
import { ListingsData } from './types';

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

interface IProps {}

export const Listings: FunctionComponent<IProps> = () => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.log(data);
  };
  return (
    <>
      <h2>Tiny House Listings</h2>
      <button onClick={fetchListings}>Get our Listings!</button>
    </>
  );
};
