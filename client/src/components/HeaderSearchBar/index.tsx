import React, { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './style.css';
import { searchValid, displayErrorMessage } from '../../lib/utils';
import { useHistory } from 'react-router-dom';

interface IProps {
  placeholder: string;
}

export const HeaderSearchBar = ({ placeholder }: IProps) => {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const { location } = history;

  useEffect(() => {
    const pathnameSubStrings = location.pathname.split('/');

    if (!location.pathname.includes('/listings')) {
      setSearchValue('');
      return;
    }

    if (
      location.pathname.includes('/listings') &&
      pathnameSubStrings.length === 3
    ) {
      setSearchValue(pathnameSubStrings[2]);
      return;
    }
  }, [location]);

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
    <div className="header-search-bar">
      <input
        type="text"
        className="header-search-input"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onKeyPress={(e) => {
          var key = e.keyCode || e.which;
          if (key == 13) {
            onSearch(searchValue);
          }
        }}
      ></input>
      <div className="header-search-button" onClick={handleSearch}>
        <SearchOutlined className="header-search-icon" />
      </div>
    </div>
  );
};
