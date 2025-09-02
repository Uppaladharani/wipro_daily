import React from 'react';

import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  const pageSizeOptions = [
    { value: '10', label: '10 per page' },
    { value: '25', label: '25 per page' },
    { value: '50', label: '50 per page' },
    { value: '100', label: '100 per page' }
  ];

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const getItemRange = () => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);
    return { start, end };
  };

  const { start, end } = getItemRange();
  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return (
      <div className="flex items-center justify-between py-4">
        <div className="text-sm text-text-secondary">
          Showing {totalItems} product{totalItems !== 1 ? 's' : ''}
        </div>
        <Select
          options={pageSizeOptions}
          value={itemsPerPage?.toString()}
          onChange={(value) => onItemsPerPageChange(parseInt(value))}
          className="w-32"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      {/* Items Info */}
      <div className="text-sm text-text-secondary">
        Showing {start} to {end} of {totalItems} product{totalItems !== 1 ? 's' : ''}
      </div>
      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          iconName="ChevronLeft"
          iconSize={16}
          className="hidden sm:flex"
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          iconName="ChevronLeft"
          iconSize={16}
          className="sm:hidden"
        />

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {visiblePages?.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-2 py-1 text-text-secondary">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          iconName="ChevronRight"
          iconSize={16}
          className="hidden sm:flex"
        >
          Next
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          iconName="ChevronRight"
          iconSize={16}
          className="sm:hidden"
        />
      </div>
      {/* Page Size Selector */}
      <Select
        options={pageSizeOptions}
        value={itemsPerPage?.toString()}
        onChange={(value) => onItemsPerPageChange(parseInt(value))}
        className="w-32"
      />
    </div>
  );
};

export default Pagination;