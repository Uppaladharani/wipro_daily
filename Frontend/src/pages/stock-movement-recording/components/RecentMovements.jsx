import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const RecentMovements = ({ userRole = 'staff' }) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    product: '',
    movementType: '',
    status: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock recent movements data
  const movements = [
    {
      id: 'MOV-001',
      timestamp: '2025-08-29T10:30:00Z',
      product: 'Laptop - Dell XPS 13',
      sku: 'DELL-XPS-13-001',
      type: 'out',
      quantity: 5,
      reason: 'Sale/Order Fulfillment',
      destination: 'Store #001 - Downtown',
      user: 'John Smith',
      status: 'completed',
      batchNumber: 'BATCH-2025-001',
      notes: 'Bulk order for corporate client'
    },
    {
      id: 'MOV-002',
      timestamp: '2025-08-29T09:15:00Z',
      product: 'Office Chair - Ergonomic',
      sku: 'CHAIR-ERG-002',
      type: 'in',
      quantity: 25,
      reason: 'New Purchase',
      supplier: 'Furniture World Co.',
      user: 'Sarah Johnson',
      status: 'completed',
      batchNumber: 'BATCH-2025-002',
      unitCost: 299.99
    },
    {
      id: 'MOV-003',
      timestamp: '2025-08-29T08:45:00Z',
      product: 'Wireless Mouse - Logitech',
      sku: 'MOUSE-LOG-003',
      type: 'out',
      quantity: 150,
      reason: 'Transfer Out',
      destination: 'Warehouse B - Secondary',
      user: 'Mike Davis',
      status: 'pending',
      requiresApproval: true,
      notes: 'Large quantity transfer - awaiting manager approval'
    },
    {
      id: 'MOV-004',
      timestamp: '2025-08-28T16:20:00Z',
      product: 'Printer Paper - A4 500 Sheets',
      sku: 'PAPER-A4-004',
      type: 'in',
      quantity: 200,
      reason: 'Stock Adjustment',
      supplier: 'Office Depot Inc.',
      user: 'Lisa Chen',
      status: 'completed',
      batchNumber: 'BATCH-2025-003'
    },
    {
      id: 'MOV-005',
      timestamp: '2025-08-28T14:10:00Z',
      product: 'Monitor - 24" LED',
      sku: 'MON-LED-24-005',
      type: 'out',
      quantity: 3,
      reason: 'Damaged/Defective',
      destination: 'Returns Processing',
      user: 'Tom Wilson',
      status: 'completed',
      notes: 'Customer return - screen flickering issue'
    },
    {
      id: 'MOV-006',
      timestamp: '2025-08-28T11:30:00Z',
      product: 'Laptop - Dell XPS 13',
      sku: 'DELL-XPS-13-001',
      type: 'in',
      quantity: 50,
      reason: 'New Purchase',
      supplier: 'TechCorp Solutions',
      user: 'Sarah Johnson',
      status: 'completed',
      batchNumber: 'BATCH-2025-004',
      unitCost: 1299.99
    }
  ];

  const productOptions = [
    { value: '', label: 'All Products' },
    { value: 'DELL-XPS-13-001', label: 'Laptop - Dell XPS 13' },
    { value: 'CHAIR-ERG-002', label: 'Office Chair - Ergonomic' },
    { value: 'MOUSE-LOG-003', label: 'Wireless Mouse - Logitech' },
    { value: 'PAPER-A4-004', label: 'Printer Paper - A4 500 Sheets' },
    { value: 'MON-LED-24-005', label: 'Monitor - 24" LED' }
  ];

  const movementTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'in', label: 'Stock In' },
    { value: 'out', label: 'Stock Out' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending Approval' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      product: '',
      movementType: '',
      status: ''
    });
    setCurrentPage(1);
  };

  const filteredMovements = movements?.filter(movement => {
    if (filters?.product && movement?.sku !== filters?.product) return false;
    if (filters?.movementType && movement?.type !== filters?.movementType) return false;
    if (filters?.status && movement?.status !== filters?.status) return false;
    
    if (filters?.dateFrom) {
      const movementDate = new Date(movement.timestamp);
      const filterDate = new Date(filters.dateFrom);
      if (movementDate < filterDate) return false;
    }
    
    if (filters?.dateTo) {
      const movementDate = new Date(movement.timestamp);
      const filterDate = new Date(filters.dateTo);
      filterDate?.setHours(23, 59, 59, 999); // End of day
      if (movementDate > filterDate) return false;
    }
    
    return true;
  });

  const totalPages = Math.ceil(filteredMovements?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMovements = filteredMovements?.slice(startIndex, startIndex + itemsPerPage);

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      time: date?.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const getStatusBadge = (status, requiresApproval = false) => {
    if (status === 'completed') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
          <Icon name="CheckCircle" size={12} className="mr-1" />
          Completed
        </span>
      );
    } else if (status === 'pending') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning/10 text-warning">
          <Icon name="Clock" size={12} className="mr-1" />
          {requiresApproval ? 'Pending Approval' : 'Pending'}
        </span>
      );
    } else if (status === 'cancelled') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-error/10 text-error">
          <Icon name="XCircle" size={12} className="mr-1" />
          Cancelled
        </span>
      );
    }
  };

  const getMovementTypeBadge = (type) => {
    return type === 'in' ? (
      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-accent/10 text-accent">
        <Icon name="Plus" size={12} className="mr-1" />
        Stock In
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-destructive/10 text-destructive">
        <Icon name="Minus" size={12} className="mr-1" />
        Stock Out
      </span>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            Recent Stock Movements
          </h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Clear Filters
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            label="From Date"
            type="date"
            value={filters?.dateFrom}
            onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
          />
          
          <Input
            label="To Date"
            type="date"
            value={filters?.dateTo}
            onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
          />
          
          <Select
            label="Product"
            options={productOptions}
            value={filters?.product}
            onChange={(value) => handleFilterChange('product', value)}
            searchable
          />
          
          <Select
            label="Movement Type"
            options={movementTypeOptions}
            value={filters?.movementType}
            onChange={(value) => handleFilterChange('movementType', value)}
          />
          
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
        </div>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Movement ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Reason
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {paginatedMovements?.map((movement) => {
              const dateTime = formatDateTime(movement?.timestamp);
              return (
                <tr key={movement?.id} className="hover:bg-muted/50 transition-micro">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text-primary">
                      {movement?.id}
                    </div>
                    {movement?.batchNumber && (
                      <div className="text-xs text-text-secondary">
                        Batch: {movement?.batchNumber}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">{dateTime?.date}</div>
                    <div className="text-xs text-text-secondary">{dateTime?.time}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-text-primary">
                      {movement?.product}
                    </div>
                    <div className="text-xs text-text-secondary">
                      SKU: {movement?.sku}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getMovementTypeBadge(movement?.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-text-primary">
                      {movement?.quantity?.toLocaleString()} units
                    </div>
                    {movement?.unitCost && (
                      <div className="text-xs text-text-secondary">
                        @ ${movement?.unitCost}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-text-primary">{movement?.reason}</div>
                    <div className="text-xs text-text-secondary">
                      {movement?.supplier && `From: ${movement?.supplier}`}
                      {movement?.destination && `To: ${movement?.destination}`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-text-primary">{movement?.user}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(movement?.status, movement?.requiresApproval)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        iconSize={14}
                        className="text-text-secondary hover:text-text-primary"
                      />
                      {movement?.status === 'pending' && userRole === 'manager' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Check"
                          iconSize={14}
                          className="text-success hover:text-success/80"
                        />
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredMovements?.length)} of {filteredMovements?.length} movements
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                iconName="ChevronLeft"
                iconSize={16}
              />
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                iconName="ChevronRight"
                iconSize={16}
              />
            </div>
          </div>
        </div>
      )}
      {/* Empty State */}
      {filteredMovements?.length === 0 && (
        <div className="px-6 py-12 text-center">
          <Icon name="Package" size={48} className="mx-auto text-text-secondary mb-4" />
          <h4 className="text-lg font-medium text-text-primary mb-2">
            No movements found
          </h4>
          <p className="text-text-secondary">
            {Object.values(filters)?.some(filter => filter) 
              ? 'Try adjusting your filters to see more results.' :'No stock movements have been recorded yet.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentMovements;