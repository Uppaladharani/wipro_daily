import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const ProductModal = ({ 
  isOpen, 
  onClose, 
  product, 
  mode, // 'view', 'edit', 'add'
  userRole,
  onSave 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    minStock: '',
    image: '',
    supplier: '',
    location: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

  const canEdit = (userRole === 'admin' || userRole === 'manager') && mode !== 'view';

  const categoryOptions = [
    { value: 'electronics', label: 'Electronics' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'books', label: 'Books' },
    { value: 'home-garden', label: 'Home & Garden' },
    { value: 'sports', label: 'Sports' },
    { value: 'toys', label: 'Toys' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'health-beauty', label: 'Health & Beauty' }
  ];

  useEffect(() => {
    if (isOpen) {
      if (product && (mode === 'edit' || mode === 'view')) {
        setFormData({
          name: product?.name || '',
          sku: product?.sku || '',
          description: product?.description || '',
          category: product?.category || '',
          price: product?.price?.toString() || '',
          stock: product?.stock?.toString() || '',
          minStock: product?.minStock?.toString() || '',
          image: product?.image || '',
          supplier: product?.supplier || '',
          location: product?.location || '',
          notes: product?.notes || ''
        });
        setImagePreview(product?.image || '');
      } else if (mode === 'add') {
        setFormData({
          name: '',
          sku: '',
          description: '',
          category: '',
          price: '',
          stock: '',
          minStock: '10',
          image: '',
          supplier: '',
          location: '',
          notes: ''
        });
        setImagePreview('');
      }
      setErrors({});
    }
  }, [isOpen, product, mode]);

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

  const handleImageChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e?.target?.result;
        setImagePreview(imageUrl);
        handleInputChange('image', imageUrl);
      };
      reader?.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData?.sku?.trim()) {
      newErrors.sku = 'SKU is required';
    }

    if (!formData?.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData?.price || parseFloat(formData?.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData?.stock || parseInt(formData?.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    if (!formData?.minStock || parseInt(formData?.minStock) < 0) {
      newErrors.minStock = 'Valid minimum stock is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData?.price),
        stock: parseInt(formData?.stock),
        minStock: parseInt(formData?.minStock),
        id: product?.id || Date.now(),
        lastUpdated: new Date()?.toISOString()
      };

      await onSave(productData, mode);
      onClose();
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getModalTitle = () => {
    switch (mode) {
      case 'add': return 'Add New Product';
      case 'edit': return 'Edit Product';
      case 'view': return 'Product Details';
      default: return 'Product';
    }
  };

  const getStockStatusColor = (stock, minStock) => {
    if (stock === 0) return 'text-error bg-red-50';
    if (stock <= minStock) return 'text-warning bg-yellow-50';
    return 'text-success bg-green-50';
  };

  const getStockStatusText = (stock, minStock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= minStock) return 'Low Stock';
    return 'In Stock';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1000 p-4">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-text-primary">
            {getModalTitle()}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
            className="text-text-secondary hover:text-text-primary"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted border border-border">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt={formData?.name || 'Product image'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="Image" size={48} className="text-muted-foreground" />
                  </div>
                )}
              </div>
              
              {canEdit && (
                <div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    label="Product Image"
                    description="Upload a product image (JPG, PNG)"
                  />
                </div>
              )}

              {mode === 'view' && product && (
                <div className="space-y-3 p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Stock Status</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(parseInt(formData?.stock), parseInt(formData?.minStock))}`}>
                      {getStockStatusText(parseInt(formData?.stock), parseInt(formData?.minStock))}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Last Updated</span>
                    <span className="text-sm text-text-primary">
                      {new Date(product.lastUpdated)?.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Product Name"
                    type="text"
                    value={formData?.name}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                    error={errors?.name}
                    disabled={!canEdit}
                    required
                    placeholder="Enter product name"
                  />
                  
                  <Input
                    label="SKU"
                    type="text"
                    value={formData?.sku}
                    onChange={(e) => handleInputChange('sku', e?.target?.value)}
                    error={errors?.sku}
                    disabled={!canEdit}
                    required
                    placeholder="Enter SKU"
                    className="font-mono"
                  />
                </div>

                <Input
                  label="Description"
                  type="text"
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                  disabled={!canEdit}
                  placeholder="Enter product description"
                />

                <Select
                  label="Category"
                  options={categoryOptions}
                  value={formData?.category}
                  onChange={(value) => handleInputChange('category', value)}
                  error={errors?.category}
                  disabled={!canEdit}
                  required
                  placeholder="Select category"
                />
              </div>

              {/* Pricing & Inventory */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">
                  Pricing & Inventory
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Price ($)"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData?.price}
                    onChange={(e) => handleInputChange('price', e?.target?.value)}
                    error={errors?.price}
                    disabled={!canEdit}
                    required
                    placeholder="0.00"
                  />
                  
                  <Input
                    label="Current Stock"
                    type="number"
                    min="0"
                    value={formData?.stock}
                    onChange={(e) => handleInputChange('stock', e?.target?.value)}
                    error={errors?.stock}
                    disabled={!canEdit}
                    required
                    placeholder="0"
                  />
                  
                  <Input
                    label="Minimum Stock"
                    type="number"
                    min="0"
                    value={formData?.minStock}
                    onChange={(e) => handleInputChange('minStock', e?.target?.value)}
                    error={errors?.minStock}
                    disabled={!canEdit}
                    required
                    placeholder="10"
                    description="Alert when stock falls below this level"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-text-primary border-b border-border pb-2">
                  Additional Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Supplier"
                    type="text"
                    value={formData?.supplier}
                    onChange={(e) => handleInputChange('supplier', e?.target?.value)}
                    disabled={!canEdit}
                    placeholder="Enter supplier name"
                  />
                  
                  <Input
                    label="Storage Location"
                    type="text"
                    value={formData?.location}
                    onChange={(e) => handleInputChange('location', e?.target?.value)}
                    disabled={!canEdit}
                    placeholder="e.g., Warehouse A, Shelf 12"
                  />
                </div>

                <Input
                  label="Notes"
                  type="text"
                  value={formData?.notes}
                  onChange={(e) => handleInputChange('notes', e?.target?.value)}
                  disabled={!canEdit}
                  placeholder="Additional notes or comments"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            {mode === 'view' ? 'Close' : 'Cancel'}
          </Button>
          
          {canEdit && (
            <Button
              variant="default"
              onClick={handleSave}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              {mode === 'add' ? 'Add Product' : 'Save Changes'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;