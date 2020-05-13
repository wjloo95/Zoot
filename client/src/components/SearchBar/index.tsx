import React, { useState, useEffect } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import './style.css';
import { searchValid, displayErrorMessage } from '../../lib/utils';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Trie } from 'prefix-trie-ts';
import { LOCATIONS } from '../../lib/graphql/queries';
import { Locations as LocationsData } from '../../lib/graphql/queries/Listings/__generated__/Locations';

interface IProps {
  placeholder: string;
  type: string;
}

export const SearchBar = ({ placeholder, type }: IProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [activeIndex, setActiveSuggestionIndex] = useState(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, toggleShowSuggestions] = useState(false);

  const { data, loading, error } = useQuery<LocationsData>(LOCATIONS);
  const suggestions = data ? data.locations.result : [];
  const trie = new Trie(suggestions);

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
  }, [location]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.target.value;
    const filteredSuggestions = currentInput.length
      ? trie.getPrefix(currentInput).map((word) => {
          const wordArr = word.split(' ');
          const titleCased = wordArr.map(
            (word) => word[0].toUpperCase() + word.substring(1)
          );
          return titleCased.join(' ');
        })
      : [];

    setActiveSuggestionIndex(0);
    setFilteredSuggestions(filteredSuggestions);
    toggleShowSuggestions(currentInput.length > 0);
    setSearchValue(currentInput);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    var key = e.keyCode || e.which;

    // Enter Key
    if (key === 13) {
      toggleShowSuggestions(false);
      onSearch(searchValue);
    }

    // Up Arrow
    if (key === 38) {
      if (activeIndex > 0) {
        setActiveSuggestionIndex((prev) => prev - 1);
      }
    }

    // Down Arrow
    if (key === 40) {
      if (activeIndex < filteredSuggestions.length - 1) {
        setActiveSuggestionIndex((prev) => prev + 1);
      }
    }

    // Tab Key
    if (key === 9) {
      if (showSuggestions) {
        e.preventDefault();
        setSearchValue(filteredSuggestions[activeIndex]);
      }
    }

    // Escape Key
    if (key === 27) {
      toggleShowSuggestions(false);
    }
  };

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

  const suggestionsComponent = filteredSuggestions.map(
    (suggestion: string, index: number) => {
      const className =
        index === activeIndex ? 'suggestion-active' : 'suggestion-inactive';

      return (
        <li
          className={className}
          key={index}
          onClick={(e) => {
            setSearchValue(e.currentTarget.innerText);
            toggleShowSuggestions(false);
          }}
        >
          {suggestion}
        </li>
      );
    }
  );

  const suggestionsListComponent =
    showSuggestions && filteredSuggestions.length && type === 'landing' ? (
      <ul className={`${type}-suggestions`}>{suggestionsComponent}</ul>
    ) : null;

  return (
    <>
      <div className={`${type}-search-bar`}>
        <input
          autoFocus
          type="text"
          className={`${type}-search-input`}
          placeholder={placeholder}
          value={searchValue}
          onChange={onChange}
          onKeyDown={onKeyDown}
        ></input>
        <div className={`${type}-search-button`} onClick={handleSearch}>
          <SearchOutlined className={`${type}-search-icon`} />
        </div>
      </div>
      {suggestionsListComponent}
    </>
  );
};
