import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary', onClick }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success':
        return 'bg-success text-success-foreground';
      case 'warning':
        return 'bg-warning text-warning-foreground';
      case 'error':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };

  const getTrendColor = () => {
    if (!trend) return 'text-text-secondary';
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-text-secondary';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  };

  return (
    <div 
      className={`bg-card rounded-lg p-6 border border-border shadow-subtle transition-micro ${
        onClick ? 'cursor-pointer hover:shadow-elevated' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${getColorClasses()}`}>
          <Icon name={icon} size={24} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={16} />
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-2xl font-bold text-text-primary mb-1">{value}</h3>
        <p className="text-sm text-text-secondary mb-1">{title}</p>
        {subtitle && (
          <p className="text-xs text-text-secondary">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;