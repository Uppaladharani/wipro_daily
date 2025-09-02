import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();

  // Route to breadcrumb mapping
  const routeMap = {
    '/admin-dashboard': { label: 'Admin Dashboard', parent: null },
    '/manager-dashboard': { label: 'Manager Dashboard', parent: null },
    '/staff-dashboard': { label: 'Staff Dashboard', parent: null },
    '/product-management': { label: 'Product Management', parent: null },
    '/stock-movement-recording': { label: 'Stock Movement Recording', parent: null },
    '/login-screen': { label: 'Login', parent: null },
    '/settings': { label: 'Settings', parent: null },
    '/user-management': { label: 'User Management', parent: null },
    '/reports': { label: 'Reports', parent: null },
    '/help': { label: 'Help', parent: null }
  };

  const generateBreadcrumbs = () => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Home (Dashboard)
    breadcrumbs?.push({
      label: 'Home',
      path: '/',
      isActive: false
    });

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathSegments?.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const routeInfo = routeMap?.[currentPath];
      
      if (routeInfo) {
        breadcrumbs?.push({
          label: routeInfo?.label,
          path: currentPath,
          isActive: index === pathSegments?.length - 1
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on login page or if only one item
  if (location?.pathname === '/login-screen' || breadcrumbs?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-1 text-sm text-text-secondary mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {breadcrumbs?.map((item, index) => (
          <li key={item?.path || index} className="flex items-center">
            {index > 0 && (
              <Icon 
                name="ChevronRight" 
                size={16} 
                className="mx-2 text-muted-foreground" 
              />
            )}
            
            {item?.isActive ? (
              <span className="font-medium text-text-primary" aria-current="page">
                {item?.label}
              </span>
            ) : (
              <Link
                to={item?.path}
                className="hover:text-text-primary transition-micro"
              >
                {item?.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;