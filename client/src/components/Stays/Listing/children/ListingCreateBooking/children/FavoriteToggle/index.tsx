import React, { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import {
  UserFavorites as UserFavoritesData,
  UserFavoritesVariables,
} from '../../../../../../../lib/graphql/queries/User/__generated__/UserFavorites';
import { USER_FAVORITES } from '../../../../../../../lib/graphql/queries';
import { Viewer } from '../../../../../../../lib/types';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import {
  AddFavorite as AddFavoriteData,
  AddFavoriteVariables,
} from '../../../../../../../lib/graphql/mutations/AddFavorite/__generated__/AddFavorite';
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
} from '../../../../../../../lib/graphql/mutations';
import {
  RemoveFavorite as RemoveFavoriteData,
  RemoveFavoriteVariables,
} from '../../../../../../../lib/graphql/mutations/RemoveFavorite/__generated__/RemoveFavorite';
import { displayErrorMessage } from '../../../../../../../lib/utils';
import { useParams, useLocation } from 'react-router-dom';
import { Spin } from 'antd';

interface IProps {
  viewer: Viewer;
}

interface IParams {
  id: string;
}

export const FavoriteToggle = ({ viewer }: IProps) => {
  const { id } = useParams<IParams>();
  const location = useLocation();
  const [isFavorited, toggleFavorited] = useState(false);
  const [getFavorites, { loading }] = useLazyQuery<
    UserFavoritesData,
    UserFavoritesVariables
  >(USER_FAVORITES, {
    onCompleted: (data) => {
      if (viewer.id) {
        if (data.user.favoriteListings) {
          for (let listing of data.user.favoriteListings.result) {
            if (listing.id === id) {
              toggleFavorited(true);
              return;
            }
          }
        }
      }
    },
  });

  const [addFavorite] = useMutation<AddFavoriteData, AddFavoriteVariables>(
    ADD_FAVORITE,
    {
      onCompleted: () => {
        toggleFavorited(true);
      },
      onError: () =>
        displayErrorMessage(
          "Sorry! We weren't able to favorite this listing. Please try again later."
        ),
    }
  );
  const [removeFavorite] = useMutation<
    RemoveFavoriteData,
    RemoveFavoriteVariables
  >(REMOVE_FAVORITE, {
    onCompleted: () => {
      toggleFavorited(false);
    },
    onError: () =>
      displayErrorMessage(
        "Sorry! We weren't able to un-favorite this listing. Please try again later."
      ),
  });

  useEffect(() => {
    if (viewer) {
      getFavorites({
        variables: {
          id: viewer.id ? viewer.id : '',
          listingsPage: 0,
          limit: 2147483647,
        },
      });
    }
  }, [location, getFavorites, viewer]);

  return loading ? (
    <Spin className="favorite-button" />
  ) : isFavorited ? (
    <HeartFilled
      style={{ color: 'var(--light-secondary-color)' }}
      onClick={() => {
        if (viewer.id) {
          removeFavorite({ variables: { input: { id, userId: viewer.id } } });
        }
      }}
      className="favorite-button"
    />
  ) : (
    <HeartOutlined
      onClick={() => {
        if (viewer.id) {
          addFavorite({ variables: { input: { id, userId: viewer.id } } });
        } else {
          displayErrorMessage('Please sign in to favorite listings!');
        }
      }}
      className="favorite-button"
    />
  );
};
