import React from 'react';

export default function BlogView({ blog, onBack }) {
  if (!blog) return null;
  return (
    <div>
      <button onClick={onBack}>&larr; Back</button>
      <h2>{blog.title}</h2>
      <img src={`http://localhost:5000${blog.image}`} alt="Blog" style={{ width: 200, height: 140, objectFit: 'cover' }} />
      <p>{blog.description}</p>
      <div>By: {blog.user?.email}</div>
    </div>
  );
} 