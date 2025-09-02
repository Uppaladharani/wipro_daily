import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  // Mock activity data
  const activities = [
    {
      id: 1,
      type: 'stock_in',
      user: 'Sarah Johnson',
      product: 'Wireless Bluetooth Headphones',
      quantity: 50,
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      status: 'completed'
    },
    {
      id: 2,
      type: 'stock_out',
      user: 'Mike Chen',
      product: 'Ergonomic Office Chair',
      quantity: 3,
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      status: 'completed'
    },
    {
      id: 3,
      type: 'low_stock_alert',
      product: 'Stainless Steel Water Bottle',
      currentStock: 2,
      minStock: 15,
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      status: 'alert'
    },
    {
      id: 4,
      type: 'product_updated',
      user: 'Lisa Wang',
      product: 'LED Desk Lamp',
      changes: 'Price updated',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'completed'
    },
    {
      id: 5,
      type: 'reorder_suggestion',
      product: 'Wireless Mouse',
      suggestedQuantity: 25,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      status: 'pending'
    }
  ];

  const getActivityIcon = (type) => {
    const iconMap = {
      stock_in: { icon: 'ArrowUp', color: 'text-success' },
      stock_out: { icon: 'ArrowDown', color: 'text-error' },
      low_stock_alert: { icon: 'AlertTriangle', color: 'text-warning' },
      product_updated: { icon: 'Edit', color: 'text-primary' },
      reorder_suggestion: { icon: 'RefreshCw', color: 'text-accent' }
    };
    return iconMap?.[type] || { icon: 'Activity', color: 'text-text-secondary' };
  };

  const getActivityMessage = (activity) => {
    switch (activity?.type) {
      case 'stock_in':
        return (
          <div>
            <span className="font-medium">{activity?.user}</span>added{' '}
            <span className="font-medium text-success">{activity?.quantity}</span>units of{' '}
            <span className="font-medium">{activity?.product}</span>
          </div>
        );
      case 'stock_out':
        return (
          <div>
            <span className="font-medium">{activity?.user}</span>removed{' '}
            <span className="font-medium text-error">{activity?.quantity}</span>units of{' '}
            <span className="font-medium">{activity?.product}</span>
          </div>
        );
      case 'low_stock_alert':
        return (
          <div>
            <span className="font-medium text-warning">Low stock alert</span>for{' '}
            <span className="font-medium">{activity?.product}</span>
            <div className="text-xs text-text-secondary mt-1">
              Current: {activity?.currentStock} | Min: {activity?.minStock}
            </div>
          </div>
        );
      case 'product_updated':
        return (
          <div>
            <span className="font-medium">{activity?.user}</span>updated{' '}
            <span className="font-medium">{activity?.product}</span>
            <div className="text-xs text-text-secondary mt-1">{activity?.changes}</div>
          </div>
        );
      case 'reorder_suggestion':
        return (
          <div>
            <span className="font-medium text-accent">Reorder suggestion</span>for{' '}
            <span className="font-medium">{activity?.product}</span>
            <div className="text-xs text-text-secondary mt-1">
              Suggested quantity: {activity?.suggestedQuantity}
            </div>
          </div>
        );
      default:
        return <span>Unknown activity</span>;
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Live Activity Feed</h2>
            <p className="text-sm text-text-secondary">Recent stock movements and updates</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-text-secondary">Live</span>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {activities?.map((activity, index) => {
          const iconConfig = getActivityIcon(activity?.type);
          return (
            <div
              key={activity?.id}
              className={`p-4 border-b border-border last:border-b-0 hover:bg-muted/50 transition-micro ${
                activity?.status === 'alert' ? 'bg-warning/5' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full bg-muted ${iconConfig?.color}`}>
                  <Icon name={iconConfig?.icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-text-primary">
                    {getActivityMessage(activity)}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-text-secondary">
                      {formatTimeAgo(activity?.timestamp)}
                    </span>
                    {activity?.status === 'pending' && (
                      <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                        Action Required
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-border bg-muted/20">
        <button className="w-full text-sm text-primary hover:text-primary/80 transition-micro">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;