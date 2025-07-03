# Blog App - Full Stack Web Application

A full-stack blog application with user authentication, blog management (CRUD operations), and image upload functionality.

## Features

- **User Authentication**: Sign up and login with JWT tokens
- **Blog Management**: Create, read, update, and delete blogs
- **Image Upload**: Support for profile images and blog images
- **Responsive Design**: Modern React frontend with clean UI
- **Security**: Password hashing, JWT authentication, and input validation

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Fetch API** - HTTP requests

## Project Structure

```
blog-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── blog.controller.js
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   ├── models/
│   │   ├── blog.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── blog.routes.js
│   ├── utils/
│   │   └── jwt.util.js
│   ├── uploads/
│   │   ├── blogs/
│   │   └── profiles/
│   ├── app.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html   <--- REQUIRED for build (see below)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Signup.js
│   │   │   ├── Blog/
│   │   │   │   ├── BlogForm.js
│   │   │   │   └── BlogView.js
│   │   │   └── Dashboard/
│   │   │       └── Dashboard.js
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── package.json
```

## Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or cloud instance)
- **npm** (comes with Node.js)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd blog-app
```

### 2. Install Dependencies
```bash
# In the root directory
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Ensure Required Files Exist
- Make sure `frontend/public/index.html` exists. This file is required for building the frontend.
- If it does not exist, create it with the following content:

```html
<!-- frontend/public/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

### 4. Environment Setup
- In the `backend` directory, create a `.env` file:
  ```env
  MONGO_URI=mongodb://localhost:27017/blog-app
  JWT_SECRET=your_jwt_secret_key_here
  PORT=5000
  ```
- Generate a secure JWT secret key:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
  Use the output as your `JWT_SECRET`.

### 5. Start MongoDB
- Make sure MongoDB is running locally:
  ```bash
  mongod
  ```
- (Optional) Use MongoDB Compass to visually inspect your database:  
  Download from https://www.mongodb.com/try/download/compass and connect to `mongodb://localhost:27017`.

## Running the Application

### Development Mode (Recommended for first-time users)
```bash
# From the root directory
npm run dev
```
- This will start both the backend (on port 5000) and frontend (on port 3000).
- Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

### Production Mode
```bash
# Build the frontend
cd frontend
npm run build

# Start the backend (serves API and React build)
cd ../backend
npm start
```
- Open [http://localhost:5000](http://localhost:5000) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and receive JWT

### Blogs
- `GET /api/blogs` - List all blogs
- `POST /api/blogs` - Create a new blog (requires JWT)
- `PUT /api/blogs/:id` - Update a blog (requires JWT)
- `DELETE /api/blogs/:id` - Delete a blog (requires JWT)

## Usage

1. **Sign Up**: Create a new account with email, password, and profile image
2. **Login**: Authenticate with your credentials
3. **Dashboard**: View all blogs and manage your own
4. **Create Blog**: Add new blogs with title, description, and image
5. **Edit/Delete**: Manage your own blogs
6. **View**: Browse all blogs from all users

## Security Features
- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- File type validation for uploads (JPG/PNG only)
- File size validation for uploads (max 5MB)
- CORS configuration
- Protected routes

## File Upload
- **Profile Images**: JPG/PNG format, max 5MB
- **Blog Images**: JPG/PNG format, max 5MB
- Files are stored in the `backend/uploads/` directory with unique filenames.

## Troubleshooting

- **MongoDB not running**: Ensure MongoDB is installed and running (`mongod`).
- **Port conflicts**: Change the `PORT` in your `.env` if 5000 is in use.
- **Frontend build errors**: Make sure `frontend/public/index.html` exists and all dependencies are installed.
- **API errors**: Check backend logs for error messages.
- **JWT errors**: Ensure your `JWT_SECRET` is set and valid.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT 