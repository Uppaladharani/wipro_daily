import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SessionTimeout = ({ isVisible, onExtend, onLogout, timeRemaining = 300 }) => {
  const [countdown, setCountdown] = useState(timeRemaining);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVisible, onLogout]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-surface rounded-lg shadow-modal p-6 max-w-md w-full mx-4 scale-in">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-full">
            <Icon name="Clock" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">
              Session Expiring
            </h3>
            <p className="text-sm text-text-secondary">
              Your session will expire in {formatTime(countdown)}
            </p>
          </div>
        </div>
        
        <p className="text-sm text-text-secondary mb-6">
          For your security, you'll be automatically logged out due to inactivity. 
          Click "Stay Signed In" to extend your session.
        </p>
        
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onLogout}
            className="flex-1"
          >
            Sign Out
          </Button>
          <Button
            variant="default"
            onClick={onExtend}
            className="flex-1"
          >
            Stay Signed In
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SessionTimeout;