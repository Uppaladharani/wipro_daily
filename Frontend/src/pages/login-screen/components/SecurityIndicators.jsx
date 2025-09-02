import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityIndicators = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      label: 'JWT Secured',
      description: 'Token-based auth'
    },
    {
      icon: 'Eye',
      label: 'Session Monitor',
      description: 'Auto-logout protection'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="flex items-center justify-center space-x-6">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name={feature?.icon} size={14} className="text-success" />
            <div>
              <div className="font-medium">{feature?.label}</div>
              <div className="opacity-75">{feature?.description}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs text-text-secondary">
          Enterprise-grade security • Session timeout: 8 hours
        </p>
      </div>
    </div>
  );
};

export default SecurityIndicators;