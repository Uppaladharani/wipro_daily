import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchFilters = ({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFiltersChange,
  onClearFilters,
  productCount 
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'home-garden', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports' },
    { value: 'toys', label: 'Toys' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'health-beauty', label: 'Health & Beauty' }
  ];

  const stockStatusOptions = [
    { value: '', label: 'All Stock Status' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' }
  ];

  const priceRangeOptions = [
    { value: '', label: 'All Prices' },
    { value: '0-25', label: 'Under $25' },
    { value: '25-50', label: '$25 - $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-250', label: '$100 - $250' },
    { value: '250-500', label: '$250 - $500' },
    { value: '500+', label: 'Over $500' }
  ];

  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
    { value: 'stock-asc', label: 'Stock (Low to High)' },
    { value: 'stock-desc', label: 'Stock (High to Low)' },
    { value: 'updated-desc', label: 'Recently Updated' },
    { value: 'updated-asc', label: 'Oldest Updated' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters)?.some(value => value !== '' && value !== null);
  };

  const toggleAdvanced = () => {
    setShowAdvanced(!showAdvanced);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 space-y-4">
      {/* Main Search Row */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search products by name, SKU, or description..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-col sm:flex-row gap-2 lg:w-auto">
          <Select
            options={categoryOptions}
            value={filters?.category}
            onChange={(value) => handleFilterChange('category', value)}
            placeholder="Category"
            className="w-full sm:w-40"
          />
          <Select
            options={stockStatusOptions}
            value={filters?.stockStatus}
            onChange={(value) => handleFilterChange('stockStatus', value)}
            placeholder="Stock Status"
            className="w-full sm:w-40"
          />
        </div>

        {/* Advanced Toggle & Clear */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleAdvanced}
            iconName={showAdvanced ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            className="whitespace-nowrap"
          >
            Advanced
          </Button>
          
          {hasActiveFilters() && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconSize={16}
              className="text-text-secondary hover:text-text-primary"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-border pt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range */}
            <Select
              label="Price Range"
              options={priceRangeOptions}
              value={filters?.priceRange}
              onChange={(value) => handleFilterChange('priceRange', value)}
              placeholder="Select price range"
            />

            {/* Sort By */}
            <Select
              label="Sort By"
              options={sortOptions}
              value={filters?.sortBy}
              onChange={(value) => handleFilterChange('sortBy', value)}
              placeholder="Sort products"
            />

            {/* Stock Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Stock Range</label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters?.minStock}
                  onChange={(e) => handleFilterChange('minStock', e?.target?.value)}
                  className="w-20"
                />
                <span className="text-text-secondary">to</span>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters?.maxStock}
                  onChange={(e) => handleFilterChange('maxStock', e?.target?.value)}
                  className="w-20"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Last Updated</label>
              <div className="space-y-2">
                <Input
                  type="date"
                  value={filters?.dateFrom}
                  onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
                  placeholder="From date"
                />
                <Input
                  type="date"
                  value={filters?.dateTo}
                  onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
                  placeholder="To date"
                />
              </div>
            </div>
          </div>

          {/* Additional Options */}
          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-border">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters?.lowStockOnly}
                onChange={(e) => handleFilterChange('lowStockOnly', e?.target?.checked)}
                className="rounded border-border"
              />
              <span className="text-sm text-text-primary">Low stock only</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters?.outOfStockOnly}
                onChange={(e) => handleFilterChange('outOfStockOnly', e?.target?.checked)}
                className="rounded border-border"
              />
              <span className="text-sm text-text-primary">Out of stock only</span>
            </label>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters?.recentlyUpdated}
                onChange={(e) => handleFilterChange('recentlyUpdated', e?.target?.checked)}
                className="rounded border-border"
              />
              <span className="text-sm text-text-primary">Updated in last 7 days</span>
            </label>
          </div>
        </div>
      )}
      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-text-secondary border-t border-border pt-4">
        <span>
          {productCount} product{productCount !== 1 ? 's' : ''} found
          {hasActiveFilters() && ' (filtered)'}
        </span>
        
        {hasActiveFilters() && (
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} />
            <span>Filters active</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;