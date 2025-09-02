import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = () => {
  const recentActivities = [
    {
      id: 1,
      type: "stock_in",
      productName: "Wireless Bluetooth Headphones",
      sku: "WBH-001",
      quantity: 25,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      user: "John Smith"
    },
    {
      id: 2,
      type: "stock_out",
      productName: "Gaming Mechanical Keyboard",
      sku: "GMK-205",
      quantity: 8,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      user: "John Smith"
    },
    {
      id: 3,
      type: "quantity_update",
      productName: "USB-C Charging Cable",
      sku: "UCC-150",
      quantity: 50,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      user: "John Smith"
    },
    {
      id: 4,
      type: "stock_in",
      productName: "Wireless Mouse Pad",
      sku: "WMP-300",
      quantity: 15,
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      user: "John Smith"
    },
    {
      id: 5,
      type: "stock_out",
      productName: "Portable Phone Stand",
      sku: "PPS-120",
      quantity: 12,
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      user: "John Smith"
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'stock_in':
        return { name: 'ArrowDown', color: 'text-success' };
      case 'stock_out':
        return { name: 'ArrowUp', color: 'text-warning' };
      case 'quantity_update':
        return { name: 'Edit', color: 'text-primary' };
      default:
        return { name: 'Activity', color: 'text-text-secondary' };
    }
  };

  const getActivityLabel = (type) => {
    switch (type) {
      case 'stock_in':
        return 'Stock In';
      case 'stock_out':
        return 'Stock Out';
      case 'quantity_update':
        return 'Quantity Update';
      default:
        return 'Activity';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else {
      return `${hours}h ago`;
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <Icon name="Clock" size={20} className="text-text-secondary" />
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {recentActivities?.map((activity) => {
          const iconConfig = getActivityIcon(activity?.type);
          return (
            <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-md hover:bg-muted transition-micro">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-muted ${iconConfig?.color}`}>
                <Icon name={iconConfig?.name} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text-primary">
                    {getActivityLabel(activity?.type)}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {formatTimestamp(activity?.timestamp)}
                  </span>
                </div>
                
                <p className="text-sm text-text-secondary mb-1">
                  {activity?.productName}
                </p>
                
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>SKU: {activity?.sku}</span>
                  <span className="font-medium">
                    {activity?.type === 'stock_out' ? '-' : '+'}{activity?.quantity} units
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-micro">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;