import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const MovementConfirmationModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  movementData,
  isLoading = false 
}) => {
  if (!isOpen || !movementData) return null;

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMovementIcon = () => {
    return movementData?.movementType === 'in' ? 'Plus' : 'Minus';
  };

  const getMovementColor = () => {
    return movementData?.movementType === 'in' ? 'text-accent' : 'text-destructive';
  };

  const isBatchMovement = Array.isArray(movementData?.items);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              movementData?.movementType === 'in' ? 'bg-accent/10' : 'bg-destructive/10'
            }`}>
              <Icon 
                name={getMovementIcon()} 
                size={24} 
                className={getMovementColor()} 
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                Confirm {movementData?.movementType === 'in' ? 'Stock In' : 'Stock Out'} Movement
              </h2>
              <p className="text-sm text-text-secondary">
                Please review the details before confirming
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            iconSize={20}
            disabled={isLoading}
          />
        </div>

        <div className="overflow-y-auto max-h-[60vh] p-6">
          {/* Movement Summary */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-text-primary mb-3">
              Movement Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-text-secondary">Movement Type:</span>
                <span className={`ml-2 font-medium ${getMovementColor()}`}>
                  {movementData?.movementType === 'in' ? 'Stock In' : 'Stock Out'}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Date & Time:</span>
                <span className="ml-2 font-medium text-text-primary">
                  {formatDateTime(movementData?.timestamp)}
                </span>
              </div>
              <div>
                <span className="text-text-secondary">Reason:</span>
                <span className="ml-2 font-medium text-text-primary">
                  {isBatchMovement ? movementData?.commonData?.reason : movementData?.reason}
                </span>
              </div>
              {isBatchMovement ? (
                <>
                  {movementData?.movementType === 'in' && movementData?.commonData?.supplier && (
                    <div>
                      <span className="text-text-secondary">Supplier:</span>
                      <span className="ml-2 font-medium text-text-primary">
                        {movementData?.commonData?.supplier}
                      </span>
                    </div>
                  )}
                  {movementData?.movementType === 'out' && movementData?.commonData?.destination && (
                    <div>
                      <span className="text-text-secondary">Destination:</span>
                      <span className="ml-2 font-medium text-text-primary">
                        {movementData?.commonData?.destination}
                      </span>
                    </div>
                  )}
                  {movementData?.commonData?.batchNumber && (
                    <div>
                      <span className="text-text-secondary">Batch Number:</span>
                      <span className="ml-2 font-medium text-text-primary">
                        {movementData?.commonData?.batchNumber}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {movementData?.movementType === 'in' && movementData?.supplier && (
                    <div>
                      <span className="text-text-secondary">Supplier:</span>
                      <span className="ml-2 font-medium text-text-primary">
                        {movementData?.supplier}
                      </span>
                    </div>
                  )}
                  {movementData?.movementType === 'out' && movementData?.destination && (
                    <div>
                      <span className="text-text-secondary">Destination:</span>
                      <span className="ml-2 font-medium text-text-primary">
                        {movementData?.destination}
                      </span>
                    </div>
                  )}
                  {movementData?.batchNumber && (
                    <div>
                      <span className="text-text-secondary">Batch Number:</span>
                      <span className="ml-2 font-medium text-text-primary">
                        {movementData?.batchNumber}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-text-primary">
              {isBatchMovement ? `Products (${movementData?.items?.length})` : 'Product Details'}
            </h3>

            {isBatchMovement ? (
              <div className="space-y-3">
                {movementData?.items?.map((item, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium text-text-primary">
                          {item?.product?.label}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          SKU: {item?.product?.sku}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getMovementColor()}`}>
                          {movementData?.movementType === 'in' ? '+' : '-'}{item?.quantity} units
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-text-secondary">Current Stock:</span>
                        <span className="ml-2 font-medium text-text-primary">
                          {item?.product?.currentStock} units
                        </span>
                      </div>
                      <div>
                        <span className="text-text-secondary">After Movement:</span>
                        <span className={`ml-2 font-medium ${
                          movementData?.movementType === 'out' && 
                          (item?.product?.currentStock - item?.quantity) < 0
                            ? 'text-error' : 'text-text-primary'
                        }`}>
                          {movementData?.movementType === 'in' 
                            ? item?.product?.currentStock + item?.quantity
                            : item?.product?.currentStock - item?.quantity
                          } units
                        </span>
                      </div>
                      <div>
                        <span className="text-text-secondary">Unit Price:</span>
                        <span className="ml-2 font-medium text-text-primary">
                          ${item?.product?.unitPrice}
                        </span>
                      </div>
                    </div>

                    {item?.notes && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <span className="text-text-secondary text-sm">Notes:</span>
                        <p className="text-sm text-text-primary mt-1">{item?.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-text-primary">
                      {movementData?.selectedProduct?.label}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      SKU: {movementData?.selectedProduct?.sku}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${getMovementColor()}`}>
                      {movementData?.movementType === 'in' ? '+' : '-'}{movementData?.quantity} units
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-text-secondary">Current Stock:</span>
                    <span className="ml-2 font-medium text-text-primary">
                      {movementData?.selectedProduct?.currentStock} units
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">After Movement:</span>
                    <span className={`ml-2 font-medium ${
                      movementData?.projectedStock < 0 ? 'text-error' : 'text-text-primary'
                    }`}>
                      {movementData?.projectedStock} units
                    </span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Unit Price:</span>
                    <span className="ml-2 font-medium text-text-primary">
                      ${movementData?.selectedProduct?.unitPrice}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          {((isBatchMovement && movementData?.commonData?.notes) || 
            (!isBatchMovement && movementData?.notes)) && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-text-primary mb-2">Notes</h3>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-sm text-text-primary">
                  {isBatchMovement ? movementData?.commonData?.notes : movementData?.notes}
                </p>
              </div>
            </div>
          )}

          {/* Approval Required Warning */}
          {movementData?.requiresApproval && (
            <div className="mt-6 bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-warning">
                    Manager Approval Required
                  </h4>
                  <p className="text-sm text-text-secondary mt-1">
                    This movement will be pending until approved by a manager due to large quantity.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-border bg-muted/30">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={onConfirm}
            loading={isLoading}
            iconName="Check"
            iconPosition="left"
          >
            {isLoading ? 'Processing...' : 'Confirm Movement'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MovementConfirmationModal;