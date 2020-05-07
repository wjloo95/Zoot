import React from 'react';
import { Pagination } from 'antd';

interface IProps {
  total: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setPageLimit: (pageLimit: number) => void;
}

export const ListingsPagination = ({
  total,
  page,
  limit,
  setPage,
  setPageLimit,
}: IProps) => {
  return (
    <Pagination
      current={page}
      total={total}
      defaultPageSize={limit}
      pageSizeOptions={['5', '10', '15', '20']}
      hideOnSinglePage
      showLessItems
      onChange={(page: number) => {
        setPage(page);
      }}
      onShowSizeChange={(_current, size: number) => {
        setPageLimit(size);
      }}
      className="listings-pagination"
    />
  );
};
