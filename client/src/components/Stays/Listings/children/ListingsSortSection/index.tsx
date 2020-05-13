import React from 'react';
import { Select } from 'antd';
import { ListingsSort } from '../../../../../lib/graphql/globalTypes';

interface Props {
  sort: ListingsSort;
  setSort: (sort: ListingsSort) => void;
}

const { Option } = Select;

export const ListingsSortSection = ({ sort, setSort }: Props) => {
  return (
    <div className="listings-filters">
      <span>Sort By</span>
      <Select value={sort} onChange={(sort: ListingsSort) => setSort(sort)}>
        <Option value={ListingsSort.PRICE_LOW_TO_HIGH}>
          Price: Low to High
        </Option>
        <Option value={ListingsSort.PRICE_HIGH_TO_LOW}>
          Price: High to Low
        </Option>
        <Option value={ListingsSort.RATINGS_COUNT}># of Reviews</Option>
        <Option value={ListingsSort.RATINGS_VALUE}>Average Rating</Option>
      </Select>
    </div>
  );
};
