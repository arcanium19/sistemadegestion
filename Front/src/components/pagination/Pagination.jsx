import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

const PaginationComponent = ({ page, totalPages, onPageChange }) => {
  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={onPageChange}
      renderItem={(item) => (
        <PaginationItem
          component="button"
          {...item}
          sx={{
            color: 'white',
            '&:hover': {
              backgroundColor: 'gray',
              color: 'white',
            },
            '&.Mui-selected': {
              backgroundColor: 'gray',
              color: 'white',
            },
            '&.Mui-selected:hover': {
              backgroundColor: 'darkgray',
            },
          }}
        />
      )}
    />
  );
};

export default PaginationComponent;
