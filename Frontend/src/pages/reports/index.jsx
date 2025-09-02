import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const Reports = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedReportType, setSelectedReportType] = useState('inventory');
  const [dateRange, setDateRange] = useState('last-30-days');

  // Check authentication and user role on component mount
  useEffect(() => {
    const token = localStorage.getItem('inventoryms_token') || sessionStorage.getItem('inventoryms_token');
    const role = localStorage.getItem('inventoryms_user_role') || sessionStorage.getItem('inventoryms_user_role');
    const email = localStorage.getItem('inventoryms_user_email') || sessionStorage.getItem('inventoryms_user_email');
    
    if (!token || (!['admin', 'manager']?.includes(role))) {
      // Redirect to appropriate dashboard if not authorized
      const dashboardRoutes = {
        admin: '/admin-dashboard',
        manager: '/manager-dashboard',
        staff: '/staff-dashboard'
      };
      navigate(dashboardRoutes?.[role] || '/login-screen');
      return;
    }
    
    setUserRole(role);
    setUserEmail(email || `${role}@inventoryms.com`);
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('inventoryms_token');
    localStorage.removeItem('inventoryms_user_role'); 
    localStorage.removeItem('inventoryms_user_email');
    sessionStorage.clear();
    navigate('/login-screen');
  };

  // Report types based on user role
  const getAvailableReports = () => {
    const baseReports = [
      {
        id: 'inventory',
        title: 'Inventory Report',
        description: 'Current stock levels, product details, and valuation',
        icon: 'Package',
        color: 'primary'
      },
      {
        id: 'stock-movement',
        title: 'Stock Movement Report',
        description: 'Track all stock movements and transactions',
        icon: 'ArrowUpDown',
        color: 'success'
      },
      {
        id: 'low-stock',
        title: 'Low Stock Alert Report',
        description: 'Items below minimum stock levels',
        icon: 'AlertTriangle',
        color: 'warning'
      }
    ];

    if (userRole === 'admin') {
      baseReports?.push(
        {
          id: 'user-activity',
          title: 'User Activity Report',
          description: 'User logins, actions, and system usage',
          icon: 'Users',
          color: 'accent'
        },
        {
          id: 'system-audit',
          title: 'System Audit Report',
          description: 'Complete system logs and security events',
          icon: 'Shield',
          color: 'error'
        },
        {
          id: 'financial',
          title: 'Financial Report',
          description: 'Revenue, costs, and financial metrics',
          icon: 'DollarSign',
          color: 'success'
        }
      );
    }

    return baseReports;
  };

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'last-30-days', label: 'Last 30 Days' },
    { value: 'last-90-days', label: 'Last 90 Days' },
    { value: 'this-month', label: 'This Month' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'this-year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleGenerateReport = () => {
    // Mock report generation
    const reportData = {
      type: selectedReportType,
      dateRange: dateRange,
      generatedAt: new Date()?.toISOString(),
      requestedBy: userEmail
    };
    
    console.log('Generating report:', reportData);
    
    // In a real implementation, this would make an API call
    alert(`Generating ${getAvailableReports()?.find(r => r?.id === selectedReportType)?.title} for ${dateRange}. Report will be ready shortly.`);
  };

  const handleExportReport = (format) => {
    console.log(`Exporting report as ${format}`);
    alert(`Report exported as ${format?.toUpperCase()} format.`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const availableReports = getAvailableReports();
  const selectedReport = availableReports?.find(r => r?.id === selectedReportType);

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
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Reports</h1>
              <p className="text-text-secondary mt-1">
                Generate and export system reports for analysis
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-text-secondary">
                  Access Level: {userRole === 'admin' ? 'Full Access' : 'Manager Access'}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-md mt-4 sm:mt-0">
              <Icon name="FileText" size={14} className="text-primary" />
              <span className="text-xs font-medium text-primary">REPORTS</span>
            </div>
          </div>

          {/* Report Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {availableReports?.map((report) => (
              <div
                key={report?.id}
                onClick={() => setSelectedReportType(report?.id)}
                className={`p-6 bg-card border rounded-lg cursor-pointer transition-all ${
                  selectedReportType === report?.id
                    ? `border-${report?.color} bg-${report?.color}/5`
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-${report?.color}/10 rounded-lg flex items-center justify-center`}>
                    <Icon name={report?.icon} size={24} className={`text-${report?.color}`} />
                  </div>
                  {selectedReportType === report?.id && (
                    <div className={`w-6 h-6 bg-${report?.color} rounded-full flex items-center justify-center`}>
                      <Icon name="Check" size={16} color="white" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {report?.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {report?.description}
                </p>
              </div>
            ))}
          </div>

          {/* Report Configuration */}
          <div className="bg-card rounded-lg border border-border p-6 mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-6">
              Configure Report: {selectedReport?.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Range Selection */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Date Range
                </label>
                <div className="space-y-2">
                  {dateRangeOptions?.map((option) => (
                    <label key={option?.value} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="dateRange"
                        value={option?.value}
                        checked={dateRange === option?.value}
                        onChange={(e) => setDateRange(e?.target?.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-text-secondary">{option?.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Report Preview */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Report Preview
                </label>
                <div className="bg-muted rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Icon name={selectedReport?.icon} size={16} className={`text-${selectedReport?.color}`} />
                    <span className="font-medium text-text-primary">
                      {selectedReport?.title}
                    </span>
                  </div>
                  <div className="text-sm text-text-secondary space-y-1">
                    <div>Date Range: {dateRangeOptions?.find(o => o?.value === dateRange)?.label}</div>
                    <div>Generated By: {userEmail}</div>
                    <div>Access Level: {userRole}</div>
                    <div>Format: PDF, Excel, CSV</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="primary"
              iconName="FileText"
              iconPosition="left"
              onClick={handleGenerateReport}
              className="flex-1 sm:flex-none"
            >
              Generate Report
            </Button>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={() => handleExportReport('pdf')}
                size="sm"
              >
                Export PDF
              </Button>
              <Button
                variant="outline"
                iconName="FileSpreadsheet"
                iconPosition="left"
                onClick={() => handleExportReport('excel')}
                size="sm"
              >
                Export Excel
              </Button>
              <Button
                variant="outline"
                iconName="Database"
                iconPosition="left"
                onClick={() => handleExportReport('csv')}
                size="sm"
              >
                Export CSV
              </Button>
            </div>
          </div>

          {/* Recent Reports */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold text-text-primary mb-6">
              Recent Reports
            </h3>
            <div className="bg-card rounded-lg border border-border">
              <div className="p-6">
                <div className="space-y-4">
                  {/* Mock recent reports */}
                  {[
                    { 
                      name: 'Inventory Report - August 2025', 
                      type: 'Inventory', 
                      date: '2025-08-28', 
                      size: '2.4 MB',
                      format: 'PDF'
                    },
                    { 
                      name: 'Stock Movement Report - Last 30 Days', 
                      type: 'Stock Movement', 
                      date: '2025-08-25', 
                      size: '1.8 MB',
                      format: 'Excel'
                    },
                    { 
                      name: 'Low Stock Alert Report', 
                      type: 'Low Stock', 
                      date: '2025-08-24', 
                      size: '0.9 MB',
                      format: 'PDF'
                    }
                  ]?.map((report, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <Icon name="FileText" size={16} className="text-primary" />
                        <div>
                          <div className="font-medium text-text-primary">{report?.name}</div>
                          <div className="text-sm text-text-secondary">
                            {report?.type} • Generated on {report?.date} • {report?.size}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs px-2 py-1 bg-muted rounded-full text-text-secondary">
                          {report?.format}
                        </span>
                        <Button variant="ghost" size="sm" iconName="Download" iconSize={14}>
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;