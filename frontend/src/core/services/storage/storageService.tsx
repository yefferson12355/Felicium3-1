// Storage service for localStorage and sessionStorage operations
export const storageService = {
  // Local storage methods
  localStorage: {
    // Set item in localStorage
    set: (key, value) => {
      try {
        if (typeof value === 'object') {
          localStorage.setItem(key, JSON.stringify(value));
        } else {
          localStorage.setItem(key, value);
        }
      } catch (error) {
        console.error('Error setting localStorage item:', error);
      }
    },

    // Get item from localStorage
    get: (key) => {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          // Try to parse as JSON, if it fails return as string
          try {
            return JSON.parse(item);
          } catch (e) {
            return item;
          }
        }
        return null;
      } catch (error) {
        console.error('Error getting localStorage item:', error);
        return null;
      }
    },

    // Remove item from localStorage
    remove: (key) => {
      try {
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing localStorage item:', error);
      }
    },

    // Clear all localStorage
    clear: () => {
      try {
        localStorage.clear();
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    },
  },

  // Session storage methods
  sessionStorage: {
    // Set item in sessionStorage
    set: (key, value) => {
      try {
        if (typeof value === 'object') {
          sessionStorage.setItem(key, JSON.stringify(value));
        } else {
          sessionStorage.setItem(key, value);
        }
      } catch (error) {
        console.error('Error setting sessionStorage item:', error);
      }
    },

    // Get item from sessionStorage
    get: (key) => {
      try {
        const item = sessionStorage.getItem(key);
        if (item) {
          // Try to parse as JSON, if it fails return as string
          try {
            return JSON.parse(item);
          } catch (e) {
            return item;
          }
        }
        return null;
      } catch (error) {
        console.error('Error getting sessionStorage item:', error);
        return null;
      }
    },

    // Remove item from sessionStorage
    remove: (key) => {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing sessionStorage item:', error);
      }
    },

    // Clear all sessionStorage
    clear: () => {
      try {
        sessionStorage.clear();
      } catch (error) {
        console.error('Error clearing sessionStorage:', error);
      }
    },
  },

  // Common methods
  // Check if storage is available
  isAvailable: (type = 'localStorage') => {
    try {
      const storage = type === 'sessionStorage' ? sessionStorage : localStorage;
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  },
};