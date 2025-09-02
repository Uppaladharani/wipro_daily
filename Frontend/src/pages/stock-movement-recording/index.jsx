import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import MovementForm from './components/MovementForm';
import RecentMovements from './components/RecentMovements';
import BatchMovementModal from './components/BatchMovementModal';
import MovementConfirmationModal from './components/MovementConfirmationModal';

const StockMovementRecording = () => {
  const [activeTab, setActiveTab] = useState('in');
  const [userRole, setUserRole] = useState('staff');
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [pendingMovement, setPendingMovement] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recentMovementsKey, setRecentMovementsKey] = useState(0);

  // Check authentication and user role on component mount
  useEffect(() => {
    // Use the same token keys as login system
    const token = localStorage.getItem('inventoryms_token') || sessionStorage.getItem('inventoryms_token');
    const role = localStorage.getItem('inventoryms_user_role') || sessionStorage.getItem('inventoryms_user_role') || 'staff';
    
    if (!token) {
      // This should not happen with ProtectedRoute, but keep as fallback
      window.location.href = '/login-screen';
      return;
    }
    
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('inventoryms_token');
    localStorage.removeItem('inventoryms_user_role');
    localStorage.removeItem('inventoryms_user_email');
    sessionStorage.clear();
    window.location.href = '/login-screen';
  };

  const handleMovementSubmit = (movementData) => {
    setPendingMovement(movementData);
    setShowConfirmationModal(true);
  };

  const handleBatchMovementSubmit = (batchData) => {
    setPendingMovement(batchData);
    setShowBatchModal(false);
    setShowConfirmationModal(true);
  };

  const handleConfirmMovement = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, make API call here
      console.log('Movement confirmed:', pendingMovement);
      
      // Show success message
      alert('Stock movement recorded successfully!');
      
      // Reset form and close modals
      setPendingMovement(null);
      setShowConfirmationModal(false);
      
      // Refresh recent movements
      setRecentMovementsKey(prev => prev + 1);
      
    } catch (error) {
      console.error('Error recording movement:', error);
      alert('Error recording movement. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: `/${userRole}-dashboard`, isActive: false },
    { label: 'Stock Movements', path: '/stock-movement-recording', isActive: false },
    { label: 'Record Movement', path: '/stock-movement-recording', isActive: true }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole}
        isAuthenticated={true}
        onLogout={handleLogout}
      />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb customItems={breadcrumbItems} />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-text-primary">
                  Stock Movement Recording
                </h1>
                <p className="mt-2 text-text-secondary">
                  Record and track all inventory movements with comprehensive audit trails
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center space-x-3">
                {/* Show batch movement only for admin and manager */}
                {(userRole === 'admin' || userRole === 'manager') && (
                  <Button
                    variant="outline"
                    onClick={() => setShowBatchModal(true)}
                    iconName="Layers"
                    iconPosition="left"
                    size="sm"
                  >
                    Batch Movement
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  iconName="BarChart3"
                  iconPosition="left"
                  size="sm"
                >
                  View Reports
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Icon name="TrendingUp" size={24} className="text-accent" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-text-secondary">Today's Stock In</p>
                  <p className="text-2xl font-bold text-text-primary">1,247</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-destructive/10 rounded-lg">
                  <Icon name="TrendingDown" size={24} className="text-destructive" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-text-secondary">Today's Stock Out</p>
                  <p className="text-2xl font-bold text-text-primary">892</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-text-secondary">Pending Approvals</p>
                  <p className="text-2xl font-bold text-text-primary">12</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="Package" size={24} className="text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-text-secondary">Total Movements</p>
                  <p className="text-2xl font-bold text-text-primary">2,139</p>
                </div>
              </div>
            </div>
          </div>

          {/* Movement Form Tabs */}
          <div className="bg-card rounded-lg border border-border mb-8">
            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6" aria-label="Movement Type">
                <button
                  onClick={() => setActiveTab('in')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-micro ${
                    activeTab === 'in' ?'border-accent text-accent' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="Plus" size={16} />
                    <span>Stock In</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('out')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-micro ${
                    activeTab === 'out' ?'border-destructive text-destructive' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="Minus" size={16} />
                    <span>Stock Out</span>
                  </div>
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              <MovementForm
                movementType={activeTab}
                onSubmit={handleMovementSubmit}
                isLoading={isSubmitting}
                userRole={userRole}
              />
            </div>
          </div>

          {/* Recent Movements */}
          <RecentMovements 
            key={recentMovementsKey}
            userRole={userRole} 
          />
        </div>
      </main>

      {/* Batch Movement Modal - Only for admin and manager */}
      {(userRole === 'admin' || userRole === 'manager') && (
        <BatchMovementModal
          isOpen={showBatchModal}
          onClose={() => setShowBatchModal(false)}
          onSubmit={handleBatchMovementSubmit}
          movementType={activeTab}
          isLoading={isSubmitting}
        />
      )}

      {/* Movement Confirmation Modal */}
      <MovementConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => {
          setShowConfirmationModal(false);
          setPendingMovement(null);
        }}
        onConfirm={handleConfirmMovement}
        movementData={pendingMovement}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default StockMovementRecording;