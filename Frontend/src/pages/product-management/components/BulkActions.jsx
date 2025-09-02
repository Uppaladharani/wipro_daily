import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const BulkActions = ({ 
  selectedProducts, 
  onBulkDelete, 
  onBulkEdit, 
  onBulkExport,
  onClearSelection,
  userRole 
}) => {
  const [bulkAction, setBulkAction] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const canEdit = userRole === 'admin' || userRole === 'manager';
  const canDelete = userRole === 'admin' || userRole === 'manager';

  const bulkActionOptions = [
    { value: '', label: 'Select bulk action...' },
    ...(canEdit ? [
      { value: 'edit-category', label: 'Change Category' },
      { value: 'edit-supplier', label: 'Change Supplier' },
      { value: 'edit-location', label: 'Change Location' },
      { value: 'adjust-stock', label: 'Adjust Stock Levels' }
    ] : []),
    { value: 'export', label: 'Export Selected' },
    ...(canDelete ? [
      { value: 'delete', label: 'Delete Selected' }
    ] : [])
  ];

  const handleBulkAction = async () => {
    if (!bulkAction || selectedProducts?.length === 0) return;

    setIsLoading(true);
    try {
      switch (bulkAction) {
        case 'delete':
          await onBulkDelete(selectedProducts);
          break;
        case 'edit-category': case'edit-supplier': case'edit-location': case'adjust-stock':
          await onBulkEdit(selectedProducts, bulkAction);
          break;
        case 'export':
          await onBulkExport(selectedProducts);
          break;
        default:
          break;
      }
      setBulkAction('');
    } catch (error) {
      console.error('Bulk action error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionIcon = () => {
    switch (bulkAction) {
      case 'delete': return 'Trash2';
      case 'export': return 'Download';
      case 'edit-category': case'edit-supplier': case'edit-location': case'adjust-stock': return 'Edit';
      default: return 'Play';
    }
  };

  const getActionVariant = () => {
    switch (bulkAction) {
      case 'delete': return 'destructive';
      case 'export': return 'outline';
      default: return 'default';
    }
  };

  if (selectedProducts?.length === 0) {
    return null;
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Selection Info */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">
              {selectedProducts?.length} product{selectedProducts?.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            iconName="X"
            iconSize={16}
            className="text-text-secondary hover:text-text-primary"
          >
            Clear
          </Button>
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Select
            options={bulkActionOptions}
            value={bulkAction}
            onChange={setBulkAction}
            placeholder="Select action..."
            className="w-full sm:w-48"
          />
          
          <Button
            variant={getActionVariant()}
            size="sm"
            onClick={handleBulkAction}
            loading={isLoading}
            disabled={!bulkAction}
            iconName={getActionIcon()}
            iconPosition="left"
            className="whitespace-nowrap"
          >
            Apply
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-primary/20">
        <span className="text-xs text-text-secondary">Quick actions:</span>
        
        <Button
          variant="ghost"
          size="xs"
          onClick={() => onBulkExport(selectedProducts)}
          iconName="Download"
          iconSize={14}
          className="text-xs"
        >
          Export
        </Button>
        
        {canEdit && (
          <>
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onBulkEdit(selectedProducts, 'edit-category')}
              iconName="Tag"
              iconSize={14}
              className="text-xs"
            >
              Change Category
            </Button>
            
            <Button
              variant="ghost"
              size="xs"
              onClick={() => onBulkEdit(selectedProducts, 'adjust-stock')}
              iconName="Package"
              iconSize={14}
              className="text-xs"
            >
              Adjust Stock
            </Button>
          </>
        )}
        
        {canDelete && (
          <Button
            variant="ghost"
            size="xs"
            onClick={() => onBulkDelete(selectedProducts)}
            iconName="Trash2"
            iconSize={14}
            className="text-xs text-error hover:text-error"
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default BulkActions;