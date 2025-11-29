import React, { createContext, useContext, useState } from 'react';

// Create NotificationContext
const NotificationContext = createContext();

// NotificationProvider component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Add a notification
  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random(); // Generate a unique ID
    const notification = {
      id,
      message,
      type, // 'info', 'success', 'warning', 'error'
      timestamp: new Date().toISOString(),
    };

    setNotifications((prev) => [...prev, notification]);

    // Auto-remove notification after duration
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, duration);
    }

    return id;
  };

  // Remove a specific notification
  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  // Remove all notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Convenience methods for different notification types
  const showSuccess = (message, duration) => {
    return addNotification(message, 'success', duration);
  };

  const showError = (message, duration) => {
    return addNotification(message, 'error', duration);
  };

  const showWarning = (message, duration) => {
    return addNotification(message, 'warning', duration);
  };

  const showInfo = (message, duration) => {
    return addNotification(message, 'info', duration);
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the notification context
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;