import { useState } from 'react';
import axios from 'axios'; // Assuming axios is available in the project

// Custom hook for API calls
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic GET request
  const get = async (url, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if needed
          ...options.headers,
        },
      });
      setLoading(false);
      return { data: response.data, error: null };
    } catch (err) {
      setError(err.message || 'Error fetching data');
      setLoading(false);
      return { data: null, error: err.message || 'Error fetching data' };
    }
  };

  // Generic POST request
  const post = async (url, data, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(url, data, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if needed
          ...options.headers,
        },
      });
      setLoading(false);
      return { data: response.data, error: null };
    } catch (err) {
      setError(err.message || 'Error posting data');
      setLoading(false);
      return { data: null, error: err.message || 'Error posting data' };
    }
  };

  // Generic PUT request
  const put = async (url, data, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(url, data, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if needed
          ...options.headers,
        },
      });
      setLoading(false);
      return { data: response.data, error: null };
    } catch (err) {
      setError(err.message || 'Error updating data');
      setLoading(false);
      return { data: null, error: err.message || 'Error updating data' };
    }
  };

  // Generic DELETE request
  const remove = async (url, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if needed
          ...options.headers,
        },
      });
      setLoading(false);
      return { data: response.data, error: null };
    } catch (err) {
      setError(err.message || 'Error deleting data');
      setLoading(false);
      return { data: null, error: err.message || 'Error deleting data' };
    }
  };

  return {
    loading,
    error,
    get,
    post,
    put,
    remove, // Using 'remove' instead of 'delete' since 'delete' is a reserved word
  };
};