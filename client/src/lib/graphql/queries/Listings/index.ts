import { gql } from 'apollo-boost';

export const LISTINGS = gql`
  query Listings($sort: ListingsSort, $limit: Int!, $page: Int!) {
    listings(sort: $sort, limit: $limit, page: $page) {
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
