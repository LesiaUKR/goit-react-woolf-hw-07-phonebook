import React from 'react';
import { FilterField, FilterLabel } from './Filter.styled';
import { getFilter } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const onFilterChange = event =>
    dispatch(setFilter(event.currentTarget.value));

  return (
    <FilterLabel>
      Find contacts by name
      <FilterField
        type="text"
        name="filter"
        required
        value={filter}
        onChange={onFilterChange}
      />
    </FilterLabel>
  );
};
