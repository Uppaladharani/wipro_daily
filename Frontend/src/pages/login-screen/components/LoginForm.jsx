import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onLogin, isLoading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for different user roles
  const mockCredentials = {
    admin: { email: 'admin@inventoryms.com', password: 'Admin@123' },
    manager: { email: 'manager@inventoryms.com', password: 'Manager@123' },
    staff: { email: 'staff@inventoryms.com', password: 'Staff@123' }
  };

  const validateField = (name, value) => {
    const errors = {};
    
    if (name === 'email') {
      if (!value) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(value)) {
        errors.email = 'Please enter a valid email address';
      }
    }
    
    if (name === 'password') {
      if (!value) {
        errors.password = 'Password is required';
      } else if (value?.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear field error when user starts typing
    if (fieldErrors?.[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFieldBlur = (e) => {
    const { name, value } = e?.target;
    const errors = validateField(name, value);
    setFieldErrors(prev => ({
      ...prev,
      ...errors
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    // Validate all fields
    const emailErrors = validateField('email', formData?.email);
    const passwordErrors = validateField('password', formData?.password);
    const allErrors = { ...emailErrors, ...passwordErrors };
    
    if (Object.keys(allErrors)?.length > 0) {
      setFieldErrors(allErrors);
      return;
    }

    // Check against mock credentials
    const userRole = Object.keys(mockCredentials)?.find(role => 
      mockCredentials?.[role]?.email === formData?.email && 
      mockCredentials?.[role]?.password === formData?.password
    );

    if (!userRole) {
      setFieldErrors({
        general: 'Invalid email or password. Please check your credentials and try again.'
      });
      return;
    }

    // Simulate login process
    if (onLogin) {
      await onLogin(formData, userRole);
    }

    // Navigate to appropriate dashboard
    const dashboardRoutes = {
      admin: '/admin-dashboard',
      manager: '/manager-dashboard',
      staff: '/staff-dashboard'
    };

    navigate(dashboardRoutes?.[userRole]);
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to forgot password page
    alert('Forgot password functionality would be implemented here.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General Error */}
      {(error || fieldErrors?.general) && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-red-500" />
            <p className="text-sm text-red-700">
              {error || fieldErrors?.general}
            </p>
          </div>
        </div>
      )}
      {/* Email Field */}
      <div>
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          onBlur={handleFieldBlur}
          placeholder="Enter your email address"
          error={fieldErrors?.email}
          required
          disabled={isLoading}
        />
      </div>
      {/* Password Field */}
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          onBlur={handleFieldBlur}
          placeholder="Enter your password"
          error={fieldErrors?.password}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-micro"
          disabled={isLoading}
        >
          <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
        </button>
      </div>
      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          name="rememberMe"
          checked={formData?.rememberMe}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-micro"
          disabled={isLoading}
        >
          Forgot password?
        </button>
      </div>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        iconName="LogIn"
        iconPosition="left"
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
      {/* Mock Credentials Helper */}
      <div className="mt-6 p-4 bg-muted rounded-md">
        <p className="text-xs font-medium text-text-secondary mb-2">Demo Credentials:</p>
        <div className="space-y-1 text-xs text-text-secondary">
          <div>Admin: admin@inventoryms.com / Admin@123</div>
          <div>Manager: manager@inventoryms.com / Manager@123</div>
          <div>Staff: staff@inventoryms.com / Staff@123</div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;