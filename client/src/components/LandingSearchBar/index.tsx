import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './style.css';
import { searchValid, displayErrorMessage } from '../../lib/utils';
import { useHistory } from 'react-router-dom';

interface IProps {
  placeholder: string;
}

export const LandingSearchBar = ({ placeholder }: IProps) => {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();

  const onSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (searchValid(value)) {
      displayErrorMessage('Please enter a valid search term!');
    } else {
      history.push(`/listings/${trimmedValue}`);
    }
  };
  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <div className="landing-search-bar">
      <input
        type="text"
        className="landing-search-input"
        placeholder={placeholder}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onKeyPress={(e) => {
          var key = e.keyCode || e.which;
          if (key === 13) {
            onSearch(searchValue);
          }
        }}
      ></input>
      <div className="landing-search-button" onClick={handleSearch}>
        <SearchOutlined className="landing-search-icon" />
      </div>
    </div>
  );
};
