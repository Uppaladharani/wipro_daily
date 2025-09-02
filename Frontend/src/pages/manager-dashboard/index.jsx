import React, { useState, useEffect } from 'react';

import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricsCard from './components/MetricsCard';
import QuickProductTable from './components/QuickProductTable';
import ActivityFeed from './components/ActivityFeed';
import ReorderNotifications from './components/ReorderNotifications';
import Icon from '../../components/AppIcon';


const ManagerDashboard = () => {
  const [userRole, setUserRole] = useState('manager');
  const [userEmail, setUserEmail] = useState('');

  // Check authentication and user role on component mount
  useEffect(() => {
    const token = localStorage.getItem('inventoryms_token') || sessionStorage.getItem('inventoryms_token');
    const role = localStorage.getItem('inventoryms_user_role') || sessionStorage.getItem('inventoryms_user_role');
    const email = localStorage.getItem('inventoryms_user_email') || sessionStorage.getItem('inventoryms_user_email');
    
    if (!token || role !== 'manager') {
      // Should not happen with ProtectedRoute, but keep as fallback
      window.location.href = '/login-screen';
      return;
    }
    
    setUserRole(role);
    setUserEmail(email || 'manager@inventoryms.com');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('inventoryms_token');
    localStorage.removeItem('inventoryms_user_role');
    localStorage.removeItem('inventoryms_user_email'); 
    sessionStorage.clear();
    window.location.href = '/login-screen';
  };

  // Manager-specific content and metrics
  const managerMetrics = [
    {
      title: "Products Managed",
      value: "1,245", 
      change: "+8.2%",
      changeType: "positive",
      icon: "Package",
      color: "primary"
    },
    {
      title: "Staff Members",
      value: "24",
      change: "+2.1%", 
      changeType: "positive",
      icon: "Users",
      color: "success"
    },
    {
      title: "Pending Approvals",
      value: "12",
      change: "-15.3%",
      changeType: "negative", 
      icon: "Clock",
      color: "warning"
    },
    {
      title: "Monthly Target",
      value: "87%",
      change: "+12.5%",
      changeType: "positive",
      icon: "Target", 
      color: "accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole}
        isAuthenticated={true}
        onLogout={handleLogout}
        userName={userEmail}
      />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Manager Dashboard</h1>
              <p className="text-text-secondary mt-1">
                Inventory management and team oversight
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-text-secondary">
                  Logged in as Manager ({userEmail})
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-blue-500/10 rounded-md">
              <Icon name="Briefcase" size={14} className="text-blue-500" />
              <span className="text-xs font-medium text-blue-500">MANAGER</span>
            </div>
          </div>

          {/* Manager Control Panel */}
          <div className="bg-gradient-to-r from-blue-500/5 to-green-500/5 rounded-lg border border-blue-500/20 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Manager Control Panel
                </h3>
                <p className="text-text-secondary mb-4">
                  Inventory oversight - manage stock levels, approve transactions, monitor staff
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-medium rounded-full">
                    Inventory Control
                  </span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">
                    Staff Supervision
                  </span>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-500 text-xs font-medium rounded-full">
                    Approve Requests
                  </span>
                </div>
              </div>
              <Icon name="Briefcase" size={48} className="text-blue-500/20" />
            </div>
          </div>

          {/* Manager Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {managerMetrics?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                subtitle=""
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
                trend=""
                trendValue=""
                onClick={() => {}}
              />
            ))}
          </div>

          {/* Manager-specific content sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Pending Approvals
              </h3>
              <ReorderNotifications />
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Team Activity
              </h3>
              <ActivityFeed />
            </div>
          </div>

          {/* Quick Product Table */}
          <QuickProductTable />
        </div>
      </main>
    </div>
  );
};

export default ManagerDashboard;