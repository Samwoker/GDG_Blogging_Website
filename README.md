# 📝 Blogging Platform Backend

A robust and scalable backend for a modern blogging website built with **Node.js**. This project is structured with modularity, performance, and security in mind — laying the groundwork for user authentication, content management, and API integration.

---

## 📁 Project Structure
GDG_BLOGGING_WEBSITE/
├── .env # Environment configuration
├── .gitattributes # Git attributes
├── .gitignore # Git ignore rules
├── package.json # Project metadata and dependencies
├── package-lock.json # Dependency tree lockfile
└── src/ # Source code
├── config/ # Configuration files
│ ├── config.js # App configuration
│ ├── logger.js # Winston logger setup
│ ├── morgan.js # HTTP request logging
│ └── passport.js # Authentication strategies
├── controllers/ # Route controllers
│ ├── auth.controller.js # Authentication logic
│ ├── index.js # Controller exports
│ └── profile.controller.js # Profile management
├── middlewares/ # Custom middlewares
│ ├── auth.js # Authentication middleware
│ ├── authLimiter.js # Rate limiting for auth routes
│ ├── error.js # Error handling
│ └── validation.js # Request validation
├── models/ # MongoDB models
│ ├── category.js # Blog categories
│ ├── post.js # Blog posts
│ └── user.js # User accounts
├── routes/ # API endpoints
│ ├── auth.routes.js # Authentication routes
│ ├── category.js # Category routes
│ ├── post.js # Post routes
│ ├── profile.routes.js # Profile routes
│ └── user.js # User routes
├── services/ # Business logic
│ ├── index.js # Service exports
│ ├── token.service.js # Token operations
│ └── user.service.js # User operations
├── utils/ # Utilities
│ ├── catchAsync.js # Async error catcher
│ ├── customError.js # Custom error classes
│ └── sendMail.js # Email service
├── validations/ # Validation schemas
├── app.js # Express app configuration
└── server.js # Server entry point
