import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickProductTable = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock product data requiring attention
  const productsData = [
    {
      id: 'PRD001',
      name: 'Wireless Bluetooth Headphones',
      category: 'Electronics',
      currentStock: 5,
      minStock: 10,
      price: 89.99,
      status: 'low_stock',
      lastUpdated: '2025-08-28',
      priority: 'high'
    },
    {
      id: 'PRD002',
      name: 'Ergonomic Office Chair',
      category: 'Furniture',
      currentStock: 15,
      minStock: 8,
      price: 299.99,
      status: 'in_stock',
      lastUpdated: '2025-08-29',
      priority: 'medium'
    },
    {
      id: 'PRD003',
      name: 'Stainless Steel Water Bottle',
      category: 'Accessories',
      currentStock: 2,
      minStock: 15,
      price: 24.99,
      status: 'critical',
      lastUpdated: '2025-08-27',
      priority: 'high'
    },
    {
      id: 'PRD004',
      name: 'LED Desk Lamp',
      category: 'Electronics',
      currentStock: 25,
      minStock: 10,
      price: 45.99,
      status: 'in_stock',
      lastUpdated: '2025-08-29',
      priority: 'low'
    },
    {
      id: 'PRD005',
      name: 'Wireless Mouse',
      category: 'Electronics',
      currentStock: 8,
      minStock: 12,
      price: 29.99,
      status: 'low_stock',
      lastUpdated: '2025-08-28',
      priority: 'medium'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      critical: { color: 'bg-error text-error-foreground', label: 'Critical' },
      low_stock: { color: 'bg-warning text-warning-foreground', label: 'Low Stock' },
      in_stock: { color: 'bg-success text-success-foreground', label: 'In Stock' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.in_stock;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getPriorityIcon = (priority) => {
    const priorityConfig = {
      high: { icon: 'AlertTriangle', color: 'text-error' },
      medium: { icon: 'AlertCircle', color: 'text-warning' },
      low: { icon: 'Info', color: 'text-text-secondary' }
    };
    
    const config = priorityConfig?.[priority] || priorityConfig?.low;
    return <Icon name={config?.icon} size={16} className={config?.color} />;
  };

  const filteredProducts = productsData?.filter(product =>
    product?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    product?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    product?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleQuickEdit = (productId) => {
    navigate(`/product-management?edit=${productId}`);
  };

  const handleViewAll = () => {
    navigate('/product-management');
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Products Requiring Attention</h2>
            <p className="text-sm text-text-secondary">Items with low stock or recent updates</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewAll}
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={16}
          >
            View All
          </Button>
        </div>
        
        <Input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="max-w-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Product</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Stock</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Status</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Price</th>
              <th className="text-left p-4 text-sm font-medium text-text-secondary">Priority</th>
              <th className="text-right p-4 text-sm font-medium text-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((product, index) => (
              <tr 
                key={product?.id}
                className={`border-b border-border hover:bg-muted/50 transition-micro ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                }`}
              >
                <td className="p-4">
                  <div>
                    <div className="font-medium text-text-primary">{product?.name}</div>
                    <div className="text-sm text-text-secondary">
                      {product?.id} • {product?.category}
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm">
                    <div className="font-medium text-text-primary">{product?.currentStock}</div>
                    <div className="text-text-secondary">Min: {product?.minStock}</div>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(product?.status)}
                </td>
                <td className="p-4">
                  <span className="font-medium text-text-primary">${product?.price}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    {getPriorityIcon(product?.priority)}
                    <span className="text-sm capitalize text-text-secondary">{product?.priority}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleQuickEdit(product?.id)}
                      iconName="Edit"
                      iconSize={16}
                      className="text-text-secondary hover:text-text-primary"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Plus"
                      iconSize={16}
                      className="text-success hover:text-success"
                    >
                      Restock
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredProducts?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">No products found</h3>
          <p className="text-text-secondary">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default QuickProductTable;