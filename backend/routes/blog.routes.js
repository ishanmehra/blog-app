
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog.controller');
const auth = require('../middlewares/auth.middleware');
const { uploadBlog } = require('../middlewares/upload.middleware');
const rateLimit = require('express-rate-limit');

// Blog rate limiter (customize as needed)
const blogLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	message: { message: 'Too many requests. Please try again later.' }
});


// Create Blog
router.post('/', blogLimiter, auth, uploadBlog.single('image'), blogController.createBlog);
// Get All Blogs
router.get('/', blogLimiter, auth, blogController.getBlogs);
// Get Blog by ID
router.get('/:id', blogLimiter, auth, blogController.getBlogById);
// Update Blog
router.put('/:id', blogLimiter, auth, uploadBlog.single('image'), blogController.updateBlog);
// Delete Blog
router.delete('/:id', blogLimiter, auth, blogController.deleteBlog);

module.exports = router;
