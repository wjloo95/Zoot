import React, { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './style.css';
import { searchValid, displayErrorMessage } from '../../lib/utils';
import { useHistory } from 'react-router-dom';

interface IProps {
  placeholder: string;
  type: string;
}

export const SearchBar = ({ placeholder, type }: IProps) => {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const { location } = history;

  useEffect(() => {
    if (type === 'header') {
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
    }
  }, [location, type]);

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
    <div className={`${type}-search-bar`}>
      <input
        type="text"
        className={`${type}-search-input`}
        placeholder={placeholder}
        value={searchValue}
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
      <div className={`${type}-search-button`} onClick={handleSearch}>
        <SearchOutlined className={`${type}-search-icon`} />
      </div>
    </div>
  );
};
