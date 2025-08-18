
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth.routes');
const blogRoutes = require('./routes/blog.routes');
// Global rate limiter (protects all endpoints, including static and unknown routes)
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // limit each IP to 200 requests per windowMs
  message: { message: 'Too many requests from this IP, please try again later.' }
});



const app = express();
app.use(globalLimiter);

const allowedOrigins = [
  'http://localhost:3000',
  'https://blog-app-one-flame.vercel.app'
];
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Serve React build static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// For any route not handled by API, serve React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

module.exports = app;
