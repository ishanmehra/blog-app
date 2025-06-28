const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const auth = require('../middlewares/auth.middleware');
const { uploadBlog } = require('../middlewares/upload.middleware');

// Create Blog
router.post('/', auth, uploadBlog.single('image'), blogController.createBlog);
// Get All Blogs
router.get('/', auth, blogController.getBlogs);
// Get Blog by ID
router.get('/:id', auth, blogController.getBlogById);
// Update Blog
router.put('/:id', auth, uploadBlog.single('image'), blogController.updateBlog);
// Delete Blog
router.delete('/:id', auth, blogController.deleteBlog);

module.exports = router;
