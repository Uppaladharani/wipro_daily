import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onActionSelect }) => {
  const [selectedAction, setSelectedAction] = useState(null);

  const quickActions = [
    {
      id: 'barcode_scan',
      title: 'Barcode Scanner',
      description: 'Scan product barcodes for quick identification',
      icon: 'Scan',
      color: 'bg-blue-500'
    },
    {
      id: 'voice_search',
      title: 'Voice Search',
      description: 'Use voice commands to find products',
      icon: 'Mic',
      color: 'bg-green-500'
    },
    {
      id: 'bulk_update',
      title: 'Bulk Update',
      description: 'Update multiple items at once',
      icon: 'List',
      color: 'bg-purple-500'
    },
    {
      id: 'print_labels',
      title: 'Print Labels',
      description: 'Generate and print product labels',
      icon: 'Printer',
      color: 'bg-orange-500'
    }
  ];

  const handleActionClick = (action) => {
    setSelectedAction(action?.id);
    if (onActionSelect) {
      onActionSelect(action);
    }
    // Reset selection after a brief moment
    setTimeout(() => setSelectedAction(null), 200);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleActionClick(action)}
            className={`p-4 rounded-lg border border-border hover:border-primary transition-micro text-left group ${
              selectedAction === action?.id ? 'border-primary bg-primary/5' : 'hover:bg-muted'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${action?.color} group-hover:scale-105 transition-micro`}>
                <Icon name={action?.icon} size={16} color="white" />
              </div>
              <h4 className="font-medium text-text-primary text-sm">{action?.title}</h4>
            </div>
            <p className="text-xs text-text-secondary">{action?.description}</p>
          </button>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" fullWidth iconName="Settings" iconPosition="left">
          Customize Actions
        </Button>
      </div>
    </div>
  );
};

export default QuickActionsPanel;