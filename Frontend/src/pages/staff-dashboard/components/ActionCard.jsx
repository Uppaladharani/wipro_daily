import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionCard = ({ title, description, icon, iconColor, bgColor, onClick, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className={`${bgColor} rounded-lg p-6 shadow-subtle hover:shadow-elevated transition-micro cursor-pointer group`} onClick={handleClick}>
      <div className="flex items-start space-x-4">
        <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${iconColor} group-hover:scale-105 transition-micro`}>
          <Icon name={icon} size={24} color="white" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
          <p className="text-sm text-text-secondary mb-4">{description}</p>
          <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-micro">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActionCard;