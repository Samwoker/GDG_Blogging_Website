# 📝 Blogging Website Backend

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)](https://www.mongodb.com/)

A robust and scalable backend for a modern blogging website built with **Node.js**. This project is structured with modularity, performance, and security in mind — laying the groundwork for user authentication, content management, and API integration.

---

## 📁 Project Structure

```
.
├── .env                          # 🌱 Environment configuration
├── .gitattributes                # 🔧 Git attributes
├── .gitignore                    # 🙈 Ignore rules for sensitive/dependent files
├── package.json                  # 📦 Project metadata and dependencies
├── package-lock.json             # 🔒 Dependency tree lockfile
└── src/                          # 🚀 Source code
    ├── config/                   # ⚙️ Configuration files
    │   ├── config.js             # General app configuration
    │   ├── logger.js             # Winston logger setup
    │   ├── morgan.js             # HTTP request logger middleware
    │   └── passport.js           # Passport strategies for authentication
    ├── controllers/              # 🧠 Route controllers (business logic handlers)
    │   ├── auth.controller.js    # Authentication controller
    │   ├── index.js              # Central export for controllers
    │   └── profile.controller.js # User profile controller
    ├── middlewares/              # 🛡 Custom Express middlewares
    │   ├── auth.js               # Authentication checker
    │   ├── authLimiter.js        # Rate limiter for auth routes
    │   ├── error.js              # Centralized error handler
    │   └── validation.js         # Validation handler
    ├── models/                   # 🧾 Mongoose models
    │   ├── category.js           # Blog category schema
    │   ├── post.js               # Blog post schema
    │   └── user.js               # User schema
    ├── routes/                   # 🌐 API route definitions
    │   ├── auth.routes.js        # Auth routes
    │   ├── category.js           # Category routes
    │   ├── post.js               # Post routes
    │   ├── profile.routes.js     # Profile routes
    │   └── user.js               # User routes
    ├── services/                 # 🧩 Core business logic
    │   ├── index.js              # Service exports
    │   ├── token.service.js      # Token management
    │   └── user.service.js       # User-related services
    ├── utils/                    # 🛠 Helper utilities
    │   ├── catchAsync.js         # Async error wrapper
    │   ├── customError.js        # Custom error class
    │   └── sendMail.js           # Email utility
    ├── validations/              # ✅ Joi validation schemas
    │   ├── index.js              # Central validator export
    │   ├── user.validation.js    # Validations for user operations
    │   ├── env.validation.js     # Validation for environment config
    │   └── custom.validation.js  # Custom field validators
    ├── app.js                    # 🎯 Express app configuration
    └── server.js                 # 🚀 Server startup script

```
---

## ⚙️ Tech Stack

- **Node.js** & **Express** – Core server and routing
- **MongoDB** & **Mongoose** – Database and data modeling
- **JWT** – Authentication and authorization
- **Passport.js** – Authentication strategies
- **Multer**, **Morgan**, **Validator**, and other helpful middlewares

---

## 🚀 Features

- ✅ User Authentication (Register/Login)
- ✅ JWT-based secure sessions
- ✅ Role-based access control
- ✅ Post creation, update, and deletion
- ✅ Category management
- ✅ User profile and account handling
- ✅ Centralized error handling
- ✅ Rate limiting & validation middleware
- ✅ Utility support (e.g., mailing, logging)
  
---

## 📦 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/GDG_Blogging_Website.git
   cd GDG_Blogging_Website
2. **Install dependencies:
   ```bash
   npm install
3. **Set up environment variables:
   ```bash
   cp .env.example .env
Then edit the .env file with your configuration.

---

## Environment Variables
Server
- PORT=3000
- NODE_ENV=development

Database
- MONGODB_URI=mongodb://...

Authentication
- JWT_SECRET=your_secure_jwt_secret_here
- JWT_EXPIRES_IN=30d
- COOKIE_EXPIRES_IN=30

Email 
- SMTP_HOST=smtp.example.com
- SMTP_PORT=587
- SMTP_USERNAME=user@example.com
- SMTP_PASSWORD=password
- EMAIL_FROM=no-reply@blogify.com
  
## 🛠️ Available Scripts
- npm start       # Start production server
- npm run dev     # Start development server with nodemon
- npm test        # Run test suite
- npm run lint    # Run ESLint for code quality
- npm run format  # Format code with Prettier
- npm run docs    # Generate API documentation
  
## 🔒 Authentication
The API uses JWT (JSON Web Tokens) for authentication. Include the token in requests:
- Authorization: Bearer <your_token>

## 📚 API Documentation
Access interactive API docs at /api-docs when running in development mode.

## 🛡️ Security Features
- Helmet for secure headers
- Rate limiting on auth routes
- Data sanitization
- Encrypted passwords (bcrypt)
- JWT with expiration
  
## 📊 Logging
- Winston for application logging
- Morgan for HTTP request logging
- File rotation in production

## ✉️ Email Service
Features include:
- Account verification
- Password reset
- Notification system

## 📜 License
MIT License © 2025 GDG Capstone Project

---
Thank You!🤝
---

