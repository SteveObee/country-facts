import React, { Component } from 'react';
import axios from 'axios';

export const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ALL_COUNTRIES':
      return {
        ...state,
        countries: action.payload
      };
    case 'SEARCH_COUNTRIES':
      return {
        ...state,
        countries: action.payload
      };
    case 'SET_RESET_PAGINATION':
      return {
        ...state,
        resetPagination: action.payload
      };
    case 'ON_ERROR':
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    countries: [],
    foundCountries: [],
    resetPagination: true,
    errorMessage: '',
    dispatch: action => this.setState(state => reducer(state, action))
  };

  async componentDidMount() {
    const config = {
      headers: {
        'X-RapidAPI-Host': 'restcountries-v1.p.rapidapi.com',
        'X-RapidAPI-Key': 'ab7a711376msh387bf8ab9b03222p102337jsnd86ec4b9c1b6'
      }
    };

    const res = await axios.get(
      'https://restcountries-v1.p.rapidapi.com/all',
      config
    );

    this.setState({ countries: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
