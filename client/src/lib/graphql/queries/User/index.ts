import { gql } from 'apollo-boost';

export const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      about
      avatar
      location
      since
      hasWallet
      income
    }
  }
`;

export const USER_BOOKINGS = gql`
  query UserBookings($id: ID!, $bookingsPage: Int!, $limit: Int!) {
    user(id: $id) {
      id
      bookings(limit: $limit, page: $bookingsPage) {
        total
        result {
          id
          listing {
            id
            name
            thumbnailImage
            image
            street
            reviews
            rating
            price
            numOfGuests
          }
          checkIn
          checkOut
        }
      }
    }
  }
`;

export const USER_LISTINGS = gql`
  query UserListings($id: ID!, $listingsPage: Int!, $limit: Int!) {
    user(id: $id) {
      id
      listings(limit: $limit, page: $listingsPage) {
        total
        result {
          id
          name
          thumbnailImage
          image
          street
          reviews
          rating
          price
          numOfGuests
        }
      }
    }
  }
`;

export const USER_FAVORITES = gql`
  query UserFavorites($id: ID!, $listingsPage: Int!, $limit: Int!) {
    user(id: $id) {
      id
      favoriteListings(limit: $limit, page: $listingsPage) {
        total
        result {
          id
          name
          thumbnailImage
          image
          street
          reviews
          rating
          price
          numOfGuests
        }
      }
    }
  }
`;
