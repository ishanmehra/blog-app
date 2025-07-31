const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const blogRoutes = require('./routes/blog.routes');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://blog-app-tau-sooty.vercel.app'
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

// Serve static files for images
app.use('/uploads/profiles', express.static(path.join(__dirname, 'uploads/profiles')));
app.use('/uploads/blogs', express.static(path.join(__dirname, 'uploads/blogs')));

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
