import { useState, useEffect } from 'react';

// Custom hook for notifications
export const useNotification = () => {
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

  return {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };
};