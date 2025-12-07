import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // Enable cookies
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 401 errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401, clear local storage and redirect to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const apiCalls = {
  // Auth APIs
  login: (email, password) => API.post('/auth/login', { email, password }),
  register: (name, email, password) => API.post('/auth/register', { name, email, password }),
  logout: () => API.post('/auth/logout'),
  verifyToken: () => API.get('/auth/verify'),

  // Menu APIs
  getMenu: () => API.get('/menu'),
  addMenu: (data) => API.post('/menu/add', data),

  // Cart APIs
  addToCart: (itemId, quantity) => API.post('/cart/add', { itemId, quantity }),
  getCart: () => API.get('/cart'),
  removeFromCart: (itemId) => API.delete(`/cart/${itemId}`),
  updateCart: (itemId, quantity) => API.put(`/cart/${itemId}`, { quantity }),

  // Order APIs
  createOrder: (orderData) => API.post('/order/create', orderData),
  getOrders: () => API.get('/order/my-orders'),

  // Payment APIs
  processPayment: (paymentData) => API.post('/payment/process', paymentData),
  getPaymentStatus: (transactionId) => API.get(`/payment/status/${transactionId}`),
  verifyPayment: (orderId) => API.get(`/payment/verify/${orderId}`),

  // Admin APIs
  getAdminStats: () => API.get('/admin/stats'),
  getAdminOrders: () => API.get('/admin/orders'),
  updateOrderStatus: (orderId, status) => API.put(`/admin/orders/${orderId}`, { status }),
  updateMenuItem: (itemId, data) => API.put(`/menu/${itemId}`, data),
  deleteMenuItem: (itemId) => API.delete(`/menu/${itemId}`),
};

export default API;
