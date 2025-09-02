import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ActionCard from './components/ActionCard';
import QuickSearchBar from './components/QuickSearchBar';
import RecentActivityFeed from './components/RecentActivityFeed';
import StatsOverview from './components/StatsOverview';
import QuickActionsPanel from './components/QuickActionsPanel';
import Icon from '../../components/AppIcon';


const StaffDashboard = () => {
  const [userRole, setUserRole] = useState('staff');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Check authentication and user role on component mount
  useEffect(() => {
    const token = localStorage.getItem('inventoryms_token') || sessionStorage.getItem('inventoryms_token');
    const role = localStorage.getItem('inventoryms_user_role') || sessionStorage.getItem('inventoryms_user_role');
    const email = localStorage.getItem('inventoryms_user_email') || sessionStorage.getItem('inventoryms_user_email');
    
    if (!token || role !== 'staff') {
      // Should not happen with ProtectedRoute, but keep as fallback
      window.location.href = '/login-screen';
      return;
    }
    
    setUserRole(role);
    setUserEmail(email || 'staff@inventoryms.com');
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Staff-specific content and metrics  
  const staffMetrics = [
    {
      title: "Today\'s Tasks",
      value: "12",
      change: "+3",
      changeType: "positive", 
      icon: "CheckSquare",
      color: "primary"
    },
    {
      title: "Items Processed",
      value: "156",
      change: "+24",
      changeType: "positive",
      icon: "Package",
      color: "success"
    },
    {
      title: "Pending Reviews",
      value: "8",
      change: "-2",
      changeType: "negative",
      icon: "Clock",
      color: "warning"
    },
    {
      title: "Efficiency Score",
      value: "94%",
      change: "+2.1%", 
      changeType: "positive",
      icon: "TrendingUp",
      color: "accent"
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('inventoryms_token');
    localStorage.removeItem('inventoryms_user_role');
    localStorage.removeItem('inventoryms_user_email');
    sessionStorage.clear();
    window.location.href = '/login-screen';
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm?.trim()) return;
    
    setIsSearching(true);
    
    // Mock search results
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          name: "Wireless Bluetooth Headphones",
          sku: "WBH-001",
          currentStock: 45,
          location: "A-1-B"
        },
        {
          id: 2,
          name: "Gaming Mechanical Keyboard",
          sku: "GMK-205",
          currentStock: 23,
          location: "B-2-C"
        }
      ];
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 1000);
  };

  const handleScanBarcode = () => {
    // Mock barcode scanning
    alert("Barcode scanner activated. In a real implementation, this would open the camera or connect to a barcode scanner device.");
  };

  const handleQuickAction = (action) => {
    switch (action?.id) {
      case 'barcode_scan':
        handleScanBarcode();
        break;
      case 'voice_search':
        alert("Voice search activated. In a real implementation, this would start voice recognition.");
        break;
      case 'bulk_update': navigate('/product-management');
        break;
      case 'print_labels':
        alert("Label printing initiated. In a real implementation, this would connect to a label printer.");
        break;
      default:
        break;
    }
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
              <h1 className="text-3xl font-bold text-text-primary">Staff Dashboard</h1>
              <p className="text-text-secondary mt-1">
                Your daily tasks and inventory operations
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-text-secondary">
                  Logged in as Staff ({userEmail})
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1 bg-green-500/10 rounded-md">
              <Icon name="User" size={14} className="text-green-500" />
              <span className="text-xs font-medium text-green-500">STAFF</span>
            </div>
          </div>

          {/* Staff Control Panel */}
          <div className="bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-lg border border-green-500/20 p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  Staff Work Panel
                </h3>
                <p className="text-text-secondary mb-4">
                  Daily operations - record movements, track inventory, complete assigned tasks
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full">
                    Record Movements
                  </span>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-medium rounded-full">
                    Track Inventory
                  </span>
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-500 text-xs font-medium rounded-full">
                    Complete Tasks
                  </span>
                </div>
              </div>
              <Icon name="User" size={48} className="text-green-500/20" />
            </div>
          </div>

          {/* Staff Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {staffMetrics?.map((metric, index) => (
              <StatsOverview
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

          {/* Staff-specific content sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Today's Tasks
              </h3>
              <QuickActionsPanel onActionSelect={handleQuickAction} />
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Recent Activity
              </h3>
              <RecentActivityFeed />
            </div>
          </div>

          {/* Quick Search and Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <QuickSearchBar onSearch={handleSearch} onScanBarcode={handleScanBarcode} />
            </div>
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <ActionCard 
                  title="Record Movement"
                  description="Add stock in/out"
                  href="/stock-movement-recording"
                  icon="Plus"
                  iconColor="text-green-500"
                  bgColor="bg-green-500/10"
                  onClick={() => navigate('/stock-movement-recording')}
                  route="/stock-movement-recording"
                />
                <ActionCard
                  title="View Products" 
                  description="Browse inventory"
                  href="/product-management"
                  icon="Package"
                  iconColor="text-blue-500"
                  bgColor="bg-blue-500/10"
                  onClick={() => navigate('/product-management')}
                  route="/product-management"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;