import React from 'react';
import { List, Typography, Layout, Spin } from 'antd';
import {
  ListingCard,
  ErrorBanner,
  PageSkeleton,
} from '../../../../lib/components';
import { useQuery } from '@apollo/react-hooks';
import { USER_FAVORITES } from '../../../../lib/graphql/queries';
import {
  UserFavorites as UserFavoritesData,
  UserFavoritesVariables,
} from '../../../../lib/graphql/queries/User/__generated__/UserFavorites';
import InfiniteScroll from 'react-infinite-scroller';
import { HomeOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';

const { Content } = Layout;
const { Paragraph } = Typography;

interface IProps {
  id: string;
  limit: number;
}

export const UserFavorites = ({ id, limit }: IProps) => {
  const { data, loading, error, fetchMore } = useQuery<
    UserFavoritesData,
    UserFavoritesVariables
  >(USER_FAVORITES, {
    variables: { id, listingsPage: 0, limit },
    fetchPolicy: 'cache-and-network',
  });

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="We've encountered an error retrieving this user's favorites. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const user = data ? data.user : null;
  const userFavorites = user ? user.favoriteListings : null;

  const total = userFavorites ? userFavorites.total : 0;
  const result = userFavorites ? userFavorites.result : [];

  const fetchMoreListings = () => {
    fetchMore({
      variables: { id, listingsPage: result.length / limit + 1, limit },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...fetchMoreResult,
          user: {
            ...fetchMoreResult.user,
            listings: {
              ...fetchMoreResult.user.favoriteListings,
              result:
                prev.user.favoriteListings &&
                fetchMoreResult.user.favoriteListings
                  ? [
                      // ...prev.user.favoriteListings.result,
                      ...result,
                      ...fetchMoreResult.user.favoriteListings.result,
                    ]
                  : [],
            },
          },
        };
      },
    });
  };

  const userFavoritesList = userFavorites ? (
    <>
      {total > 0 && (
        <Title level={2} underline>{`${total} Total Favorites`}</Title>
      )}
      <Paragraph
        className="user-listings__description"
        style={{ marginBottom: '2em' }}
      >
        This section highlights the listings this user has favorited. Find some
        inspiration!
      </Paragraph>

      <List
        grid={{
          column: 3,
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4,
        }}
        dataSource={result ? result : undefined}
        locale={{ emptyText: 'This user has no favorites!' }}
        renderItem={(userFavorite) => (
          <List.Item>
            <ListingCard listing={userFavorite} />
          </List.Item>
        )}
      />
    </>
  ) : null;

  return loading ? (
    <Content className="user">
      <PageSkeleton />
    </Content>
  ) : (
    <div className="user-listings">
      <InfiniteScroll
        hasMore={!loading && total > result.length}
        loadMore={fetchMoreListings}
        loader={
          <div key={id} style={{ display: 'flex', justifyContent: 'center' }}>
            <Spin
              indicator={<HomeOutlined spin />}
              tip="Loading more favorites..."
            />
          </div>
        }
      >
        {userFavoritesList}
      </InfiniteScroll>
    </div>
  );
};
