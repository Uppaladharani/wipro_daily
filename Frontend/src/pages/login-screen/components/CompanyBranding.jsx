import React from 'react';
import Icon from '../../../components/AppIcon';

const CompanyBranding = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-subtle">
          <Icon name="Package" size={28} color="white" />
        </div>
      </div>
      
      {/* Company Name */}
      <h1 className="text-2xl font-semibold text-text-primary mb-2">
        InventoryMS
      </h1>
      
      {/* Tagline */}
      <p className="text-text-secondary text-sm">
        Enterprise Inventory Management System
      </p>
      
      {/* Welcome Message */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h2 className="text-lg font-medium text-text-primary mb-1">
          Welcome Back
        </h2>
        <p className="text-sm text-text-secondary">
          Sign in to access your inventory dashboard
        </p>
      </div>
    </div>
  );
};

export default CompanyBranding;