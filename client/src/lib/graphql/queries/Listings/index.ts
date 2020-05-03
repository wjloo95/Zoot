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
        title
        image
        address
        price
        numOfGuests
      }
    }
  }
`;
