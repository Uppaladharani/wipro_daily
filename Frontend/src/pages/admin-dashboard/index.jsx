import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricCard from './components/MetricCard';
import InventoryChart from './components/InventoryChart';
import ActivityFeed from './components/ActivityFeed';
import AlertsPanel from './components/AlertsPanel';

import UserStatsCard from './components/UserStatsCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [refreshTime, setRefreshTime] = useState(new Date());
  const [alerts, setAlerts] = useState([]);
  const [userRole, setUserRole] = useState('admin');
  const [userEmail, setUserEmail] = useState('');

  // Check authentication and user role on component mount
  useEffect(() => {
    const token = localStorage.getItem('inventoryms_token') || sessionStorage.getItem('inventoryms_token');
    const role = localStorage.getItem('inventoryms_user_role') || sessionStorage.getItem('inventoryms_user_role');
    const email = localStorage.getItem('inventoryms_user_email') || sessionStorage.getItem('inventoryms_user_email');
    
    if (!token || role !== 'admin') {
      // Should not happen with ProtectedRoute, but keep as fallback
      window.location.href = '/login-screen';
      return;
    }
    
    setUserRole(role);
    setUserEmail(email || 'admin@inventoryms.com');
  }, []);

  // Admin-specific metrics with enhanced privileges
  const metrics = [
    {
      title: "Total Products",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive",
      icon: "Package",
      color: "primary"
    },
    {
      title: "Active Users",
      value: "156",
      change: "+3.2%",
      changeType: "positive",
      icon: "Users",
      color: "success"
    },
    {
      title: "System Alerts",
      value: "23",
      change: "-8.1%",
      changeType: "negative",
      icon: "AlertTriangle",
      color: "warning"
    },
    {
      title: "Revenue (Monthly)",
      value: "$45.2K",
      change: "+18.7%",
      changeType: "positive",
      icon: "DollarSign",
      color: "accent"
    }
  ];

  // Mock data for dashboard metrics
  const inventoryTrends = [
    { name: 'Jan', value: 2400 },
    { name: 'Feb', value: 2210 },
    { name: 'Mar', value: 2290 },
    { name: 'Apr', value: 2000 },
    { name: 'May', value: 2181 },
    { name: 'Jun', value: 2500 },
    { name: 'Jul', value: 2847 }
  ];

  // Mock data for stock movements chart
  const stockMovements = [
    { name: 'Mon', value: 45 },
    { name: 'Tue', value: 52 },
    { name: 'Wed', value: 38 },
    { name: 'Thu', value: 67 },
    { name: 'Fri', value: 89 },
    { name: 'Sat', value: 34 },
    { name: 'Sun', value: 28 }
  ];

  // Mock data for user statistics
  const userStats = {
    total: 156,
    online: 42,
    byRole: {
      admin: 8,
      manager: 24,
      staff: 124
    }
  };

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: 'user_login',
      title: 'Sarah Johnson logged in',
      description: 'Manager role - Warehouse A',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      type: 'product_added',
      title: 'New product added',
      description: 'Industrial Drill Bits - SKU: IDB-2024-001',
      timestamp: new Date(Date.now() - 900000)
    },
    {
      id: 3,
      type: 'stock_updated',
      title: 'Stock level updated',
      description: 'Safety Helmets quantity changed from 45 to 67',
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 4,
      type: 'low_stock',
      title: 'Low stock alert',
      description: 'Work Gloves below minimum threshold (8 remaining)',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 5,
      type: 'user_created',
      title: 'New user account created',
      description: 'Mike Rodriguez - Staff role assigned',
      timestamp: new Date(Date.now() - 7200000)
    }
  ];

  // Mock alerts data
  const mockAlerts = [
    {
      id: 1,
      severity: 'critical',
      title: 'System Backup Failed',
      message: 'Automated backup process failed at 2:00 AM. Manual intervention required.',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 2,
      severity: 'warning',
      title: 'Multiple Low Stock Items',
      message: '15 products are below minimum stock levels and require restocking.',
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: 3,
      severity: 'info',
      title: 'Monthly Report Ready',
      message: 'August 2025 inventory report has been generated and is ready for review.',
      timestamp: new Date(Date.now() - 10800000)
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('inventoryms_token');
    localStorage.removeItem('inventoryms_user_role'); 
    localStorage.removeItem('inventoryms_user_email');
    sessionStorage.clear();
    window.location.href = '/login-screen';
  };

  useEffect(() => {
    setAlerts(mockAlerts);
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      setRefreshTime(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts?.filter(alert => alert?.id !== alertId));
  };

  const handleViewAllAlerts = () => {
    console.log('Navigate to alerts page');
  };

  const handleGenerateReports = () => {
    navigate('/reports');
  };

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
              <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
              <p className="text-text-secondary mt-1">
                Complete system control and management overview
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-text-secondary">
                  Logged in as Administrator ({userEmail})
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-text-secondary" />
                <span className="text-sm text-text-secondary">
                  Last updated: {refreshTime?.toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-md">
                <Icon name="Shield" size={14} className="text-primary" />
                <span className="text-xs font-medium text-primary">ADMIN</span>
              </div>
            </div>
          </div>

          {/* Admin Control Panel */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Administrator Control Panel
                </h3>
                <p className="text-text-secondary mb-4">
                  Full system access - manage users, configure settings, view all data
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    User Management
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    System Settings
                  </span>
                  <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                    Full Reports Access
                  </span>
                  <span className="px-3 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full">
                    Audit Logs
                  </span>
                </div>
              </div>
              <Icon name="Crown" size={48} className="text-primary/20" />
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <InventoryChart
              type="line"
              title="Inventory Trends (Last 7 Months)"
              data={inventoryTrends}
              dataKey="value"
              color="#2563EB"
            />
            <InventoryChart
              type="bar"
              title="Stock Movements (This Week)"
              data={stockMovements}
              dataKey="value"
              color="#059669"
            />
          </div>

          {/* Dashboard Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Activity Feed */}
            <div className="lg:col-span-1">
              <ActivityFeed activities={recentActivities} />
            </div>

            {/* Middle Column - User Stats */}
            <div className="lg:col-span-1">
              <UserStatsCard userStats={userStats} />
            </div>

            {/* Right Column - Alerts */}
            <div className="lg:col-span-1">
              <AlertsPanel
                alerts={alerts}
                onDismiss={handleDismissAlert}
                onViewAll={handleViewAllAlerts}
              />
            </div>
          </div>

          {/* Admin-Specific Quick Actions */}
          <div className="bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Administrator Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" iconName="Users" iconPosition="left" size="sm">
                Manage Users
              </Button>
              <Button variant="outline" iconName="Settings" iconPosition="left" size="sm">
                System Settings
              </Button>
              <Button 
                variant="outline" 
                iconName="FileText" 
                iconPosition="left" 
                size="sm"
                onClick={handleGenerateReports}
              >
                Generate Reports
              </Button>
              <Button variant="outline" iconName="Database" iconPosition="left" size="sm">
                Backup System
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;