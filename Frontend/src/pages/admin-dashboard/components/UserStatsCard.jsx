import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStatsCard = ({ userStats }) => {
  const roleColors = {
    admin: 'text-error',
    manager: 'text-warning', 
    staff: 'text-success'
  };

  const roleIcons = {
    admin: 'Shield',
    manager: 'UserCheck',
    staff: 'User'
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">User Statistics</h3>
        <Icon name="Users" size={20} className="text-text-secondary" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium text-text-primary">Total Active Users</span>
          <span className="text-lg font-bold text-primary">{userStats?.total}</span>
        </div>

        {Object.entries(userStats?.byRole)?.map(([role, count]) => (
          <div key={role} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon 
                name={roleIcons?.[role]} 
                size={16} 
                className={roleColors?.[role]} 
              />
              <span className="text-sm text-text-secondary capitalize">{role}s</span>
            </div>
            <span className="text-sm font-medium text-text-primary">{count}</span>
          </div>
        ))}

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Online Now</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm font-medium text-success">{userStats?.online}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;