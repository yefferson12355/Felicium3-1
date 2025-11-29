import React, { createContext, useContext, useState, useEffect } from 'react';

// Create AppContext
const AppContext = createContext();

// AppProvider component
export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('home'); // Default view
  const [role, setRole] = useState(null); // Current user role
  const [theme, setTheme] = useState('light'); // Current theme
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // Sidebar state
  const [notifications, setNotifications] = useState([]); // App notifications
  const [loading, setLoading] = useState(false); // Global loading state
  const [error, setError] = useState(null); // Global error state

  // Initialize from localStorage if available
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    const savedTheme = localStorage.getItem('appTheme') || 'light';
    const savedSidebarState = localStorage.getItem('sidebarCollapsed') === 'true';

    if (savedRole) setRole(savedRole);
    setTheme(savedTheme);
    setSidebarCollapsed(savedSidebarState);
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    if (role) {
      localStorage.setItem('userRole', role);
    }
  }, [role]);

  useEffect(() => {
    localStorage.setItem('appTheme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', sidebarCollapsed);
  }, [sidebarCollapsed]);

  // Function to change view
  const changeView = (view) => {
    setCurrentView(view);
  };

  // Function to change role
  const changeRole = (newRole) => {
    setRole(newRole);
  };

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Function to add notification
  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      ...notification,
      timestamp: new Date().toISOString(),
    };
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  // Function to remove notification
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  // Function to clear all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = {
    currentView,
    setCurrentView: changeView,
    role,
    setRole: changeRole,
    theme,
    setTheme,
    toggleTheme,
    sidebarCollapsed,
    toggleSidebar,
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    loading,
    setLoading,
    error,
    setError,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;