import React from 'react';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Manage Users',
      description: 'Add, edit, or remove user accounts',
      icon: 'Users',
      variant: 'default',
      onClick: () => navigate('/user-management')
    },
    {
      title: 'Generate Reports',
      description: 'Create detailed inventory reports',
      icon: 'FileText',
      variant: 'outline',
      onClick: () => navigate('/reports')
    },
    {
      title: 'System Settings',
      description: 'Configure application settings',
      icon: 'Settings',
      variant: 'secondary',
      onClick: () => navigate('/settings')
    },
    {
      title: 'Product Management',
      description: 'View and manage product catalog',
      icon: 'Package',
      variant: 'outline',
      onClick: () => navigate('/product-management')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action, index) => (
          <div
            key={index}
            className="p-4 border border-border rounded-lg hover:bg-muted transition-micro cursor-pointer"
            onClick={action?.onClick}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Button
                variant={action?.variant}
                size="sm"
                iconName={action?.icon}
                iconSize={16}
                onClick={action?.onClick}
              >
                {action?.title}
              </Button>
            </div>
            <p className="text-xs text-text-secondary">{action?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;