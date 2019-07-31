import React, { Fragment } from 'react';
import './App.css';
import Countries from './components/Countries';
import { Provider } from './context';
import Header from './components/layout/Header';

function App() {
  return (
    <Provider>
      <Fragment>
        <Header />
        <Countries />
      </Fragment>
    </Provider>
  );
}

export default App;
