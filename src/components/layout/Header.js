import React from 'react';
import SearchBox from '../SearchBox';

const Header = () => {
  return (
    <div id="header" className="header">
      <div className="header-inner">
        <h1 className="large">
          <i className="fas fa-globe-europe text-primary" /> Country
          <span className="text-primary"> Facts</span>
        </h1>
        <SearchBox />
      </div>
    </div>
  );
};

export default Header;
