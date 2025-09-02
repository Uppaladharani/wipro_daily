import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ userRole = 'staff', isAuthenticated = true, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/login-screen');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeMoreMenu = () => {
    setIsMoreMenuOpen(false);
  };

  // Role-based navigation items
  const getNavigationItems = () => {
    const baseItems = [];

    // Dashboard - role-specific
    if (userRole === 'admin') {
      baseItems?.push({
        label: 'Dashboard',
        path: '/admin-dashboard',
        icon: 'LayoutDashboard',
        roles: ['admin']
      });
    } else if (userRole === 'manager') {
      baseItems?.push({
        label: 'Dashboard',
        path: '/manager-dashboard',
        icon: 'LayoutDashboard',
        roles: ['manager']
      });
    } else {
      baseItems?.push({
        label: 'Dashboard',
        path: '/staff-dashboard',
        icon: 'LayoutDashboard',
        roles: ['staff']
      });
    }

    // Core workflow items
    baseItems?.push(
      {
        label: 'Products',
        path: '/product-management',
        icon: 'Package',
        roles: ['admin', 'manager', 'staff']
      },
      {
        label: 'Stock Movements',
        path: '/stock-movement-recording',
        icon: 'ArrowUpDown',
        roles: ['admin', 'manager', 'staff']
      }
    );

    return baseItems?.filter(item => item?.roles?.includes(userRole));
  };

  // Secondary/admin items for "More" menu
  const getSecondaryItems = () => {
    const items = [];
    
    if (userRole === 'admin') {
      items?.push(
        { label: 'Settings', path: '/settings', icon: 'Settings' },
        { label: 'User Management', path: '/user-management', icon: 'Users' },
        { label: 'Reports', path: '/reports', icon: 'FileText' }
      );
    } else if (userRole === 'manager') {
      items?.push(
        { label: 'Reports', path: '/reports', icon: 'FileText' },
        { label: 'Settings', path: '/settings', icon: 'Settings' }
      );
    }

    items?.push({ label: 'Help', path: '/help', icon: 'HelpCircle' });
    
    return items;
  };

  const navigationItems = getNavigationItems();
  const secondaryItems = getSecondaryItems();
  const isActive = (path) => location?.pathname === path;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to={navigationItems?.[0]?.path || '/'} className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Package" size={20} color="white" />
          </div>
          <span className="text-lg font-semibold text-text-primary">
            InventoryMS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                isActive(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}

          {/* More Menu */}
          {secondaryItems?.length > 0 && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMoreMenu}
                iconName="MoreHorizontal"
                iconSize={16}
                className="text-text-secondary hover:text-text-primary"
              >
                More
              </Button>
              
              {isMoreMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-999" 
                    onClick={closeMoreMenu}
                  />
                  <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-elevated z-1001 scale-in">
                    <div className="py-1">
                      {secondaryItems?.map((item) => (
                        <Link
                          key={item?.path}
                          to={item?.path}
                          onClick={closeMoreMenu}
                          className="flex items-center space-x-2 px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-micro"
                        >
                          <Icon name={item?.icon} size={16} />
                          <span>{item?.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </nav>

        {/* User Menu & Mobile Toggle */}
        <div className="flex items-center space-x-2">
          {/* User Role Badge */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs font-medium text-text-secondary capitalize">
              {userRole}
            </span>
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            iconName="LogOut"
            iconSize={16}
            className="hidden sm:flex text-text-secondary hover:text-error"
          >
            Logout
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            iconName={isMobileMenuOpen ? "X" : "Menu"}
            iconSize={20}
            className="md:hidden"
          />
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-999 md:hidden" 
            onClick={closeMobileMenu}
          />
          <div className="absolute top-full left-0 right-0 bg-surface border-b border-border shadow-elevated z-1000 md:hidden">
            <nav className="px-4 py-2 space-y-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-micro ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}

              {/* Secondary Items in Mobile */}
              {secondaryItems?.length > 0 && (
                <>
                  <div className="border-t border-border my-2"></div>
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-muted transition-micro"
                    >
                      <Icon name={item?.icon} size={20} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                </>
              )}

              {/* Mobile User Actions */}
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm font-medium text-text-secondary capitalize">
                      {userRole}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    iconName="LogOut"
                    iconSize={16}
                    className="text-text-secondary hover:text-error"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;