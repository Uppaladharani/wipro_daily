import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReorderNotifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      productId: 'PRD003',
      productName: 'Stainless Steel Water Bottle',
      currentStock: 2,
      minStock: 15,
      suggestedQuantity: 25,
      priority: 'critical',
      supplier: 'EcoBottle Co.',
      estimatedCost: 374.75,
      leadTime: '3-5 days',
      lastOrderDate: '2025-07-15'
    },
    {
      id: 2,
      productId: 'PRD001',
      productName: 'Wireless Bluetooth Headphones',
      currentStock: 5,
      minStock: 10,
      suggestedQuantity: 20,
      priority: 'high',
      supplier: 'TechSound Ltd.',
      estimatedCost: 1079.80,
      leadTime: '5-7 days',
      lastOrderDate: '2025-06-20'
    },
    {
      id: 3,
      productId: 'PRD005',
      productName: 'Wireless Mouse',
      currentStock: 8,
      minStock: 12,
      suggestedQuantity: 15,
      priority: 'medium',
      supplier: 'PeripheralPro Inc.',
      estimatedCost: 224.85,
      leadTime: '2-4 days',
      lastOrderDate: '2025-08-01'
    }
  ]);

  const getPriorityConfig = (priority) => {
    const configs = {
      critical: {
        color: 'bg-error text-error-foreground',
        icon: 'AlertTriangle',
        iconColor: 'text-error'
      },
      high: {
        color: 'bg-warning text-warning-foreground',
        icon: 'AlertCircle',
        iconColor: 'text-warning'
      },
      medium: {
        color: 'bg-accent text-accent-foreground',
        icon: 'Info',
        iconColor: 'text-accent'
      }
    };
    return configs?.[priority] || configs?.medium;
  };

  const handleCreateOrder = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notif => 
        notif?.id === notificationId 
          ? { ...notif, status: 'order_created' }
          : notif
      )
    );
  };

  const handleDismiss = (notificationId) => {
    setNotifications(prev => prev?.filter(notif => notif?.id !== notificationId));
  };

  const handleSnooze = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notif => 
        notif?.id === notificationId 
          ? { ...notif, snoozed: true, snoozeUntil: new Date(Date.now() + 86400000) }
          : notif
      )
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Reorder Notifications</h2>
            <p className="text-sm text-text-secondary">
              {notifications?.length} items need restocking
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-error/10 text-error text-xs rounded-full font-medium">
              {notifications?.filter(n => n?.priority === 'critical')?.length} Critical
            </span>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications?.map((notification) => {
          const priorityConfig = getPriorityConfig(notification?.priority);
          
          return (
            <div
              key={notification?.id}
              className={`p-4 border-b border-border last:border-b-0 ${
                notification?.priority === 'critical' ? 'bg-error/5' : 
                notification?.priority === 'high' ? 'bg-warning/5' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${priorityConfig?.iconColor} bg-muted`}>
                    <Icon name={priorityConfig?.icon} size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">
                      {notification?.productName}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {notification?.productId} • {notification?.supplier}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig?.color}`}>
                  {notification?.priority?.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-text-secondary">Current Stock</span>
                  <div className="font-medium text-error">{notification?.currentStock}</div>
                </div>
                <div>
                  <span className="text-text-secondary">Min Required</span>
                  <div className="font-medium text-text-primary">{notification?.minStock}</div>
                </div>
                <div>
                  <span className="text-text-secondary">Suggested Order</span>
                  <div className="font-medium text-success">{notification?.suggestedQuantity}</div>
                </div>
                <div>
                  <span className="text-text-secondary">Est. Cost</span>
                  <div className="font-medium text-text-primary">${notification?.estimatedCost}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-text-secondary mb-4">
                <span>Lead time: {notification?.leadTime}</span>
                <span>Last order: {notification?.lastOrderDate}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleCreateOrder(notification?.id)}
                  iconName="ShoppingCart"
                  iconPosition="left"
                  iconSize={16}
                >
                  Create Order
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSnooze(notification?.id)}
                  iconName="Clock"
                  iconSize={16}
                >
                  Snooze
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDismiss(notification?.id)}
                  iconName="X"
                  iconSize={16}
                  className="text-text-secondary hover:text-error"
                >
                  Dismiss
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {notifications?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">All caught up!</h3>
          <p className="text-text-secondary">No reorder notifications at this time</p>
        </div>
      )}
    </div>
  );
};

export default ReorderNotifications;