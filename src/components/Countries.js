import React, { Fragment, useContext, useState, useEffect } from 'react';
import { Context } from '../context';
import Country from './Country';
import Pagination from './layout/Pagination';
import Spinner from './layout/Spinner';

const Countries = () => {
  const { countries, errorMessage } = useContext(Context);

  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(4);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Get current countries
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const mapCountries = currentCountries.map(country => (
    <Country key={country.name} country={country} setLoading={setLoading} />
  ));

  const mapAllCountries = countries.map(country => (
    <Country key={country.name} country={country} setLoading={setLoading} />
  ));

  return (
    <section id="info" className="p-3">
      {loading && <Spinner />}

      {window.innerWidth <= 420 ? (
        <div className="container countries-list">
          <h2 className="lead text-light text-center">{errorMessage}</h2>
          {mapAllCountries}
        </div>
      ) : (
        <Fragment>
          <div className="container countries-list">
            <h2 className="lead text-light text-center">{errorMessage}</h2>
            {mapCountries}
          </div>
          <div className="container">
            <Pagination
              countriesPerPage={countriesPerPage}
              totalCountries={countries.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </Fragment>
      )}

      <div className="footer" />
    </section>
  );
};

export default Countries;
