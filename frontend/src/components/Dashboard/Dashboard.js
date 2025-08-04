import React, { useEffect, useState } from 'react';
import BlogForm from '../Blog/BlogForm';
import BlogView from '../Blog/BlogView';
import { getStoredToken, getStoredUser, clearTokens, isTokenExpired } from '../../utils/tokenUtils';
import './Dashboard.css';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);
  const user = getStoredUser();
  const token = getStoredToken();
  const API_BASE = process.env.REACT_APP_API_URL || '/api';

  const fetchBlogs = () => {
    if (!token || isTokenExpired(token)) {
      setError('Token expired. Please log in again.');
      clearTokens();
      window.location.reload();
      return;
    }
    
    fetch(`${API_BASE}/blogs`, {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => {
        if (res.status === 401) {
          // Token is invalid or expired
          clearTokens();
          window.location.reload();
          return;
        }
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data)) {
          setBlogs(data);
          setError('');
        } else if (data) {
          setError(data.message || 'Failed to load blogs');
        }
      })
      .catch(() => setError('Network error'));
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line
  }, [token]);

  const handleLogout = () => {
    clearTokens();
    window.location.reload();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    if (!token || isTokenExpired(token)) {
      alert('Token expired. Please log in again.');
      clearTokens();
      window.location.reload();
      return;
    }
    
    try {
      const res = await fetch(`${API_BASE}/blogs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      });
      
      if (res.status === 401) {
        alert('Token expired. Please log in again.');
        clearTokens();
        window.location.reload();
        return;
      }
      
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || 'Delete failed.');
      } else {
        fetchBlogs();
      }
    } catch {
      alert('Network error.');
    }
  };

  if (!user) return <div>Please log in.</div>;

  return (
    <div className="dashboard-bg">
      <div className="dashboard-topbar">
        <div className="dashboard-appname">Blog App</div>
        <div className="dashboard-userinfo">
          {user.profileImage && (
            <img
              src={user.profileImage}
              alt="Profile"
              style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', marginRight: 12 }}
            />
          )}
          <span>{user.email}</span>
          <button className="dashboard-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="dashboard-table-header-row">
            <span className="dashboard-table-title">Title</span>
            <span className="dashboard-table-actions">Actions</span>
            <button className="dashboard-addbtn" onClick={() => { setEditingBlog(null); setShowForm(true); }}>Add New Blog</button>
          </div>
          {error && <div className="dashboard-error">{error}</div>}
          {showForm && (
            <div className="dashboard-modal-bg">
              <div className="dashboard-modal">
                <BlogForm
                  blog={editingBlog}
                  onSave={() => { setShowForm(false); fetchBlogs(); }}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            </div>
          )}
          {viewingBlog && (
            <BlogView blog={viewingBlog} onBack={() => setViewingBlog(null)} />
          )}
          {!showForm && !viewingBlog && (
            <div className="dashboard-blog-list">
              {blogs.map(blog => (
                <div className="dashboard-blog-row" key={blog._id}>
                  <span className="dashboard-blog-title">{blog.title}</span>
                  <span className="dashboard-blog-actions">
                    <button className="dashboard-viewbtn" onClick={() => setViewingBlog(blog)}>View</button>
                    {blog.user && blog.user.email === user.email && (
                      <>
                        <button className="dashboard-editbtn" onClick={() => { setEditingBlog(blog); setShowForm(true); }}>Edit</button>
                        <button className="dashboard-delbtn" onClick={() => handleDelete(blog._id)}>Delete</button>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 