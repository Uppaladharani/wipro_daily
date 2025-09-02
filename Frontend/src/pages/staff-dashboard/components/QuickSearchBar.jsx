import React, { useState } from 'react';

import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const QuickSearchBar = ({ onSearch, onScanBarcode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleScanClick = () => {
    if (onScanBarcode) {
      onScanBarcode();
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Product Search</h3>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search by product name, SKU, or barcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="default" iconName="Search" iconPosition="left">
            Search
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            iconName="Scan" 
            iconPosition="left"
            onClick={handleScanClick}
          >
            Scan
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuickSearchBar;