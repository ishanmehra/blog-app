import React, { useEffect, useState } from 'react';
import BlogForm from '../Blog/BlogForm';
import BlogView from '../Blog/BlogView';
import { getStoredToken, getStoredUser, clearTokens, isTokenExpired } from '../../utils/tokenUtils';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [viewingBlog, setViewingBlog] = useState(null);
  const user = getStoredUser();
  const token = getStoredToken();

  const fetchBlogs = () => {
    if (!token || isTokenExpired(token)) {
      setError('Token expired. Please log in again.');
      clearTokens();
      window.location.reload();
      return;
    }
    
    fetch('/api/blogs', {
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
      const res = await fetch(`/api/blogs/${id}`, {
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
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Dashboard</h2>
        <div>
          <img src={`http://localhost:5000${user.profileImage}`} alt="Profile" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', marginRight: 8 }} />
          <span>{user.email}</span>
          <button onClick={handleLogout} style={{ marginLeft: 12 }}>Logout</button>
        </div>
      </div>
      <button style={{ margin: '16px 0' }} onClick={() => { setEditingBlog(null); setShowForm(true); }}>Add New Blog</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {showForm && (
        <BlogForm
          blog={editingBlog}
          onSave={() => { setShowForm(false); fetchBlogs(); }}
          onCancel={() => setShowForm(false)}
        />
      )}
      {viewingBlog && (
        <BlogView blog={viewingBlog} onBack={() => setViewingBlog(null)} />
      )}
      {!showForm && !viewingBlog && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Image</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td><img src={`http://localhost:5000${blog.image}`} alt="Blog" style={{ width: 60, height: 40, objectFit: 'cover' }} /></td>
                <td>{blog.description.length > 50 ? blog.description.slice(0, 50) + '...' : blog.description}</td>
                <td>
                  <button onClick={() => setViewingBlog(blog)}>View</button>
                  {blog.user && blog.user.email === user.email && (
                    <>
                      <button onClick={() => { setEditingBlog(blog); setShowForm(true); }}>Edit</button>
                      <button onClick={() => handleDelete(blog._id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
} 