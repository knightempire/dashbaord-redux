import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseProxyOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

interface ProxyRequest {
  loading: boolean;
  error: string | null;
  data: any;
}

export const useProxy = (options: UseProxyOptions = {}) => {
  const [state, setState] = useState<ProxyRequest>({
    loading: false,
    error: null,
    data: null,
  });

  const baseURL = options.baseURL || '/api/proxy';
  
  const axiosInstance = axios.create({
    baseURL,
    timeout: options.timeout || 10000,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log(`[PROXY REQUEST] ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('[PROXY REQUEST ERROR]:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log(`[PROXY RESPONSE] ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      console.error('[PROXY RESPONSE ERROR]:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  const makeRequest = useCallback(
    async (config: AxiosRequestConfig): Promise<AxiosResponse> => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const response = await axiosInstance(config);
        setState(prev => ({ ...prev, loading: false, data: response.data }));
        return response;
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'Request failed';
        setState(prev => ({ ...prev, loading: false, error: errorMessage }));
        throw error;
      }
    },
    [axiosInstance]
  );

  // Convenience methods for different proxy targets
  const proxy = {
    // JSONPlaceholder API
    jsonplaceholder: {
      get: (path: string, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'GET', url: `/jsonplaceholder/${path}`, ...config }),
      post: (path: string, data?: any, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'POST', url: `/jsonplaceholder/${path}`, data, ...config }),
      put: (path: string, data?: any, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'PUT', url: `/jsonplaceholder/${path}`, data, ...config }),
      delete: (path: string, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'DELETE', url: `/jsonplaceholder/${path}`, ...config }),
    },

    // ReqRes API
    reqres: {
      get: (path: string, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'GET', url: `/mock/${path}`, ...config }),
      post: (path: string, data?: any, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'POST', url: `/mock/${path}`, data, ...config }),
      put: (path: string, data?: any, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'PUT', url: `/mock/${path}`, data, ...config }),
      delete: (path: string, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'DELETE', url: `/mock/${path}`, ...config }),
    },

    // Custom backend API
    backend: {
      get: (path: string, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'GET', url: `/backend/${path}`, ...config }),
      post: (path: string, data?: any, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'POST', url: `/backend/${path}`, data, ...config }),
      put: (path: string, data?: any, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'PUT', url: `/backend/${path}`, data, ...config }),
      delete: (path: string, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'DELETE', url: `/backend/${path}`, ...config }),
    },

    // Firebase services
    firebase: {
      get: (path: string, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'GET', url: `/firebase/${path}`, ...config }),
      post: (path: string, data?: any, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'POST', url: `/firebase/${path}`, data, ...config }),
      put: (path: string, data?: any, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'PUT', url: `/firebase/${path}`, data, ...config }),
      delete: (path: string, config?: AxiosRequestConfig) =>
        makeRequest({ method: 'DELETE', url: `/firebase/${path}`, ...config }),
    },

    // Custom request
    custom: makeRequest,
  };

  return {
    ...state,
    proxy,
    reset: () => setState({ loading: false, error: null, data: null }),
  };
};

// Standalone proxy functions for direct usage
export const proxyAPI = {
  // JSONPlaceholder endpoints
  jsonplaceholder: {
    getPosts: () => axios.get('/api/proxy/jsonplaceholder/posts'),
    getPost: (id: number) => axios.get(`/api/proxy/jsonplaceholder/posts/${id}`),
    createPost: (data: any) => axios.post('/api/proxy/jsonplaceholder/posts', data),
    updatePost: (id: number, data: any) => axios.put(`/api/proxy/jsonplaceholder/posts/${id}`, data),
    deletePost: (id: number) => axios.delete(`/api/proxy/jsonplaceholder/posts/${id}`),
    
    getUsers: () => axios.get('/api/proxy/jsonplaceholder/users'),
    getUser: (id: number) => axios.get(`/api/proxy/jsonplaceholder/users/${id}`),
  },

  // ReqRes endpoints
  reqres: {
    getUsers: (page = 1) => axios.get(`/api/proxy/mock/users?page=${page}`),
    getUser: (id: number) => axios.get(`/api/proxy/mock/users/${id}`),
    createUser: (data: any) => axios.post('/api/proxy/mock/users', data),
    updateUser: (id: number, data: any) => axios.put(`/api/proxy/mock/users/${id}`, data),
    deleteUser: (id: number) => axios.delete(`/api/proxy/mock/users/${id}`),
  },

  // Backend API endpoints
  backend: {
    getEmployees: () => axios.get('/api/proxy/backend/employees'),
    getEmployee: (id: string) => axios.get(`/api/proxy/backend/employees/${id}`),
    createEmployee: (data: any) => axios.post('/api/proxy/backend/employees', data),
    updateEmployee: (id: string, data: any) => axios.put(`/api/proxy/backend/employees/${id}`, data),
    deleteEmployee: (id: string) => axios.delete(`/api/proxy/backend/employees/${id}`),
  },
};

export default useProxy;
