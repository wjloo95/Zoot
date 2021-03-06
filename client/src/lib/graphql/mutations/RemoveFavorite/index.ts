import { gql } from 'apollo-boost';

export const REMOVE_FAVORITE = gql`
  mutation RemoveFavorite($input: RemoveFavoriteInput!) {
    removeFavorite(input: $input) {
      id
    }
  }
`;
