import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = ({ alerts, onDismiss, onViewAll }) => {
  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'text-error bg-error/10 border-error/20';
      case 'warning':
        return 'text-warning bg-warning/10 border-warning/20';
      case 'info':
        return 'text-primary bg-primary/10 border-primary/20';
      default:
        return 'text-text-secondary bg-muted border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">System Alerts</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onViewAll}
          iconName="ExternalLink"
          iconSize={16}
        >
          View All
        </Button>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {alerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-2" />
            <p className="text-text-secondary">No active alerts</p>
          </div>
        ) : (
          alerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`p-4 rounded-lg border ${getAlertColor(alert?.severity)}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={getAlertIcon(alert?.severity)} 
                    size={20} 
                    className={alert?.severity === 'critical' ? 'text-error' : 
                              alert?.severity === 'warning' ? 'text-warning' : 'text-primary'} 
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-text-primary mb-1">
                      {alert?.title}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {alert?.message}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      {new Date(alert.timestamp)?.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismiss(alert?.id)}
                  iconName="X"
                  iconSize={14}
                  className="text-text-secondary hover:text-text-primary"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AlertsPanel;