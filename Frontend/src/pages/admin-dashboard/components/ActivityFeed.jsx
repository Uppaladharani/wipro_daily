import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user_login':
        return 'LogIn';
      case 'product_added':
        return 'Plus';
      case 'stock_updated':
        return 'ArrowUpDown';
      case 'user_created':
        return 'UserPlus';
      case 'low_stock':
        return 'AlertTriangle';
      default:
        return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'user_login':
        return 'text-success';
      case 'product_added':
        return 'text-primary';
      case 'stock_updated':
        return 'text-accent';
      case 'user_created':
        return 'text-secondary';
      case 'low_stock':
        return 'text-warning';
      default:
        return 'text-text-secondary';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-text-secondary" />
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-micro">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary">{activity?.title}</p>
              <p className="text-xs text-text-secondary mt-1">{activity?.description}</p>
              <p className="text-xs text-text-secondary mt-1">{formatTime(activity?.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;