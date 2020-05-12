import { gql } from 'apollo-boost';

export const LISTINGS = gql`
  query Listings(
    $location: String
    $sort: ListingsSort!
    $limit: Int!
    $page: Int!
  ) {
    listings(location: $location, sort: $sort, limit: $limit, page: $page) {
      region
      total
      result {
        id
        name
        image
        street
        latitude
        longitude
        reviews
        rating
        price
        numOfGuests
      }
    }
  }
`;
export const LOCATIONS = gql`
  query Locations {
    locations{
      result
  }
`;
