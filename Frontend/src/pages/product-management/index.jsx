import React, { useState, useEffect, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Button from '../../components/ui/Button';
import SearchFilters from './components/SearchFilters';
import ProductTable from './components/ProductTable';
import ProductModal from './components/ProductModal';
import BulkActions from './components/BulkActions';
import Pagination from './components/Pagination';

const ProductManagement = () => {
  // Mock user role - in real app, this would come from auth context
  const [userRole] = useState('admin'); // admin, manager, staff
  const [isAuthenticated] = useState(true);

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    stockStatus: '',
    priceRange: '',
    sortBy: 'name-asc',
    minStock: '',
    maxStock: '',
    dateFrom: '',
    dateTo: '',
    lowStockOnly: false,
    outOfStockOnly: false,
    recentlyUpdated: false
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'view', // 'view', 'edit', 'add'
    product: null
  });

  // Mock products data
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "MacBook Pro 16-inch",
      sku: "MBP-16-2023-001",
      description: "Apple MacBook Pro with M2 Pro chip, 16GB RAM, 512GB SSD",
      category: "electronics",
      price: 2499.00,
      stock: 15,
      minStock: 5,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
      supplier: "Apple Inc.",
      location: "Warehouse A, Shelf 12",
      notes: "High-demand item, monitor stock levels closely",
      lastUpdated: "2024-08-25T10:30:00Z"
    },
    {
      id: 2,
      name: "Wireless Bluetooth Headphones",
      sku: "WBH-2023-002",
      description: "Premium noise-cancelling wireless headphones with 30-hour battery",
      category: "electronics",
      price: 299.99,
      stock: 3,
      minStock: 10,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      supplier: "Sony Electronics",
      location: "Warehouse B, Shelf 5",
      notes: "Low stock - reorder soon",
      lastUpdated: "2024-08-24T14:15:00Z"
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      sku: "OCT-BLU-M-003",
      description: "100% organic cotton t-shirt in blue, medium size",
      category: "clothing",
      price: 29.99,
      stock: 0,
      minStock: 20,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      supplier: "EcoWear Co.",
      location: "Warehouse C, Shelf 8",
      notes: "Out of stock - urgent reorder needed",
      lastUpdated: "2024-08-23T09:45:00Z"
    },
    {
      id: 4,
      name: "JavaScript: The Definitive Guide",
      sku: "JS-DEF-7ED-004",
      description: "Comprehensive guide to JavaScript programming, 7th edition",
      category: "books",
      price: 59.99,
      stock: 25,
      minStock: 8,
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
      supplier: "O\'Reilly Media",
      location: "Warehouse A, Shelf 3",
      notes: "Popular programming book",
      lastUpdated: "2024-08-22T16:20:00Z"
    },
    {
      id: 5,
      name: "Garden Tool Set",
      sku: "GTS-PRO-005",
      description: "Professional 10-piece garden tool set with carrying case",
      category: "home-garden",
      price: 89.99,
      stock: 12,
      minStock: 6,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
      supplier: "GreenThumb Tools",
      location: "Warehouse D, Shelf 15",
      notes: "Seasonal item - high demand in spring",
      lastUpdated: "2024-08-21T11:30:00Z"
    },
    {
      id: 6,
      name: "Professional Basketball",
      sku: "PBB-OFF-006",
      description: "Official size and weight basketball for professional play",
      category: "sports",
      price: 49.99,
      stock: 8,
      minStock: 12,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400",
      supplier: "SportsPro Inc.",
      location: "Warehouse B, Shelf 10",
      notes: "Popular item during basketball season",
      lastUpdated: "2024-08-20T13:45:00Z"
    },
    {
      id: 7,
      name: "Educational Building Blocks",
      sku: "EBB-COL-007",
      description: "Colorful building blocks set for children ages 3-8",
      category: "toys",
      price: 34.99,
      stock: 18,
      minStock: 15,
      image: "https://images.unsplash.com/photo-1558877385-8c1b8e4b6e1b?w=400",
      supplier: "LearnPlay Toys",
      location: "Warehouse C, Shelf 12",
      notes: "Safe for children, meets all safety standards",
      lastUpdated: "2024-08-19T08:15:00Z"
    },
    {
      id: 8,
      name: "Car Air Freshener Pack",
      sku: "CAF-VAN-008",
      description: "Pack of 6 vanilla-scented car air fresheners",
      category: "automotive",
      price: 12.99,
      stock: 45,
      minStock: 20,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400",
      supplier: "AutoFresh Co.",
      location: "Warehouse A, Shelf 7",
      notes: "Fast-moving consumable item",
      lastUpdated: "2024-08-18T15:30:00Z"
    },
    {
      id: 9,
      name: "Vitamin C Serum",
      sku: "VCS-20-009",
      description: "20% Vitamin C anti-aging serum with hyaluronic acid",
      category: "health-beauty",
      price: 79.99,
      stock: 6,
      minStock: 10,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
      supplier: "BeautyLab Inc.",
      location: "Warehouse B, Shelf 3",
      notes: "Temperature-sensitive, store in cool area",
      lastUpdated: "2024-08-17T12:00:00Z"
    },
    {
      id: 10,
      name: "Wireless Gaming Mouse",
      sku: "WGM-RGB-010",
      description: "High-precision wireless gaming mouse with RGB lighting",
      category: "electronics",
      price: 89.99,
      stock: 22,
      minStock: 8,
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
      supplier: "GameTech Pro",
      location: "Warehouse A, Shelf 9",
      notes: "Popular among gamers",
      lastUpdated: "2024-08-16T14:45:00Z"
    }
  ]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products?.filter(product => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm?.toLowerCase();
        const matchesSearch = 
          product?.name?.toLowerCase()?.includes(searchLower) ||
          product?.sku?.toLowerCase()?.includes(searchLower) ||
          product?.description?.toLowerCase()?.includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters?.category && product?.category !== filters?.category) {
        return false;
      }

      // Stock status filter
      if (filters?.stockStatus) {
        const stock = product?.stock;
        const minStock = product?.minStock;
        
        switch (filters?.stockStatus) {
          case 'in-stock':
            if (stock <= minStock) return false;
            break;
          case 'low-stock':
            if (stock === 0 || stock > minStock) return false;
            break;
          case 'out-of-stock':
            if (stock > 0) return false;
            break;
        }
      }

      // Price range filter
      if (filters?.priceRange) {
        const price = product?.price;
        switch (filters?.priceRange) {
          case '0-25':
            if (price >= 25) return false;
            break;
          case '25-50':
            if (price < 25 || price >= 50) return false;
            break;
          case '50-100':
            if (price < 50 || price >= 100) return false;
            break;
          case '100-250':
            if (price < 100 || price >= 250) return false;
            break;
          case '250-500':
            if (price < 250 || price >= 500) return false;
            break;
          case '500+':
            if (price < 500) return false;
            break;
        }
      }

      // Stock range filter
      if (filters?.minStock && product?.stock < parseInt(filters?.minStock)) {
        return false;
      }
      if (filters?.maxStock && product?.stock > parseInt(filters?.maxStock)) {
        return false;
      }

      // Date range filter
      if (filters?.dateFrom) {
        const productDate = new Date(product.lastUpdated);
        const fromDate = new Date(filters.dateFrom);
        if (productDate < fromDate) return false;
      }
      if (filters?.dateTo) {
        const productDate = new Date(product.lastUpdated);
        const toDate = new Date(filters.dateTo);
        toDate?.setHours(23, 59, 59, 999);
        if (productDate > toDate) return false;
      }

      // Special filters
      if (filters?.lowStockOnly && product?.stock > product?.minStock) {
        return false;
      }
      if (filters?.outOfStockOnly && product?.stock > 0) {
        return false;
      }
      if (filters?.recentlyUpdated) {
        const weekAgo = new Date();
        weekAgo?.setDate(weekAgo?.getDate() - 7);
        const productDate = new Date(product.lastUpdated);
        if (productDate < weekAgo) return false;
      }

      return true;
    });

    // Sort products
    const sortKey = sortConfig?.key;
    const sortDirection = sortConfig?.direction;

    filtered?.sort((a, b) => {
      let aValue = a?.[sortKey];
      let bValue = b?.[sortKey];

      // Handle different data types
      if (sortKey === 'price' || sortKey === 'stock') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else if (sortKey === 'lastUpdated') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = String(aValue)?.toLowerCase();
        bValue = String(bValue)?.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [products, searchTerm, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts?.length / itemsPerPage);
  const paginatedProducts = filteredProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  // Event handlers
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      stockStatus: '',
      priceRange: '',
      sortBy: 'name-asc',
      minStock: '',
      maxStock: '',
      dateFrom: '',
      dateTo: '',
      lowStockOnly: false,
      outOfStockOnly: false,
      recentlyUpdated: false
    });
    setSearchTerm('');
  };

  const handleSort = (column) => {
    setSortConfig(prev => ({
      key: column,
      direction: prev?.key === column && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev?.includes(productId)
        ? prev?.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts?.length === paginatedProducts?.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts?.map(p => p?.id));
    }
  };

  const handleClearSelection = () => {
    setSelectedProducts([]);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedProducts([]); // Clear selection when changing pages
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setSelectedProducts([]);
  };

  // Modal handlers
  const openModal = (mode, product = null) => {
    setModalState({
      isOpen: true,
      mode,
      product
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: 'view',
      product: null
    });
  };

  const handleViewProduct = (product) => {
    openModal('view', product);
  };

  const handleEditProduct = (product) => {
    openModal('edit', product);
  };

  const handleAddProduct = () => {
    openModal('add');
  };

  const handleDeleteProduct = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product?.name}"?`)) {
      setProducts(prev => prev?.filter(p => p?.id !== product?.id));
      setSelectedProducts(prev => prev?.filter(id => id !== product?.id));
    }
  };

  const handleSaveProduct = async (productData, mode) => {
    if (mode === 'add') {
      setProducts(prev => [...prev, { ...productData, id: Date.now() }]);
    } else if (mode === 'edit') {
      setProducts(prev => prev?.map(p => 
        p?.id === productData?.id ? productData : p
      ));
    }
  };

  // Bulk actions
  const handleBulkDelete = async (productIds) => {
    if (window.confirm(`Are you sure you want to delete ${productIds?.length} products?`)) {
      setProducts(prev => prev?.filter(p => !productIds?.includes(p?.id)));
      setSelectedProducts([]);
    }
  };

  const handleBulkEdit = async (productIds, action) => {
    // In a real app, this would open a bulk edit modal
    console.log('Bulk edit:', action, productIds);
    alert(`Bulk ${action} for ${productIds?.length} products - Feature coming soon!`);
  };

  const handleBulkExport = async (productIds) => {
    const selectedProductsData = products?.filter(p => productIds?.includes(p?.id));
    const csvContent = [
      ['Name', 'SKU', 'Category', 'Price', 'Stock', 'Last Updated'],
      ...selectedProductsData?.map(p => [
        p?.name,
        p?.sku,
        p?.category,
        p?.price,
        p?.stock,
        new Date(p.lastUpdated)?.toLocaleDateString()
      ])
    ]?.map(row => row?.join(','))?.join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products-export-${new Date()?.toISOString()?.split('T')?.[0]}.csv`;
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logout clicked');
  };

  const canEdit = userRole === 'admin' || userRole === 'manager';

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Product Management</h1>
              <p className="text-text-secondary mt-1">
                Manage your product catalog and inventory levels
              </p>
            </div>
            
            {canEdit && (
              <Button
                variant="default"
                onClick={handleAddProduct}
                iconName="Plus"
                iconPosition="left"
                className="whitespace-nowrap"
              >
                Add Product
              </Button>
            )}
          </div>

          {/* Search and Filters */}
          <div className="mb-6">
            <SearchFilters
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              productCount={filteredProducts?.length}
            />
          </div>

          {/* Bulk Actions */}
          {selectedProducts?.length > 0 && (
            <div className="mb-6">
              <BulkActions
                selectedProducts={selectedProducts}
                onBulkDelete={handleBulkDelete}
                onBulkEdit={handleBulkEdit}
                onBulkExport={handleBulkExport}
                onClearSelection={handleClearSelection}
                userRole={userRole}
              />
            </div>
          )}

          {/* Products Table */}
          <div className="mb-6">
            <ProductTable
              products={paginatedProducts}
              userRole={userRole}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
              onView={handleViewProduct}
              selectedProducts={selectedProducts}
              onSelectProduct={handleSelectProduct}
              onSelectAll={handleSelectAll}
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </div>

          {/* Pagination */}
          {filteredProducts?.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredProducts?.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}

          {/* Product Modal */}
          <ProductModal
            isOpen={modalState?.isOpen}
            onClose={closeModal}
            product={modalState?.product}
            mode={modalState?.mode}
            userRole={userRole}
            onSave={handleSaveProduct}
          />
        </div>
      </main>
    </div>
  );
};

export default ProductManagement;