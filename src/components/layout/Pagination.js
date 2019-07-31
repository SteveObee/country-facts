import React, { useState, Fragment, useEffect, useContext } from 'react';
import { Context } from '../../context';

const Pagination = ({
  countriesPerPage,
  totalCountries,
  paginate,
  currentPage
}) => {
  const [currentRange, setCurrentRange] = useState(1);
  const [numbersPerRange, setNumbersPerRange] = useState(10);

  const { resetPagination, dispatch } = useContext(Context);

  useEffect(() => {
    setCurrentRange(1);
    paginate(1);
    dispatch({ type: 'SET_RESET_PAGINATION', payload: false });
    if (window.innerWidth <= 768) {
      setNumbersPerRange(5);
    }
  }, [resetPagination]);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++) {
    pageNumbers.push(i);
  }

  // Get current page numbers
  const indexOfLastNumber = currentRange * numbersPerRange;
  const indexOfFirstNumber = indexOfLastNumber - numbersPerRange;
  const rangeToMap = pageNumbers.slice(indexOfFirstNumber, indexOfLastNumber);

  const firstRange = () => {
    setCurrentRange(1);
    paginate(1);
  };

  const incRange = () => {
    setCurrentRange(currentRange + 1);
    paginate(rangeToMap[0] + numbersPerRange);
  };

  const decRange = () => {
    setCurrentRange(currentRange - 1);
    paginate(rangeToMap[0] - numbersPerRange);
  };

  return (
    <ul className="pagination">
      {currentRange > 1 && (
        <Fragment>
          <li className="page-item">
            <span onClick={firstRange} href="!#">
              <i className="fas fa-angle-left" />
            </span>
          </li>

          <li className="page-item">
            <span onClick={decRange} href="!#">
              <i className="fas fa-angle-double-left" />
            </span>
          </li>
        </Fragment>
      )}

      {rangeToMap.map(number =>
        number === currentPage ? (
          <li key={number} className="page-item-inv">
            <span onClick={() => paginate(number)}>{number}</span>
          </li>
        ) : (
          <li key={number} className="page-item">
            <span onClick={() => paginate(number)}>{number}</span>
          </li>
        )
      )}
      {currentRange < Math.ceil(pageNumbers.length / numbersPerRange) && (
        <li className="page-item">
          <span onClick={incRange}>
            <i className="fas fa-angle-double-right" />
          </span>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
