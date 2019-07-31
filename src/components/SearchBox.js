import React, { useState, useContext } from 'react';
import { Context } from '../context';
import axios from 'axios';

const SearchBox = () => {
  const [searchField, setSearchField] = useState('');

  const { dispatch } = useContext(Context);

  const handleSearch = e => {
    setSearchField(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const config = {
      headers: {
        'X-RapidAPI-Host': 'restcountries-v1.p.rapidapi.com',
        'X-RapidAPI-Key': 'ab7a711376msh387bf8ab9b03222p102337jsnd86ec4b9c1b6'
      }
    };

    try {
      if (!searchField) {
        const res = await axios.get(
          'https://restcountries-v1.p.rapidapi.com/all',
          config
        );

        dispatch({ type: 'ALL_COUNTRIES', payload: res.data });
        dispatch({ type: 'SET_RESET_PAGINATION', payload: true });
        dispatch({ type: 'ON_ERROR', payload: '' });
      } else {
        const res = await axios.get(
          `https://restcountries-v1.p.rapidapi.com/name/${searchField}`,
          config
        );

        dispatch({ type: 'SEARCH_COUNTRIES', payload: res.data });
        dispatch({ type: 'SET_RESET_PAGINATION', payload: true });
        dispatch({ type: 'ON_ERROR', payload: '' });
      }
    } catch (err) {
      dispatch({ type: 'ON_ERROR', payload: 'No Countries found...' });
      dispatch({ type: 'SEARCH_COUNTRIES', payload: [] });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <i className="fas fa-search icon" />
        <input
          type="text"
          placeholder="Enter country..."
          name="name"
          value={searchField}
          onChange={handleSearch}
        />
        <a href="/">
          <i className="fas fa-undo icon" />
        </a>
      </div>

      <button type="submit" className="btn btn-blue">
        <p className="btn-blue-label">Search</p>
      </button>
    </form>
  );
};

export default SearchBox;
