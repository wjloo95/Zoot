import { gql } from 'apollo-boost';

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite {
    removeFavorite {
      id
    }
  }
`;
