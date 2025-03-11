# Books Management System

## Objective

The Books Management System is a RESTful API built using Node.js, Express, and MongoDB. It provides user authentication and CRUD operations for managing books. Only authenticated users can perform book-related operations.

## Features

- User Registration & Login
- Token-based Authentication using JWT
- CRUD Operations for Books
- Input Validation with Joi
- Secure Password Handling with bcryptjs
- Environment Variables with dotenv
- Logging with Morgan
- Error Handling & Data Integrity Checks

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose ODM)**
- **JWT (jsonwebtoken)**
- **bcryptjs**
- **Joi** (Input validation)
- **Morgan** (Logging)
- **Compression** (Performance optimization)

---

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/)

### Clone the Repository

```sh
git clone https://github.com/your-repo/books-management-system.git
cd books-management-system
```

### Install Dependencies

```sh
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root and add the following:

```sh
# Server
PORT=3000
NODE_ENV="development"

# Database
MONGO_DB_URI="mongodb://127.0.0.1:27017/DB_books_management"

# JWT Authentication
JWT_SECRET="secret"
JWT_EXPIRES_IN="30d"
JWT_COOKIES_EXPIRES_IN=30

# Password Hashing
SALT_ROUNDS=10
```

### Start the Server

#### Development Mode

```sh
npm run start:dev
```

#### Production Mode

```sh
npm run start:prod
```

---

## API Endpoints

### **Authentication Routes**

#### Register a New User

**POST /api/v1/register**

```json
{
  "username": "user1",
  "password": "password123",
  "repeat_password": "password123"
}
```

#### Login a User

**POST /api/v1/login**

```json
{
  "username": "user1",
  "password": "password123"
}
```

### **Book Management Routes** (Authenticated Users Only)

#### Create a New Book

**POST /api/v1/books**

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedDate": "1925-04-10"
}
```

#### Retrieve All Books

**GET /api/v1/books**

#### Retrieve a Specific Book by ID

**GET /api/v1/books/:id**

#### Update a Specific Book by ID

**PUT /api/v1/books/:id**

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "publishedDate": "1925-04-10"
}
```

#### Delete a Specific Book by ID

**DELETE /api/v1/books/:id**

---
