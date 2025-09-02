import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const BatchMovementModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  movementType = 'in',
  isLoading = false 
}) => {
  const [batchItems, setBatchItems] = useState([
    { id: 1, productId: '', quantity: '', notes: '' }
  ]);
  const [commonData, setCommonData] = useState({
    reason: '',
    supplier: '',
    destination: '',
    batchNumber: '',
    notes: ''
  });

  // Mock product data
  const products = [
    {
      value: 'prod-001',
      label: 'Laptop - Dell XPS 13',
      currentStock: 45,
      unitPrice: 1299.99,
      sku: 'DELL-XPS-13-001'
    },
    {
      value: 'prod-002',
      label: 'Office Chair - Ergonomic',
      currentStock: 12,
      unitPrice: 299.99,
      sku: 'CHAIR-ERG-002'
    },
    {
      value: 'prod-003',
      label: 'Wireless Mouse - Logitech',
      currentStock: 8,
      unitPrice: 49.99,
      sku: 'MOUSE-LOG-003'
    },
    {
      value: 'prod-004',
      label: 'Printer Paper - A4 500 Sheets',
      currentStock: 156,
      unitPrice: 12.99,
      sku: 'PAPER-A4-004'
    },
    {
      value: 'prod-005',
      label: 'Monitor - 24" LED',
      currentStock: 23,
      unitPrice: 189.99,
      sku: 'MON-LED-24-005'
    }
  ];

  const reasonOptions = movementType === 'in' ? [
    { value: 'purchase', label: 'New Purchase' },
    { value: 'return', label: 'Customer Return' },
    { value: 'transfer-in', label: 'Transfer In' },
    { value: 'adjustment', label: 'Stock Adjustment' }
  ] : [
    { value: 'sale', label: 'Sale/Order Fulfillment' },
    { value: 'damage', label: 'Damaged/Defective' },
    { value: 'transfer-out', label: 'Transfer Out' },
    { value: 'adjustment', label: 'Stock Adjustment' }
  ];

  const supplierOptions = [
    { value: 'sup-001', label: 'TechCorp Solutions' },
    { value: 'sup-002', label: 'Office Depot Inc.' },
    { value: 'sup-003', label: 'Global Electronics Ltd.' }
  ];

  const destinationOptions = [
    { value: 'warehouse-a', label: 'Warehouse A - Main' },
    { value: 'warehouse-b', label: 'Warehouse B - Secondary' },
    { value: 'store-001', label: 'Store #001 - Downtown' }
  ];

  const addBatchItem = () => {
    const newId = Math.max(...batchItems?.map(item => item?.id)) + 1;
    setBatchItems(prev => [...prev, { 
      id: newId, 
      productId: '', 
      quantity: '', 
      notes: '' 
    }]);
  };

  const removeBatchItem = (id) => {
    if (batchItems?.length > 1) {
      setBatchItems(prev => prev?.filter(item => item?.id !== id));
    }
  };

  const updateBatchItem = (id, field, value) => {
    setBatchItems(prev => prev?.map(item => 
      item?.id === id ? { ...item, [field]: value } : item
    ));
  };

  const updateCommonData = (field, value) => {
    setCommonData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const validItems = batchItems?.filter(item => 
      item?.productId && item?.quantity && parseInt(item?.quantity) > 0
    );

    if (validItems?.length === 0) {
      alert('Please add at least one valid item');
      return;
    }

    if (!commonData?.reason) {
      alert('Please select a reason');
      return;
    }

    const submissionData = {
      movementType,
      commonData,
      items: validItems?.map(item => ({
        ...item,
        product: products?.find(p => p?.value === item?.productId),
        quantity: parseInt(item?.quantity)
      })),
      timestamp: new Date()?.toISOString()
    };

    onSubmit(submissionData);
  };

  const getTotalItems = () => {
    return batchItems?.reduce((total, item) => {
      const quantity = parseInt(item?.quantity) || 0;
      return total + quantity;
    }, 0);
  };

  const getSelectedProduct = (productId) => {
    return products?.find(p => p?.value === productId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">
              Batch {movementType === 'in' ? 'Stock In' : 'Stock Out'} Movement
            </h2>
            <p className="text-sm text-text-secondary mt-1">
              Record multiple products in a single movement
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Common Information */}
            <div className="bg-muted rounded-lg p-4">
              <h3 className="text-lg font-medium text-text-primary mb-4">
                Common Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Reason/Category"
                  placeholder="Select reason..."
                  required
                  options={reasonOptions}
                  value={commonData?.reason}
                  onChange={(value) => updateCommonData('reason', value)}
                />

                {movementType === 'in' ? (
                  <Select
                    label="Supplier"
                    placeholder="Select supplier..."
                    searchable
                    options={supplierOptions}
                    value={commonData?.supplier}
                    onChange={(value) => updateCommonData('supplier', value)}
                  />
                ) : (
                  <Select
                    label="Destination"
                    placeholder="Select destination..."
                    searchable
                    options={destinationOptions}
                    value={commonData?.destination}
                    onChange={(value) => updateCommonData('destination', value)}
                  />
                )}

                <Input
                  label="Batch Number"
                  type="text"
                  placeholder="Enter batch number"
                  value={commonData?.batchNumber}
                  onChange={(e) => updateCommonData('batchNumber', e?.target?.value)}
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Common Notes
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    rows="2"
                    placeholder="Notes that apply to all items..."
                    value={commonData?.notes}
                    onChange={(e) => updateCommonData('notes', e?.target?.value)}
                  />
                </div>
              </div>
            </div>

            {/* Batch Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-text-primary">
                  Items ({batchItems?.length})
                </h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addBatchItem}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Add Item
                </Button>
              </div>

              <div className="space-y-4">
                {batchItems?.map((item, index) => {
                  const selectedProduct = getSelectedProduct(item?.productId);
                  return (
                    <div key={item?.id} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-text-secondary">
                          Item #{index + 1}
                        </span>
                        {batchItems?.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBatchItem(item?.id)}
                            iconName="Trash2"
                            iconSize={16}
                            className="text-error hover:text-error/80"
                          />
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <Select
                            label="Product"
                            placeholder="Select product..."
                            searchable
                            required
                            options={products}
                            value={item?.productId}
                            onChange={(value) => updateBatchItem(item?.id, 'productId', value)}
                          />
                        </div>

                        <Input
                          label="Quantity"
                          type="number"
                          placeholder="0"
                          min="1"
                          required
                          value={item?.quantity}
                          onChange={(e) => updateBatchItem(item?.id, 'quantity', e?.target?.value)}
                        />
                      </div>
                      {selectedProduct && (
                        <div className="mt-4 p-3 bg-muted rounded-md">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-text-secondary">Current Stock:</span>
                              <span className="ml-2 font-medium text-text-primary">
                                {selectedProduct?.currentStock} units
                              </span>
                            </div>
                            <div>
                              <span className="text-text-secondary">Unit Price:</span>
                              <span className="ml-2 font-medium text-text-primary">
                                ${selectedProduct?.unitPrice}
                              </span>
                            </div>
                            <div>
                              <span className="text-text-secondary">SKU:</span>
                              <span className="ml-2 font-medium text-text-primary">
                                {selectedProduct?.sku}
                              </span>
                            </div>
                          </div>
                          
                          {item?.quantity && (
                            <div className="mt-2 pt-2 border-t border-border">
                              <span className="text-text-secondary">Projected Stock:</span>
                              <span className={`ml-2 font-medium ${
                                movementType === 'out' && 
                                (selectedProduct?.currentStock - parseInt(item?.quantity)) < 0
                                  ? 'text-error' : 'text-text-primary'
                              }`}>
                                {movementType === 'in' 
                                  ? selectedProduct?.currentStock + parseInt(item?.quantity || 0)
                                  : selectedProduct?.currentStock - parseInt(item?.quantity || 0)
                                } units
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Item Notes
                        </label>
                        <textarea
                          className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                          rows="2"
                          placeholder="Notes specific to this item..."
                          value={item?.notes}
                          onChange={(e) => updateBatchItem(item?.id, 'notes', e?.target?.value)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary */}
            {getTotalItems() > 0 && (
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-primary">
                    Total Items in Batch:
                  </span>
                  <span className="text-lg font-bold text-primary">
                    {getTotalItems()} units
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-4 p-6 border-t border-border bg-muted/30">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              loading={isLoading}
              iconName={movementType === 'in' ? 'Plus' : 'Minus'}
              iconPosition="left"
              disabled={getTotalItems() === 0 || !commonData?.reason}
            >
              {isLoading ? 'Processing...' : `Record Batch ${movementType === 'in' ? 'In' : 'Out'}`}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BatchMovementModal;