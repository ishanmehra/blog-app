import React from 'react';
import './BlogView.css';

export default function BlogView({ blog, onBack }) {
  if (!blog) return null;
  return (
    <div className="blogview-modal-bg">
      <div className="blogview-modal">
        <img className="blogview-img" src={blog.image} alt="Blog" />
        <h2 className="blogview-title">{blog.title}</h2>
        <div className="blogview-desc-box">
          <p className="blogview-desc">{blog.description}</p>
        </div>
        <div className="blogview-author">By: {blog.user?.email}</div>
        <button className="blogview-backbtn" onClick={onBack}>&larr; Back</button>
      </div>
    </div>
  );
} 