import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import SecurityIndicators from './components/SecurityIndicators';
import CompanyBranding from './components/CompanyBranding';
import SessionTimeout from './components/SessionTimeout';

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSessionTimeout, setShowSessionTimeout] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Session timeout management
  useEffect(() => {
    const INACTIVITY_TIMEOUT = 8 * 60 * 60 * 1000; // 8 hours
    const WARNING_TIME = 5 * 60 * 1000; // 5 minutes before timeout

    const checkActivity = () => {
      const now = Date.now();
      const timeSinceActivity = now - lastActivity;
      
      if (timeSinceActivity >= INACTIVITY_TIMEOUT - WARNING_TIME) {
        setShowSessionTimeout(true);
      }
    };

    const activityTimer = setInterval(checkActivity, 60000); // Check every minute

    // Track user activity
    const updateActivity = () => {
      setLastActivity(Date.now());
      setShowSessionTimeout(false);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events?.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    return () => {
      clearInterval(activityTimer);
      events?.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
    };
  }, [lastActivity]);

  const handleLogin = async (formData, userRole) => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock JWT token generation
      const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({
        email: formData?.email,
        role: userRole,
        exp: Math.floor(Date.now() / 1000) + (8 * 60 * 60) // 8 hours
      }))}.mock_signature`;

      // Store token in localStorage
      if (formData?.rememberMe) {
        localStorage.setItem('inventoryms_token', mockToken);
        localStorage.setItem('inventoryms_user_role', userRole);
        localStorage.setItem('inventoryms_user_email', formData?.email);
      } else {
        sessionStorage.setItem('inventoryms_token', mockToken);
        sessionStorage.setItem('inventoryms_user_role', userRole);
        sessionStorage.setItem('inventoryms_user_email', formData?.email);
      }

      // Reset activity tracking
      setLastActivity(Date.now());

    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExtendSession = () => {
    setLastActivity(Date.now());
    setShowSessionTimeout(false);
  };

  const handleSessionLogout = () => {
    localStorage.removeItem('inventoryms_token');
    localStorage.removeItem('inventoryms_user_role');
    localStorage.removeItem('inventoryms_user_email');
    sessionStorage.clear();
    setShowSessionTimeout(false);
    window.location?.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo */}
      <header className="absolute top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="Package" size={20} color="white" />
            </div>
            <span className="text-lg font-semibold text-text-primary">
              InventoryMS
            </span>
          </Link>
          
          {/* SSL Indicator */}
          <div className="hidden sm:flex items-center space-x-2 text-xs text-text-secondary">
            <Icon name="Shield" size={14} className="text-success" />
            <span>Secure Connection</span>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-16">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-surface border border-border rounded-xl shadow-elevated p-8">
            {/* Company Branding */}
            <CompanyBranding />
            
            {/* Login Form */}
            <LoginForm
              onLogin={handleLogin}
              isLoading={isLoading}
              error={error}
            />
            
            {/* Security Indicators */}
            <SecurityIndicators />
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-text-secondary">
              © {new Date()?.getFullYear()} InventoryMS. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-2">
              <Link to="/privacy" className="text-xs text-text-secondary hover:text-text-primary transition-micro">
                Privacy Policy
              </Link>
              <span className="text-xs text-text-secondary">•</span>
              <Link to="/terms" className="text-xs text-text-secondary hover:text-text-primary transition-micro">
                Terms of Service
              </Link>
              <span className="text-xs text-text-secondary">•</span>
              <Link to="/support" className="text-xs text-text-secondary hover:text-text-primary transition-micro">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Session Timeout Modal */}
      <SessionTimeout
        isVisible={showSessionTimeout}
        onExtend={handleExtendSession}
        onLogout={handleSessionLogout}
        timeRemaining={300}
      />
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
          <div className="bg-surface rounded-lg shadow-modal p-6 flex items-center space-x-3">
            <div className="animate-spin">
              <Icon name="Loader2" size={20} className="text-primary" />
            </div>
            <span className="text-sm font-medium text-text-primary">
              Authenticating...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;