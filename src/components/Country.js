import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const Country = ({ country, setLoading }) => {
  const [countryDetails, toggleDetails] = useState(false);

  const { name, altSpellings, region, capital, area, population } = country;

  let flagCode = '';
  let flagUri = '';

  if (altSpellings[0]) {
    flagCode = altSpellings[0].toLowerCase();
    flagUri = 'https://www.countryflags.io/' + flagCode + '/shiny/64.png';
  } else {
    flagUri = '#';
  }

  const handleClick = () => toggleDetails(!countryDetails);

  return (
    <Fragment>
      <div className="countries">
        <div className="countries-title-fr">
          <h2>{name}</h2>
        </div>
        <div className="countries-title-fr">
          <img src={flagUri} alt="" />
        </div>
        <div className="countries-title-fr">
          <button className="btn btn-trans" onClick={handleClick}>
            Facts
          </button>
        </div>
      </div>

      {countryDetails && (
        <table>
          <tbody>
            <tr>
              <th>Region</th>
              <td>{region}</td>
            </tr>
            <tr>
              <th>Capital</th>
              <td>{capital}</td>
            </tr>
            <tr>
              <th>Area</th>
              <td>
                {area} km<span>&#178;</span>
              </td>
            </tr>
            <tr>
              <th>Population</th>
              <td>{population}</td>
            </tr>
          </tbody>
        </table>
      )}
    </Fragment>
  );
};

Country.propTypes = {
  country: PropTypes.object.isRequired
};

export default Country;
