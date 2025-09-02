import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProductTable = ({ 
  products, 
  userRole, 
  onEdit, 
  onDelete, 
  onView,
  selectedProducts,
  onSelectProduct,
  onSelectAll,
  sortConfig,
  onSort
}) => {
  const [viewMode, setViewMode] = useState('table'); // table or cards

  const canEdit = userRole === 'admin' || userRole === 'manager';
  const canDelete = userRole === 'admin' || userRole === 'manager';

  const getStockStatusColor = (stock, minStock = 10) => {
    if (stock === 0) return 'text-error bg-red-50';
    if (stock <= minStock) return 'text-warning bg-yellow-50';
    return 'text-success bg-green-50';
  };

  const getStockStatusText = (stock, minStock = 10) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= minStock) return 'Low Stock';
    return 'In Stock';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleSort = (column) => {
    onSort(column);
  };

  // Desktop Table View
  const TableView = () => (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedProducts?.length === products?.length && products?.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-text-secondary">
                Product
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-micro"
                onClick={() => handleSort('sku')}
              >
                <div className="flex items-center space-x-1">
                  <span>SKU</span>
                  <Icon name={getSortIcon('sku')} size={14} />
                </div>
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-micro"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  <Icon name={getSortIcon('category')} size={14} />
                </div>
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-micro"
                onClick={() => handleSort('stock')}
              >
                <div className="flex items-center space-x-1">
                  <span>Stock</span>
                  <Icon name={getSortIcon('stock')} size={14} />
                </div>
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-micro"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center space-x-1">
                  <span>Price</span>
                  <Icon name={getSortIcon('price')} size={14} />
                </div>
              </th>
              <th 
                className="text-left px-4 py-3 text-sm font-medium text-text-secondary cursor-pointer hover:text-text-primary transition-micro"
                onClick={() => handleSort('lastUpdated')}
              >
                <div className="flex items-center space-x-1">
                  <span>Last Updated</span>
                  <Icon name={getSortIcon('lastUpdated')} size={14} />
                </div>
              </th>
              <th className="text-right px-4 py-3 text-sm font-medium text-text-secondary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products?.map((product) => (
              <tr key={product?.id} className="hover:bg-muted/50 transition-micro">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts?.includes(product?.id)}
                    onChange={() => onSelectProduct(product?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={product?.image}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-text-primary truncate">
                        {product?.name}
                      </p>
                      <p className="text-xs text-text-secondary truncate">
                        {product?.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-mono text-text-primary">
                    {product?.sku}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                    {product?.category}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-text-primary">
                      {product?.stock}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(product?.stock, product?.minStock)}`}>
                      {getStockStatusText(product?.stock, product?.minStock)}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm font-medium text-text-primary">
                    {formatPrice(product?.price)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="text-sm text-text-secondary">
                    {formatDate(product?.lastUpdated)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onView(product)}
                      iconName="Eye"
                      iconSize={16}
                      className="text-text-secondary hover:text-text-primary"
                    >
                      View
                    </Button>
                    {canEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(product)}
                        iconName="Edit"
                        iconSize={16}
                        className="text-text-secondary hover:text-primary"
                      >
                        Edit
                      </Button>
                    )}
                    {canDelete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(product)}
                        iconName="Trash2"
                        iconSize={16}
                        className="text-text-secondary hover:text-error"
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Mobile Card View
  const CardView = () => (
    <div className="grid gap-4">
      {products?.map((product) => (
        <div key={product?.id} className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={selectedProducts?.includes(product?.id)}
              onChange={() => onSelectProduct(product?.id)}
              className="mt-1 rounded border-border"
            />
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <Image
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-text-primary truncate">
                    {product?.name}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                    {product?.description}
                  </p>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(product)}
                    iconName="Eye"
                    iconSize={16}
                    className="text-text-secondary"
                  />
                  {canEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(product)}
                      iconName="Edit"
                      iconSize={16}
                      className="text-text-secondary"
                    />
                  )}
                  {canDelete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(product)}
                      iconName="Trash2"
                      iconSize={16}
                      className="text-text-secondary"
                    />
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                <div>
                  <span className="text-text-secondary">SKU:</span>
                  <span className="ml-1 font-mono text-text-primary">{product?.sku}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Category:</span>
                  <span className="ml-1 text-text-primary">{product?.category}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Stock:</span>
                  <span className="ml-1 font-medium text-text-primary">{product?.stock}</span>
                  <span className={`ml-1 px-1 py-0.5 rounded text-xs ${getStockStatusColor(product?.stock, product?.minStock)}`}>
                    {getStockStatusText(product?.stock, product?.minStock)}
                  </span>
                </div>
                <div>
                  <span className="text-text-secondary">Price:</span>
                  <span className="ml-1 font-medium text-text-primary">{formatPrice(product?.price)}</span>
                </div>
              </div>
              
              <div className="mt-2 text-xs text-text-secondary">
                Updated: {formatDate(product?.lastUpdated)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* View Toggle - Mobile Only */}
      <div className="flex items-center justify-between md:hidden">
        <span className="text-sm font-medium text-text-primary">
          {products?.length} products
        </span>
        <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('table')}
            iconName="Table"
            iconSize={16}
          />
          <Button
            variant={viewMode === 'cards' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('cards')}
            iconName="Grid3X3"
            iconSize={16}
          />
        </div>
      </div>
      {/* Desktop: Always Table, Mobile: Toggle between views */}
      <div className="hidden md:block">
        <TableView />
      </div>
      <div className="md:hidden">
        {viewMode === 'table' ? <TableView /> : <CardView />}
      </div>
      {/* Empty State */}
      {products?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No products found</h3>
          <p className="text-text-secondary mb-4">
            Try adjusting your search criteria or add a new product.
          </p>
          {canEdit && (
            <Button variant="default" iconName="Plus">
              Add Product
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductTable;