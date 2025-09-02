import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = () => {
  const stats = [
    {
      id: 1,
      label: "Today\'s Movements",
      value: "47",
      icon: "Activity",
      color: "text-primary",
      bgColor: "bg-blue-50",
      change: "+12%",
      changeType: "positive"
    },
    {
      id: 2,
      label: "Items Processed",
      value: "324",
      icon: "Package",
      color: "text-success",
      bgColor: "bg-green-50",
      change: "+8%",
      changeType: "positive"
    },
    {
      id: 3,
      label: "Stock Updates",
      value: "18",
      icon: "Edit",
      color: "text-warning",
      bgColor: "bg-yellow-50",
      change: "-3%",
      changeType: "negative"
    },
    {
      id: 4,
      label: "Pending Tasks",
      value: "5",
      icon: "Clock",
      color: "text-error",
      bgColor: "bg-red-50",
      change: "0%",
      changeType: "neutral"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats?.map((stat) => (
        <div key={stat?.id} className="bg-card rounded-lg p-4 shadow-subtle">
          <div className="flex items-center justify-between mb-3">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              stat?.changeType === 'positive' ? 'text-success bg-green-50' :
              stat?.changeType === 'negative'? 'text-error bg-red-50' : 'text-text-secondary bg-muted'
            }`}>
              {stat?.change}
            </span>
          </div>
          
          <div>
            <p className="text-2xl font-bold text-text-primary mb-1">{stat?.value}</p>
            <p className="text-sm text-text-secondary">{stat?.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;