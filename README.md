# Backend Project – NodeJS + Express + MongoDB Atlas

## Overview

This project is a backend API built with **NodeJS** and **Express**, connected to **MongoDB Atlas**.  
It implements authentication, role-based authorization, relational data between collections, image uploads using Cloudinary, and database seeding.

The objective is to demonstrate a structured and secure backend architecture.

---

## Tech Stack

- NodeJS
- Express
- MongoDB Atlas
- Mongoose
- Cloudinary
- Multer
- JWT (JSON Web Token)
- bcrypt
- dotenv

---

## Database Structure

### 1. User Model

Fields:

- `username` (String, required)
- `email` (String, required, unique)
- `password` (String, hashed)
- `role` (String, default: "user")
- `image` (String – Cloudinary URL)
- `posts` (Array of ObjectIds referencing another collection)

### Rules

- Users are created with role `"user"` only.
- The first admin is created manually in MongoDB Atlas.
- Only admins can promote users to `"admin"`.
- A normal user:
  - Cannot change roles.
  - Cannot promote themselves.
  - Cannot delete other users.
- A user can delete only their own account.
- Admins can delete any account.
- When a user is deleted:
  - Their Cloudinary image is also deleted.
- The `posts` array:
  - Does not allow duplicates.
  - New entries do not overwrite previous data.



---

### 2. Post Model 

Example fields:

- `title` (String)
- `description` (String)

This collection is referenced inside the User model.

---

## Endpoints

- **User Endpoints**:
| Method | Endpoint         | Description         | Access        |
| ------ | ---------------- | ------------------- | ------------- |
| POST   | /api/users       | Register a new user | Public        |
| POST   | /api/users/login | User login          | Public        |
| GET    | /api/users       | Get all users       | Public  |
| GET    | /api/users/:id   | Get user by ID      | Admin or self |
| PUT    | /api/users/:id   | Update user         | Admin or self |
| DELETE | /api/users/:id   | Delete user         | Admin or self |

  - **Post Endpoints** (example):
| Method | Endpoint       | Description       | Access              |
| ------ | -------------- | ----------------- | ------------------- |
| POST   | /api/posts     | Create a new post | Authenticated users |
| GET    | /api/posts     | Get all posts     | Public              |
| GET    | /api/posts/:id | Get post by ID    | Public              |
| PUT    | /api/posts/:id | Update post       | Authenticated users |
| DELETE | /api/posts/:id | Delete post       | Authenticated users |



## Authentication & Authorization

- Passwords are hashed using bcrypt.
- JWT is used for protected routes.
- Middleware handles:
  - Token verification
  - Role verification (admin vs user)

---

## Image Upload

- Images are uploaded from the user’s device.
- Handled via Multer middleware.
- Stored in Cloudinary.
- On user deletion, the Cloudinary image is also removed.

---

## Database Seeding

A seed script is included to populate one collection with initial data.

Example:

~~~bash
npm run seed
~~~

This inserts predefined documents into the selected collection.

---

## Project Structure

~~~
/config
/entities
/helpers
/middleware
main.js
.env
~~~

---

## Installation

1. Clone repository

~~~bash
git clone <your-repository-url>
~~~

2. Install dependencies

~~~bash
npm install
~~~

3. Create `.env` file with:

~~~
DB_URI=
JWT_SECRET=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
~~~

4. Run server

~~~bash
npm run dev
~~~

---

## Main Features

- User registration and login
- Role-based access control
- Admin promotion system
- Protected routes
- Image upload and deletion
- MongoDB collection relations
- Duplicate prevention in relational arrays
- Seed script for database initialization

---

## Notes

- The repository is public for academic evaluation.
- The `.env` file may be included for correction purposes.
- In production projects, `.env` files should never be uploaded.

---

## Conclusion

This project demonstrates:

- Secure backend architecture  
- Role-based authorization  
- Cloud-based file management  
- MongoDB relational handling  
- Structured project organization  