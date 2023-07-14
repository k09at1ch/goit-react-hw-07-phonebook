import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchTerm } from 'redux/filter/slice';
function Filter() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.filter.searchTerm);

  const handleSearchChange = (event) => {
    dispatch(updateSearchTerm(event.target.value));
  };

  return ( 
    <input
      type="text"
      placeholder="Search"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
}

export default Filter;