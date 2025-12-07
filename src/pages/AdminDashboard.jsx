import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiCalls } from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const statsResponse = await apiCalls.getAdminStats();
      setStats(statsResponse.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load statistics');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>📊 Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Users</h3>
            <p className="stat-number">{stats.totalUsers}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p className="stat-number">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Total Revenue</h3>
            <p className="stat-number">₹{stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <h2>Management Panels</h2>
        <div className="action-buttons-grid">
          <button
            onClick={() => navigate('/admin/inventory')}
            className="action-btn inventory-btn"
          >
            <span className="action-icon">📦</span>
            <span className="action-text">
              <strong>Inventory Management</strong>
              <p>Add, edit, delete items and manage stock</p>
            </span>
            <span className="action-arrow">→</span>
          </button>

          <button
            onClick={() => navigate('/admin/orders')}
            className="action-btn orders-btn"
          >
            <span className="action-icon">📋</span>
            <span className="action-text">
              <strong>Orders Management</strong>
              <p>View and manage all customer orders</p>
            </span>
            <span className="action-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
