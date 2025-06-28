const Blog = require('../models/blog.model');
const path = require('path');

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description || !req.file) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    // Validate image type
    const ext = path.extname(req.file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return res.status(400).json({ message: 'Blog image must be JPG or PNG.' });
    }
    const blog = new Blog({
      title,
      description,
      image: `/uploads/blogs/${req.file.filename}`,
      user: req.user.userId
    });
    await blog.save();
    res.status(201).json({ message: 'Blog created successfully.', blog });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get All Blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('user', 'email profileImage').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user', 'email profileImage');
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    if (blog.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized.' });
    }
    const { title, description } = req.body;
    if (title) blog.title = title;
    if (description) blog.description = description;
    if (req.file) {
      const ext = path.extname(req.file.originalname).toLowerCase();
      if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
        return res.status(400).json({ message: 'Blog image must be JPG or PNG.' });
      }
      blog.image = `/uploads/blogs/${req.file.filename}`;
    }
    await blog.save();
    res.json({ message: 'Blog updated successfully.', blog });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found.' });
    if (blog.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Unauthorized.' });
    }
    await blog.deleteOne();
    res.json({ message: 'Blog deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
