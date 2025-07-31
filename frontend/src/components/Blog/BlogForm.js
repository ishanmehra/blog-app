import React, { useState, useEffect } from 'react';
import { getStoredToken, clearTokens, isTokenExpired } from '../../utils/tokenUtils';
import './BlogForm.css';

export default function BlogForm({ blog, onSave, onCancel }) {
  const [title, setTitle] = useState(blog ? blog.title : '');
  const [description, setDescription] = useState(blog ? blog.description : '');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setDescription(blog.description);
    }
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const token = getStoredToken();
    if (!token || isTokenExpired(token)) {
      setError('Token expired. Please log in again.');
      clearTokens();
      window.location.reload();
      return;
    }
    
    if (!title || !description) {
      setError('Title and description are required.');
      setLoading(false);
      return;
    }
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) formData.append('image', image);
    
    try {
      let res, data;
      if (blog && blog._id) {
        res = await fetch(`/api/blogs/${blog._id}`, {
          method: 'PUT',
          headers: { 'Authorization': 'Bearer ' + token },
          body: formData
        });
      } else {
        res = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Authorization': 'Bearer ' + token },
          body: formData
        });
      }
      
      if (res.status === 401) {
        setError('Token expired. Please log in again.');
        clearTokens();
        window.location.reload();
        return;
      }
      
      data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to save blog.');
      } else {
        onSave && onSave();
      }
    } catch (err) {
      setError('Network error.');
    }
    setLoading(false);
  };

  return (
    <form className="blogform-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <h2 className="blogform-title">{blog ? 'Edit Blog' : 'Add Blog'}</h2>
      <label className="blogform-label">Title</label>
      <input className="blogform-input" type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <label className="blogform-label">Description</label>
      <textarea className="blogform-textarea" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" rows={4} required />
      <div className="blogform-file-row">
        <label className="blogform-file-label">
          <input className="blogform-file" type="file" accept="image/png, image/jpeg" onChange={e => setImage(e.target.files[0])} />
          Choose File
        </label>
        <span className="blogform-file-chosen">{image ? image.name : 'No file chosen'}</span>
      </div>
      {blog && blog.image && (
        <div style={{ margin: '8px 0' }}>
          <img src={`http://localhost:5000${blog.image}`} alt="Current" style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 8 }} />
        </div>
      )}
      <div className="blogform-btn-row">
        <button className="blogform-savebtn" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
        <button className="blogform-cancelbtn" type="button" onClick={onCancel}>Cancel</button>
      </div>
      {error && <div className="blogform-error">{error}</div>}
    </form>
  );
} 