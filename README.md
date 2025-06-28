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

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog-app
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/blog-app
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   ```

4. **Database Setup**
   
   Make sure MongoDB is running. If using a local instance:
   ```bash
   mongod
   ```

5. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

## Running the Application

### Development Mode
```bash
# Run both backend and frontend concurrently
npm run dev

# Or run separately:
# Backend (from backend directory)
npm run dev

# Frontend (from frontend directory)
npm start
```

### Production Mode
```bash
# Build frontend
cd frontend
npm run build

# Start backend (serves both API and React build)
cd ../backend
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
  - **Request (multipart/form-data):**
    - `email`: string
    - `password`: string
    - `profileImage`: file (JPG/PNG, max 5MB)
  - **Success Response:**
    - `201 Created`
    - `{ message: 'User registered successfully.' }`
  - **Error Responses:**
    - `400`: Missing fields, invalid password, or invalid image type/size
    - `409`: Email already registered

- `POST /api/auth/login` - User login
  - **Request (JSON):**
    - `email`: string
    - `password`: string
  - **Success Response:**
    - `200 OK`
    - `{ token, user: { email, profileImage } }`
  - **Error Responses:**
    - `400`: Missing fields
    - `401`: Invalid credentials

### Blogs
- `GET /api/blogs` - Get all blogs
  - **Headers:**
    - `Authorization: Bearer <token>`
  - **Success Response:**
    - `200 OK`
    - `[{ _id, title, description, image, user: { email, profileImage }, createdAt, ... }]`
  - **Error Responses:**
    - `401`: Unauthorized (missing/invalid token)

- `POST /api/blogs` - Create new blog
  - **Headers:**
    - `Authorization: Bearer <token>`
  - **Request (multipart/form-data):**
    - `title`: string
    - `description`: string
    - `image`: file (JPG/PNG, max 5MB)
  - **Success Response:**
    - `201 Created`
    - `{ message: 'Blog created successfully.', blog }`
  - **Error Responses:**
    - `400`: Missing fields, invalid image type/size
    - `401`: Unauthorized

- `GET /api/blogs/:id` - Get blog by ID
  - **Headers:**
    - `Authorization: Bearer <token>`
  - **Success Response:**
    - `200 OK`
    - `{ _id, title, description, image, user: { email, profileImage }, createdAt, ... }`
  - **Error Responses:**
    - `404`: Blog not found
    - `401`: Unauthorized

- `PUT /api/blogs/:id` - Update blog
  - **Headers:**
    - `Authorization: Bearer <token>`
  - **Request (multipart/form-data):**
    - `title`: string (optional)
    - `description`: string (optional)
    - `image`: file (JPG/PNG, max 5MB, optional)
  - **Success Response:**
    - `200 OK`
    - `{ message: 'Blog updated successfully.', blog }`
  - **Error Responses:**
    - `400`: Invalid image type/size
    - `401`: Unauthorized
    - `403`: Not the blog owner
    - `404`: Blog not found

- `DELETE /api/blogs/:id` - Delete blog
  - **Headers:**
    - `Authorization: Bearer <token>`
  - **Success Response:**
    - `200 OK`
    - `{ message: 'Blog deleted successfully.' }`
  - **Error Responses:**
    - `401`: Unauthorized
    - `403`: Not the blog owner
    - `404`: Blog not found

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
- **File size validation for uploads (max 5MB)**
- CORS configuration
- Protected routes

## File Upload

The application supports image uploads for:
- **Profile Images**: JPG/PNG format, max 5MB
- **Blog Images**: JPG/PNG format, max 5MB

Files are stored in the `uploads/` directory with unique filenames.

**Note:** If the file type is not JPG/PNG or the file size exceeds 5MB, the server will return a 400 error with a relevant message.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository. 