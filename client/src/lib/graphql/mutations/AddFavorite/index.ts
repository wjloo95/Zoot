import { gql } from 'apollo-boost';

export const ADD_FAVORITE = gql`
  mutation AddFavorite($input: AddFavoriteInput!) {
    addFavorite(input: $input) {
      id
    }
  }
`;
