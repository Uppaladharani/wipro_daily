import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

import Icon from '../../../components/AppIcon';

const MovementForm = ({ 
  movementType, 
  onSubmit, 
  isLoading = false,
  userRole = 'staff'
}) => {
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    reason: '',
    supplier: '',
    destination: '',
    notes: '',
    requiresApproval: false,
    batchNumber: '',
    expiryDate: '',
    unitCost: ''
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [errors, setErrors] = useState({});

  // Mock product data
  const products = [
    {
      value: 'prod-001',
      label: 'Laptop - Dell XPS 13',
      currentStock: 45,
      unitPrice: 1299.99,
      category: 'Electronics',
      sku: 'DELL-XPS-13-001'
    },
    {
      value: 'prod-002',
      label: 'Office Chair - Ergonomic',
      currentStock: 12,
      unitPrice: 299.99,
      category: 'Furniture',
      sku: 'CHAIR-ERG-002'
    },
    {
      value: 'prod-003',
      label: 'Wireless Mouse - Logitech',
      currentStock: 8,
      unitPrice: 49.99,
      category: 'Electronics',
      sku: 'MOUSE-LOG-003'
    },
    {
      value: 'prod-004',
      label: 'Printer Paper - A4 500 Sheets',
      currentStock: 156,
      unitPrice: 12.99,
      category: 'Office Supplies',
      sku: 'PAPER-A4-004'
    },
    {
      value: 'prod-005',
      label: 'Monitor - 24" LED',
      currentStock: 23,
      unitPrice: 189.99,
      category: 'Electronics',
      sku: 'MON-LED-24-005'
    }
  ];

  const reasonOptions = movementType === 'in' ? [
    { value: 'purchase', label: 'New Purchase' },
    { value: 'return', label: 'Customer Return' },
    { value: 'transfer-in', label: 'Transfer In' },
    { value: 'adjustment', label: 'Stock Adjustment' },
    { value: 'production', label: 'Production Output' }
  ] : [
    { value: 'sale', label: 'Sale/Order Fulfillment' },
    { value: 'damage', label: 'Damaged/Defective' },
    { value: 'transfer-out', label: 'Transfer Out' },
    { value: 'adjustment', label: 'Stock Adjustment' },
    { value: 'expired', label: 'Expired Items' }
  ];

  const supplierOptions = [
    { value: 'sup-001', label: 'TechCorp Solutions' },
    { value: 'sup-002', label: 'Office Depot Inc.' },
    { value: 'sup-003', label: 'Global Electronics Ltd.' },
    { value: 'sup-004', label: 'Furniture World Co.' },
    { value: 'sup-005', label: 'Direct Supplies LLC' }
  ];

  const destinationOptions = [
    { value: 'warehouse-a', label: 'Warehouse A - Main' },
    { value: 'warehouse-b', label: 'Warehouse B - Secondary' },
    { value: 'store-001', label: 'Store #001 - Downtown' },
    { value: 'store-002', label: 'Store #002 - Mall' },
    { value: 'customer', label: 'Customer Delivery' }
  ];

  useEffect(() => {
    if (formData?.productId) {
      const product = products?.find(p => p?.value === formData?.productId);
      setSelectedProduct(product);
    } else {
      setSelectedProduct(null);
    }
  }, [formData?.productId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.productId) {
      newErrors.productId = 'Please select a product';
    }

    if (!formData?.quantity || formData?.quantity <= 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }

    if (!formData?.reason) {
      newErrors.reason = 'Please select a reason';
    }

    if (movementType === 'in' && !formData?.supplier) {
      newErrors.supplier = 'Please select a supplier';
    }

    if (movementType === 'out' && !formData?.destination) {
      newErrors.destination = 'Please select a destination';
    }

    // Check for negative stock
    if (movementType === 'out' && selectedProduct) {
      const projectedStock = selectedProduct?.currentStock - parseInt(formData?.quantity || 0);
      if (projectedStock < 0) {
        newErrors.quantity = 'Insufficient stock available';
      }
    }

    // Check for large quantity movements requiring approval
    if (parseInt(formData?.quantity || 0) > 100 && userRole === 'staff') {
      setFormData(prev => ({ ...prev, requiresApproval: true }));
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      const submissionData = {
        ...formData,
        movementType,
        selectedProduct,
        projectedStock: selectedProduct ? 
          (movementType === 'in' ? 
            selectedProduct?.currentStock + parseInt(formData?.quantity) :
            selectedProduct?.currentStock - parseInt(formData?.quantity)
          ) : 0,
        timestamp: new Date()?.toISOString()
      };
      
      onSubmit(submissionData);
    }
  };

  const handleBarcodeScanner = () => {
    setShowBarcodeScanner(true);
    // Simulate barcode scan after 2 seconds
    setTimeout(() => {
      const randomProduct = products?.[Math.floor(Math.random() * products?.length)];
      setFormData(prev => ({
        ...prev,
        productId: randomProduct?.value
      }));
      setShowBarcodeScanner(false);
    }, 2000);
  };

  const getProjectedStock = () => {
    if (!selectedProduct || !formData?.quantity) return null;
    
    const quantity = parseInt(formData?.quantity);
    if (movementType === 'in') {
      return selectedProduct?.currentStock + quantity;
    } else {
      return selectedProduct?.currentStock - quantity;
    }
  };

  const projectedStock = getProjectedStock();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">
          {movementType === 'in' ? 'Stock In' : 'Stock Out'} Movement
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleBarcodeScanner}
          iconName="Scan"
          iconPosition="left"
          disabled={showBarcodeScanner}
        >
          {showBarcodeScanner ? 'Scanning...' : 'Scan Barcode'}
        </Button>
      </div>
      {showBarcodeScanner && (
        <div className="mb-6 p-4 bg-muted rounded-lg border-2 border-dashed border-primary">
          <div className="flex items-center justify-center space-x-3">
            <Icon name="Scan" size={24} className="text-primary animate-pulse" />
            <span className="text-sm font-medium text-text-primary">
              Scanning for barcode...
            </span>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <Select
              label="Select Product"
              placeholder="Search and select a product..."
              searchable
              required
              options={products}
              value={formData?.productId}
              onChange={(value) => handleInputChange('productId', value)}
              error={errors?.productId}
              description="Start typing to search products by name or SKU"
            />
          </div>
        </div>

        {/* Product Details Display */}
        {selectedProduct && (
          <div className="bg-muted rounded-lg p-4 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Current Stock
                </span>
                <p className="text-lg font-semibold text-text-primary">
                  {selectedProduct?.currentStock} units
                </p>
              </div>
              <div>
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  Unit Price
                </span>
                <p className="text-lg font-semibold text-text-primary">
                  ${selectedProduct?.unitPrice}
                </p>
              </div>
              <div>
                <span className="text-xs font-medium text-text-secondary uppercase tracking-wide">
                  SKU
                </span>
                <p className="text-lg font-semibold text-text-primary">
                  {selectedProduct?.sku}
                </p>
              </div>
            </div>
            
            {projectedStock !== null && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-secondary">
                    Projected Stock After Movement:
                  </span>
                  <span className={`text-lg font-bold ${
                    projectedStock < 0 ? 'text-error' : 
                    projectedStock < 10 ? 'text-warning' : 'text-success'
                  }`}>
                    {projectedStock} units
                  </span>
                </div>
                {projectedStock < 0 && (
                  <p className="text-sm text-error mt-1">
                    ⚠️ This movement would result in negative stock
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Movement Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Input
            label="Quantity"
            type="number"
            placeholder="Enter quantity"
            required
            min="1"
            value={formData?.quantity}
            onChange={(e) => handleInputChange('quantity', e?.target?.value)}
            error={errors?.quantity}
            description={`${movementType === 'in' ? 'Adding to' : 'Removing from'} inventory`}
          />

          <Select
            label="Reason/Category"
            placeholder="Select reason..."
            required
            options={reasonOptions}
            value={formData?.reason}
            onChange={(value) => handleInputChange('reason', value)}
            error={errors?.reason}
          />
        </div>

        {/* Supplier/Destination */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {movementType === 'in' ? (
            <Select
              label="Supplier"
              placeholder="Select supplier..."
              required
              searchable
              options={supplierOptions}
              value={formData?.supplier}
              onChange={(value) => handleInputChange('supplier', value)}
              error={errors?.supplier}
            />
          ) : (
            <Select
              label="Destination"
              placeholder="Select destination..."
              required
              searchable
              options={destinationOptions}
              value={formData?.destination}
              onChange={(value) => handleInputChange('destination', value)}
              error={errors?.destination}
            />
          )}

          <Input
            label="Batch Number"
            type="text"
            placeholder="Enter batch number (optional)"
            value={formData?.batchNumber}
            onChange={(e) => handleInputChange('batchNumber', e?.target?.value)}
            description="For tracking and quality control"
          />
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {movementType === 'in' && (
            <>
              <Input
                label="Unit Cost"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData?.unitCost}
                onChange={(e) => handleInputChange('unitCost', e?.target?.value)}
                description="Cost per unit for this batch"
              />
              
              <Input
                label="Expiry Date"
                type="date"
                value={formData?.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e?.target?.value)}
                description="For perishable items"
              />
            </>
          )}
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Notes
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            rows="3"
            placeholder="Add any additional notes or comments..."
            value={formData?.notes}
            onChange={(e) => handleInputChange('notes', e?.target?.value)}
          />
        </div>

        {/* Approval Required Notice */}
        {formData?.requiresApproval && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-warning">
                  Manager Approval Required
                </h4>
                <p className="text-sm text-text-secondary mt-1">
                  This movement requires manager approval due to large quantity ({formData?.quantity} units).
                  The movement will be pending until approved.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Photo Attachment */}
        <div className="border-2 border-dashed border-border rounded-lg p-6">
          <div className="text-center">
            <Icon name="Camera" size={32} className="mx-auto text-text-secondary mb-2" />
            <p className="text-sm text-text-secondary mb-2">
              Attach photos for documentation (optional)
            </p>
            <Button variant="outline" size="sm" type="button">
              <Icon name="Upload" size={16} className="mr-2" />
              Upload Photos
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setFormData({
                productId: '',
                quantity: '',
                reason: '',
                supplier: '',
                destination: '',
                notes: '',
                requiresApproval: false,
                batchNumber: '',
                expiryDate: '',
                unitCost: ''
              });
              setErrors({});
            }}
          >
            Clear Form
          </Button>
          
          <Button
            variant="default"
            type="submit"
            loading={isLoading}
            iconName={movementType === 'in' ? 'Plus' : 'Minus'}
            iconPosition="left"
            disabled={!formData?.productId || !formData?.quantity || !formData?.reason}
          >
            {isLoading ? 'Processing...' : `Record ${movementType === 'in' ? 'Stock In' : 'Stock Out'}`}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MovementForm;