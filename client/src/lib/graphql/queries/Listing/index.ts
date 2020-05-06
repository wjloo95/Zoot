import { gql } from 'apollo-boost';

export const LISTING = gql`
  query Listing($id: ID!, $bookingsPage: Int!, $limit: Int!) {
    listing(id: $id) {
      id
      name
      description
      notes
      rules
      image
      host {
        id
        name
        avatar
        hasWallet
      }
      property
      room
      street
      city
      bookings(limit: $limit, page: $bookingsPage) {
        total
        result {
          id
          tenant {
            id
            name
            avatar
          }
          checkIn
          checkOut
        }
      }
      bookingsIndex
      price
      minimum
      rating
      reviews
      numOfGuests
    }
  }
`;
