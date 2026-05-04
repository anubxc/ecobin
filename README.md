# EcoBin - Smart Waste Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18%2B-blue)](https://react.dev/)

A comprehensive, eco-friendly web application designed to revolutionize waste management through intelligent bin tracking, user rewards, and comprehensive admin analytics. EcoBin connects users with smart waste collection points, tracks their environmental impact, and incentivizes sustainable behavior through a gamified reward system.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [User Guide](#user-guide)
- [Admin Guide](#admin-guide)
- [Development Guide](#development-guide)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)

## Overview

EcoBin is a full-stack application that bridges the gap between environmental awareness and practical action. Users can:
- Locate nearby smart waste bins in real-time
- Log their waste disposal activities
- Track their environmental impact through quantitative metrics
- Earn virtual currency (tokens/credits) for sustainable actions
- Redeem rewards for their contributions
- Provide feedback to improve the system

Administrators can:
- Monitor system-wide waste management statistics
- Manage bin locations, capacity, and status
- View user activity and engagement metrics
- Process and respond to user feedback
- Generate reports for sustainability initiatives

## Features

### User Features
- **User Authentication**
  - Secure registration and login with JWT tokens
  - Password hashing with bcrypt
  - Session management and token refresh
  - Email verification (optional)

- **Waste Tracking**
  - Log waste disposal activities with timestamps
  - Categorize waste by type (plastic, organic, paper, etc.)
  - Track quantity and weight
  - View waste history and statistics
  - Personal contribution reports

- **Smart Bins**
  - Real-time bin location mapping using coordinates
  - View bin capacity and availability status
  - Distance calculation to nearest bins
  - Bin availability schedule
  - Historical usage patterns

- **Wallet System**
  - Accumulate credits/tokens for each waste disposal
  - Real-time wallet balance display
  - Transaction history with detailed records
  - Token expiration management
  - Point conversion rates

- **Feedback System**
  - Submit feedback about bins or service
  - Rate user experience
  - Report bin issues (overflow, damage, etc.)
  - Track feedback status and admin responses
  - View feedback history

- **User Dashboard**
  - Personal statistics and impact metrics
  - Carbon footprint calculation
  - Leaderboard rankings
  - Recent activity timeline
  - Achievement badges

### Admin Features
- **Admin Dashboard**
  - System-wide analytics and reporting
  - Real-time bin monitoring
  - User growth and engagement charts
  - Waste collection statistics
  - Revenue and cost tracking

- **User Management**
  - View all registered users
  - Monitor user activity
  - Manage user roles and permissions
  - View user statistics and contributions
  - Suspend or delete user accounts

- **Bin Management**
  - Add, update, and delete bin locations
  - Monitor bin capacity and status
  - Schedule maintenance
  - View bin usage analytics
  - Set availability windows

- **Token Management**
  - Configure token reward rates
  - Monitor token distribution
  - Create promotional campaigns
  - View token redemption history
  - Adjust point conversion rates

- **Feedback Management**
  - Review all submitted feedback
  - Respond to user concerns
  - Categorize and prioritize feedback
  - Track resolution status
  - Generate feedback reports

## Technology Stack

### Frontend
- **React 18+** - Modern UI library with hooks and context API
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS 3+** - Utility-first CSS framework for responsive design
- **PostCSS** - CSS transformation and optimization
- **JavaScript (ES6+)** - Modern JavaScript features
- **Context API** - State management for authentication and user data
- **Fetch API** - HTTP client for API communication

### Backend
- **Node.js 14+** - JavaScript runtime environment
- **Express.js** - Minimalist web framework
- **MongoDB** - NoSQL document database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing and security
- **Dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing middleware
- **Morgan** - HTTP request logging

### Development Tools
- **npm** - Package management
- **Git** - Version control
- **Nodemon** - Development server auto-reload
- **ESLint** (recommended) - Code linting
- **Prettier** (recommended) - Code formatting

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Client Layer                        │
│              React Frontend (Vite)                      │
│  ┌─────────────┬──────────────┬──────────────────────┐  │
│  │   Navbar    │   Pages      │   Components         │  │
│  │             │   - Auth     │   - Reusable UI      │  │
│  │             │   - Landing  │   - Waste Tracker    │  │
│  │             │   - Dashboard│   - Bin Locator      │  │
│  │             │   - Admin    │   - Wallet Display   │  │
│  └─────────────┴──────────────┴──────────────────────┘  │
│                                                          │
│           ┌──────────────────────────────┐               │
│           │  Context API (Auth Context)  │               │
│           │  State Management            │               │
│           └──────────────────────────────┘               │
└─────────────────────────────────────────────────────────┘
                        ▼ HTTP/REST
┌─────────────────────────────────────────────────────────┐
│                     API Layer                           │
│              Express.js Backend                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Middleware Layer                     │   │
│  │  ├─ CORS & Security                              │   │
│  │  ├─ Authentication (JWT Verification)            │   │
│  │  ├─ Request Logging                              │   │
│  │  └─ Error Handling                               │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Routes Layer                         │   │
│  │  ├─ /api/auth (Authentication)                   │   │
│  │  ├─ /api/waste (Waste Management)                │   │
│  │  ├─ /api/dashboard (User Dashboard)              │   │
│  │  ├─ /api/tokens (Token Management)               │   │
│  │  ├─ /api/feedback (Feedback)                     │   │
│  │  └─ /api/admin (Admin Functions)                 │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Models/Controllers                   │   │
│  │  ├─ User Model & Controllers                     │   │
│  │  ├─ Bin Model & Controllers                      │   │
│  │  ├─ WasteLog Model & Controllers                 │   │
│  │  ├─ Token Model & Controllers                    │   │
│  │  └─ Feedback Model & Controllers                 │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                        ▼ MongoDB Driver
┌─────────────────────────────────────────────────────────┐
│                   Data Layer                            │
│              MongoDB Database                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Collections:                                    │   │
│  │  ├─ users (User accounts & profiles)             │   │
│  │  ├─ bins (Smart bin locations & status)          │   │
│  │  ├─ wastelogs (Disposal activity records)        │   │
│  │  ├─ tokens (Token/reward tracking)               │   │
│  │  └─ feedback (User feedback entries)             │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Project Structure

```
ecobin-main/
│
├── README.md                          # This file
├── package.json                       # Root package configuration
│
├── client/                            # React Frontend Application
│   ├── package.json                   # Frontend dependencies
│   ├── vite.config.js                 # Vite configuration
│   ├── tailwind.config.js             # Tailwind CSS configuration
│   ├── postcss.config.js              # PostCSS configuration
│   ├── index.html                     # HTML entry point
│   │
│   └── src/
│       ├── main.jsx                   # React DOM render entry
│       ├── index.css                  # Global styles
│       ├── output.css                 # Compiled Tailwind styles
│       ├── App.jsx                    # Root App component
│       ├── api.js                     # API client for HTTP requests
│       │
│       ├── components/
│       │   └── Navbar.jsx             # Navigation component
│       │
│       ├── context/
│       │   └── AuthContext.jsx        # Authentication state management
│       │
│       └── pages/
│           ├── Auth.jsx               # Login/Registration page
│           ├── Landing.jsx            # Home/Landing page
│           ├── UserDashboard.jsx      # User dashboard
│           ├── AdminDashboard.jsx     # Admin dashboard
│           ├── AdminUsers.jsx         # User management page
│           ├── AdminBins.jsx          # Bin management page
│           ├── AddWaste.jsx           # Add waste entry page
│           └── Wallet.jsx             # Wallet/tokens page
│
└── server/                            # Node.js Backend Application
    ├── package.json                   # Backend dependencies
    ├── index.js                       # Express server entry point
    ├── seed.js                        # Database seeding script
    │
    ├── middleware/
    │   └── auth.js                    # JWT authentication middleware
    │
    ├── models/
    │   ├── User.js                    # User schema and model
    │   ├── Bin.js                     # Smart bin schema and model
    │   ├── WasteLog.js                # Waste activity schema and model
    │   ├── Token.js                   # Token/reward schema and model
    │   └── Feedback.js                # Feedback schema and model
    │
    └── routes/
        ├── auth.js                    # Authentication endpoints
        ├── dashboard.js               # User dashboard endpoints
        ├── waste.js                   # Waste management endpoints
        ├── tokens.js                  # Token management endpoints
        ├── feedback.js                # Feedback endpoints
        └── admin.js                   # Admin management endpoints
```

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (v6.0.0 or higher) - Comes with Node.js
- **MongoDB** (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
  - Or use MongoDB Atlas (cloud database): [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download here](https://git-scm.com/)
- **Text Editor/IDE** - VS Code recommended: [Download here](https://code.visualstudio.com/)

### Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB (if local installation)
mongod --version
```

## Installation Guide

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/ecobin-main.git

# Navigate to project directory
cd ecobin-main
```

### Step 2: Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Verify installation
ls node_modules
```

### Step 3: Frontend Setup

```bash
# From ecobin-main root directory
cd client

# Install dependencies
npm install

# Verify installation
ls node_modules
```

### Step 4: Database Setup

#### Option A: Using MongoDB Atlas (Cloud - Recommended)

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Generate a connection string
5. Store it for use in environment variables

#### Option B: Using Local MongoDB

```bash
# Start MongoDB server (Windows)
mongod

# Or on macOS
brew services start mongodb-community

# Or on Linux
sudo systemctl start mongod
```

## Configuration

### Backend Environment Variables

Create a `.env` file in the `server/` directory:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecobin?retryWrites=true&w=majority
# Or for local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/ecobin

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Optional: Logging
LOG_LEVEL=debug
```

### Frontend Environment Variables

Create a `.env` file in the `client/` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_API_TIMEOUT=10000

# Environment
VITE_ENV=development
```

### Detailed Configuration Options

#### JWT_SECRET
- **Purpose**: Encrypts and validates JWT tokens
- **Security**: Must be a strong, random string
- **Generation**: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- **Production**: Change for every deployment

#### MONGODB_URI
- **Local**: `mongodb://localhost:27017/ecobin`
- **Atlas**: `mongodb+srv://user:pass@cluster.mongodb.net/dbname`
- **Replica Set**: `mongodb://host1,host2,host3/dbname?replicaSet=rs0`

#### PORT
- **Default**: 5000
- **Range**: 1024-65535 (avoid system ports 1-1023)
- **Common**: 3000, 5000, 8000, 8080

## Running the Application

### Development Mode

#### Terminal 1: Start Backend Server

```bash
cd server
npm install
npm start
# Server should be running on http://localhost:5000
```

#### Terminal 2: Start Frontend Development Server

```bash
cd client
npm install
npm run dev
# Frontend should be running on http://localhost:5173
```

#### Access Application
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000/api](http://localhost:5000/api)

### Production Mode

```bash
# Backend
cd server
NODE_ENV=production npm start

# Frontend (Build first)
cd client
npm run build
npm run preview
```

### Using Nodemon for Auto-reload (Development)

The server should already be configured with nodemon. If not:

```bash
# Install nodemon globally
npm install -g nodemon

# Run with nodemon
nodemon server/index.js
```

### Database Seeding (Optional)

To populate the database with sample data:

```bash
cd server
node seed.js
```

## API Documentation

### Base URL
```
Development: http://localhost:5000/api
Production: https://your-domain.com/api
```

### Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {}
}
```

Error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "ERROR_CODE"
}
```

### Authentication Endpoints

#### Register User
```
POST /auth/register

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "location": "New York, NY"
}

Response: 201 Created
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "userId": "60d5ec49c1234567890abcde",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login User
```
POST /auth/login

Request Body:
{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "60d5ec49c1234567890abcde",
    "email": "john@example.com",
    "role": "user",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Refresh Token
```
POST /auth/refresh-token

Headers:
Authorization: Bearer <your_jwt_token>

Response: 200 OK
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Waste Management Endpoints

#### Get Waste Logs
```
GET /waste

Query Parameters:
- userId: Filter by user ID
- startDate: Filter by start date (YYYY-MM-DD)
- endDate: Filter by end date (YYYY-MM-DD)
- type: Filter by waste type
- page: Page number (default: 1)
- limit: Results per page (default: 10)

Headers:
Authorization: Bearer <your_jwt_token>

Response: 200 OK
{
  "success": true,
  "data": {
    "logs": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25
    }
  }
}
```

#### Add Waste Log
```
POST /waste

Headers:
Authorization: Bearer <your_jwt_token>

Request Body:
{
  "binId": "60d5ec49c1234567890abcde",
  "wasteType": "plastic",
  "quantity": 2.5,
  "unit": "kg",
  "description": "Plastic bottles",
  "timestamp": "2024-05-02T10:30:00Z"
}

Response: 201 Created
{
  "success": true,
  "message": "Waste log created successfully",
  "data": {
    "logId": "60d5ec49c1234567890abcde",
    "earnedTokens": 10,
    "totalTokens": 150
  }
}
```

#### Get Single Waste Log
```
GET /waste/:id

Headers:
Authorization: Bearer <your_jwt_token>

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "60d5ec49c1234567890abcde",
    "userId": "60d5ec49c1234567890abcde",
    "binId": "60d5ec49c1234567890abcde",
    "wasteType": "plastic",
    "quantity": 2.5,
    "unit": "kg",
    "earnedTokens": 10,
    "timestamp": "2024-05-02T10:30:00Z"
  }
}
```

#### Update Waste Log
```
PUT /waste/:id

Headers:
Authorization: Bearer <your_jwt_token>

Request Body:
{
  "quantity": 3.0,
  "description": "Updated description"
}

Response: 200 OK
```

#### Delete Waste Log
```
DELETE /waste/:id

Headers:
Authorization: Bearer <your_jwt_token>

Response: 200 OK
{
  "success": true,
  "message": "Waste log deleted successfully"
}
```

### Dashboard Endpoints

#### Get User Dashboard
```
GET /dashboard

Headers:
Authorization: Bearer <your_jwt_token>

Response: 200 OK
{
  "success": true,
  "data": {
    "totalWaste": 125.5,
    "totalTokens": 250,
    "wasteThisMonth": 42.3,
    "recentLogs": [...],
    "contributions": {
      "plastic": 45.2,
      "organic": 35.1,
      "paper": 45.2
    },
    "rank": 15,
    "achievements": [...]
  }
}
```

#### Get Admin Dashboard
```
GET /dashboard/admin

Headers:
Authorization: Bearer <admin_jwt_token>

Response: 200 OK
{
  "success": true,
  "data": {
    "totalUsers": 1250,
    "totalBins": 85,
    "totalWaste": 15432.5,
    "tokensDistributed": 45230,
    "activeUsers": 342,
    "binUtilization": 78.5,
    "charts": {
      "dailyWaste": [...],
      "weeklyUsers": [...],
      "tokenTrends": [...]
    }
  }
}
```

### Bin Management Endpoints

#### Get All Bins
```
GET /admin/bins

Query Parameters:
- location: Filter by location
- status: Filter by status (active, inactive, maintenance)
- capacity: Filter by capacity (min-max)

Headers:
Authorization: Bearer <admin_jwt_token>

Response: 200 OK
{
  "success": true,
  "data": {
    "bins": [
      {
        "id": "60d5ec49c1234567890abcde",
        "location": "Central Park",
        "coordinates": {
          "latitude": 40.7829,
          "longitude": -73.9654
        },
        "capacity": 150,
        "currentLevel": 87,
        "status": "active",
        "wasteType": "mixed",
        "lastEmptied": "2024-05-01T08:00:00Z"
      }
    ],
    "total": 85
  }
}
```

#### Create Bin
```
POST /admin/bins

Headers:
Authorization: Bearer <admin_jwt_token>

Request Body:
{
  "location": "Central Park",
  "coordinates": {
    "latitude": 40.7829,
    "longitude": -73.9654
  },
  "capacity": 150,
  "wasteType": "mixed",
  "installDate": "2024-05-02"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "60d5ec49c1234567890abcde",
    "location": "Central Park",
    "status": "active"
  }
}
```

#### Update Bin
```
PUT /admin/bins/:id

Headers:
Authorization: Bearer <admin_jwt_token>

Request Body:
{
  "capacity": 180,
  "status": "maintenance"
}

Response: 200 OK
```

#### Delete Bin
```
DELETE /admin/bins/:id

Headers:
Authorization: Bearer <admin_jwt_token>

Response: 200 OK
```

### Token Management Endpoints

#### Get User Tokens
```
GET /tokens

Headers:
Authorization: Bearer <your_jwt_token>

Response: 200 OK
{
  "success": true,
  "data": {
    "balance": 250,
    "earned": 450,
    "spent": 200,
    "transactions": [
      {
        "id": "60d5ec49c1234567890abcde",
        "type": "earned",
        "amount": 10,
        "source": "waste_log",
        "date": "2024-05-02T10:30:00Z"
      }
    ]
  }
}
```

#### Redeem Tokens
```
POST /tokens/redeem

Headers:
Authorization: Bearer <your_jwt_token>

Request Body:
{
  "amount": 50,
  "rewardType": "voucher",
  "rewardId": "60d5ec49c1234567890abcde"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "remainingBalance": 200,
    "redemptionId": "60d5ec49c1234567890abcde"
  }
}
```

### Feedback Endpoints

#### Get Feedback
```
GET /feedback

Query Parameters:
- status: Filter by status (open, closed, resolved)
- type: Filter by type (bug, suggestion, complaint)

Headers:
Authorization: Bearer <your_jwt_token>

Response: 200 OK
{
  "success": true,
  "data": {
    "feedback": [...],
    "total": 25
  }
}
```

#### Submit Feedback
```
POST /feedback

Headers:
Authorization: Bearer <your_jwt_token>

Request Body:
{
  "type": "suggestion",
  "subject": "Add more bins in downtown",
  "message": "The downtown area needs more waste collection points",
  "rating": 4,
  "binId": "60d5ec49c1234567890abcde"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "feedbackId": "60d5ec49c1234567890abcde",
    "status": "open"
  }
}
```

#### Get Feedback Details
```
GET /feedback/:id

Headers:
Authorization: Bearer <your_jwt_token>

Response: 200 OK
```

#### Reply to Feedback (Admin)
```
POST /feedback/:id/reply

Headers:
Authorization: Bearer <admin_jwt_token>

Request Body:
{
  "reply": "We're investigating this issue. Thank you for reporting!"
}

Response: 200 OK
```

### User Management Endpoints

#### Get All Users (Admin)
```
GET /admin/users

Query Parameters:
- role: Filter by role (user, admin)
- status: Filter by status (active, inactive)
- joinDate: Filter by join date

Headers:
Authorization: Bearer <admin_jwt_token>

Response: 200 OK
{
  "success": true,
  "data": {
    "users": [...],
    "total": 1250,
    "pagination": {
      "page": 1,
      "limit": 10,
      "pages": 125
    }
  }
}
```

#### Get User Details (Admin)
```
GET /admin/users/:id

Headers:
Authorization: Bearer <admin_jwt_token>

Response: 200 OK
{
  "success": true,
  "data": {
    "id": "60d5ec49c1234567890abcde",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "status": "active",
    "joinDate": "2024-01-15",
    "totalContributions": 125.5,
    "totalTokens": 250,
    "lastActivity": "2024-05-02T10:30:00Z",
    "activities": [...]
  }
}
```

#### Update User (Admin)
```
PUT /admin/users/:id

Headers:
Authorization: Bearer <admin_jwt_token>

Request Body:
{
  "role": "admin",
  "status": "active"
}

Response: 200 OK
```

#### Delete User (Admin)
```
DELETE /admin/users/:id

Headers:
Authorization: Bearer <admin_jwt_token>

Response: 200 OK
```

## Database Schema

### User Model

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  status: String (enum: ['active', 'inactive', 'suspended'], default: 'active'),
  profile: {
    phone: String,
    avatar: String (URL),
    bio: String,
    location: String,
    preferences: {
      emailNotifications: Boolean,
      pushNotifications: Boolean,
      newsletter: Boolean
    }
  },
  stats: {
    totalContributions: Number (default: 0),
    totalTokens: Number (default: 0),
    totalBins: Number (default: 0),
    joinDate: Date (default: now),
    lastActivityDate: Date
  },
  badges: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Bin Model

```javascript
{
  _id: ObjectId,
  location: String (required),
  address: String,
  coordinates: {
    latitude: Number (required),
    longitude: Number (required)
  },
  capacity: Number (required, in kg),
  currentLevel: Number (default: 0),
  wasteType: String (enum: ['plastic', 'organic', 'paper', 'mixed']),
  status: String (enum: ['active', 'inactive', 'maintenance'], default: 'active'),
  lastEmptied: Date,
  nextScheduledEmptying: Date,
  installDate: Date,
  QRCode: String (URL),
  sensors: {
    levelSensor: Boolean,
    temperatureSensor: Boolean,
    cameraSensor: Boolean
  },
  stats: {
    totalWaste: Number (default: 0),
    timesEmptied: Number (default: 0),
    averageUsagePerDay: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### WasteLog Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User, required),
  binId: ObjectId (reference to Bin, required),
  wasteType: String (enum: ['plastic', 'organic', 'paper', 'metal', 'glass']),
  quantity: Number (required),
  unit: String (enum: ['kg', 'liter', 'piece'], default: 'kg'),
  earnedTokens: Number,
  description: String,
  photo: String (URL, optional),
  timestamp: Date (default: now),
  verified: Boolean (default: false),
  verifiedBy: ObjectId (reference to User, optional),
  carbon_offset: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Token Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User, required),
  balance: Number (default: 0),
  earned: Number (default: 0),
  spent: Number (default: 0),
  history: [{
    type: String (enum: ['earned', 'spent', 'redeemed']),
    amount: Number,
    source: String,
    date: Date,
    description: String
  }],
  transactions: [ObjectId] (reference to Transaction),
  expirationDate: Date,
  lastUpdated: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Feedback Model

```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User, required),
  binId: ObjectId (reference to Bin, optional),
  type: String (enum: ['bug', 'suggestion', 'complaint', 'praise']),
  subject: String (required),
  message: String (required),
  rating: Number (1-5),
  attachments: [String] (URLs),
  status: String (enum: ['open', 'in-review', 'resolved', 'closed'], default: 'open'),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  adminReply: {
    message: String,
    repliedBy: ObjectId,
    repliedAt: Date
  },
  tags: [String],
  createdAt: Date,
  updatedAt: Date,
  resolvedAt: Date
}
```

## User Guide

### Getting Started as a User

#### 1. Registration
1. Click "Register" on the landing page
2. Enter your name, email, and password
3. Confirm your email (if required)
4. Complete your profile (optional)
5. Accept terms and conditions
6. Click "Create Account"

#### 2. First Steps
1. Update your profile picture and bio
2. Set notification preferences
3. Allow location access for bin discovery
4. Join any community challenges (if available)

#### 3. Logging Waste

**To log a waste disposal:**
1. Click "Add Waste" in the sidebar
2. Select or scan a bin's QR code
3. Choose waste type (plastic, organic, paper, etc.)
4. Enter quantity and unit
5. Optionally add a photo
6. Submit

**Earning tokens:**
- Plastic: 2 tokens per kg
- Organic: 1 token per kg
- Paper: 1.5 tokens per kg
- Metal/Glass: 3 tokens per kg

#### 4. Finding Bins
1. Go to "Dashboard"
2. Click "Find Nearby Bins"
3. View bins on the map
4. See capacity, distance, and status
5. Get directions (opens in your maps app)

#### 5. Checking Your Wallet
1. Click "Wallet" in the sidebar
2. View your balance and transaction history
3. See token earning rate
4. Redeem tokens for rewards (when available)

#### 6. Providing Feedback
1. Click "Feedback" option
2. Select feedback type (bug, suggestion, complaint)
3. Describe your issue or suggestion
4. Rate your experience (1-5 stars)
5. Optionally attach a photo
6. Submit

### Tips for Maximum Engagement
- Log waste regularly for consistent token earnings
- Complete all profile information for better recommendations
- Participate in community challenges
- Share your achievements on social media
- Invite friends for referral bonuses

## Admin Guide

### Accessing Admin Dashboard

1. Login with an admin account
2. Click "Admin Panel" in the sidebar
3. You now have access to all admin functions

### Dashboard Overview

The admin dashboard displays:
- **System Statistics**: Total users, bins, waste collected
- **Charts**: Daily waste trends, user growth, token distribution
- **Alerts**: System issues, maintenance notifications
- **Quick Actions**: Add bin, manage users, view reports

### User Management

#### View Users
1. Go to "Users" section
2. See all registered users
3. Filter by status, role, or join date
4. Click on user to view detailed profile

#### User Details Include:
- Personal information
- Contribution statistics
- Token balance
- Activity history
- Assigned badges
- Account status

#### Manage User Account
1. Click on user in the list
2. Edit user details (name, email, location)
3. Change user role (user/admin)
4. Suspend or activate account
5. View and delete if necessary

#### Moderator Actions
- Suspend users for inappropriate behavior
- Reset passwords
- View login history
- Monitor suspicious activity

### Bin Management

#### Add New Bin
1. Go to "Bins" section
2. Click "Add New Bin"
3. Enter location details:
   - Address and coordinates
   - Capacity in kg
   - Waste type
4. Configure sensors (optional)
5. Set maintenance schedule
6. Generate QR code
7. Save

#### Monitor Bins
1. View all bins on map
2. See real-time capacity levels
3. Check last emptied date
4. View maintenance schedule
5. Monitor sensor data

#### Bin Maintenance
1. Schedule emptying
2. Mark for maintenance
3. Update status
4. Receive alerts when near capacity
5. View usage patterns

#### Bin Analytics
- Capacity trends
- Usage frequency
- Waste type distribution
- Peak usage times
- Revenue per bin

### Token Management

#### Configure Reward Rates
1. Go to "Token Settings"
2. Set earning rates per waste type
3. Set token expiration period
4. Configure conversion rates
5. Create promotional offers

#### Monitor Distribution
- Total tokens distributed
- Average tokens per user
- Token redemption rate
- Unused tokens expiring soon

#### Create Campaigns
1. Set campaign goal
2. Choose reward
3. Set token bonus
4. Set time period
5. Track participation

### Feedback Management

#### Review Feedback
1. Go to "Feedback" section
2. View all submitted feedback
3. Filter by type, status, priority
4. Sort by date or rating

#### Response Workflow
1. Click on feedback entry
2. Read user comment
3. Click "Reply"
4. Type your response
5. Add any attachments
6. Mark as "Resolved" or "Closed"

#### Analysis
- Identify common issues
- Track resolution time
- Monitor user satisfaction
- Generate feedback reports

### Reports and Analytics

#### Available Reports
- **User Report**: Growth, engagement, retention
- **Waste Report**: Collection data, patterns, trends
- **Financial Report**: Token distribution, costs
- **System Report**: Performance, issues, uptime

#### Export Data
1. Navigate to report section
2. Select date range
3. Choose format (CSV, PDF, Excel)
4. Download or email

### System Settings

#### Configure Application
- Email settings
- Notification preferences
- Token conversion rates
- Maintenance schedules
- Backup settings

#### Security
- View login attempts
- Manage API keys
- Configure two-factor authentication
- Review audit logs

## Development Guide

### Project Setup for Development

```bash
# Clone and setup
git clone <repo-url>
cd ecobin-main

# Install all dependencies
npm install

# Setup environment
echo "Copy .env.example to .env and configure"
```

### Code Structure and Conventions

#### Frontend Structure
```
src/
├── components/       # Reusable components
├── pages/           # Page-level components
├── context/         # State management
├── api.js           # API integration
└── App.jsx          # Root component
```

#### Backend Structure
```
server/
├── routes/          # API endpoints
├── models/          # Database schemas
├── middleware/      # Custom middleware
└── index.js         # App entry point
```

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "Add new feature"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/new-feature
   ```

### Testing

```bash
# Backend testing (if configured)
cd server
npm test

# Frontend testing (if configured)
cd client
npm test
```

### Code Quality

#### ESLint (if configured)
```bash
npm run lint
npm run lint:fix
```

#### Code Formatting
```bash
npm run format
```

### Common Development Tasks

#### Add New API Endpoint

1. Create route handler in `server/routes/`
2. Define request/response schema
3. Add middleware if needed
4. Document in API docs
5. Test with API client (Postman, etc.)

#### Add New Page Component

1. Create component in `client/src/pages/`
2. Add route to App.jsx
3. Add navigation link if needed
4. Style with Tailwind CSS
5. Test in development

#### Modify Database Schema

1. Update model in `server/models/`
2. Create migration if needed
3. Update validation
4. Update API responses
5. Test with sample data

### Debugging

#### Backend Debugging
```bash
# Run with inspector
node --inspect server/index.js

# Open in Chrome: chrome://inspect
```

#### Frontend Debugging
- Use React DevTools extension
- Chrome DevTools for DOM/Network
- Console for JavaScript errors

#### Database Debugging
```bash
# Connect to MongoDB
mongosh

# List databases
show dbs

# Use ecobin database
use ecobin

# View collections
show collections

# Query data
db.users.findOne()
```

## Deployment

### Prerequisites for Deployment
- Server hosting (Heroku, AWS, DigitalOcean, etc.)
- MongoDB Atlas account (cloud database)
- Domain name (optional)
- SSL certificate (recommended)

### Heroku Deployment

#### Backend Deployment

1. **Prepare repository**
   ```bash
   # Create Procfile in server/
   echo "web: node index.js" > server/Procfile
   ```

2. **Deploy**
   ```bash
   heroku login
   heroku create your-app-name
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set MONGODB_URI=your_mongodb_uri
   git push heroku main
   ```

3. **View logs**
   ```bash
   heroku logs --tail
   ```

#### Frontend Deployment

1. **Build**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify or Vercel**
   - Push to GitHub
   - Connect repository to Netlify/Vercel
   - Set build command: `npm run build`
   - Set output directory: `dist`

### AWS Deployment

#### EC2 Instance Setup
1. Create EC2 instance
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies
5. Configure environment variables
6. Setup PM2 for process management

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start server/index.js --name "ecobin-api"
pm2 startup
pm2 save
```

### Environment Variables for Production

```env
NODE_ENV=production
MONGODB_URI=<production_mongodb_uri>
JWT_SECRET=<production_secret>
PORT=80
CORS_ORIGIN=https://yourdomain.com
LOG_LEVEL=info
```

### SSL/HTTPS Configuration

1. Obtain SSL certificate (Let's Encrypt)
2. Configure with reverse proxy (Nginx)
3. Redirect HTTP to HTTPS
4. Set Strict-Transport-Security header

### Backup and Recovery

```bash
# MongoDB backup
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/ecobin" --out ./backup

# MongoDB restore
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net/ecobin" ./backup
```

## Troubleshooting

### Common Issues and Solutions

#### Issue: "Cannot find module 'express'"
**Solution:**
```bash
cd server
npm install
```

#### Issue: "MongoDB connection failed"
**Solution:**
1. Check MONGODB_URI in .env
2. Verify MongoDB is running
3. Check network access (if using Atlas)
4. Verify credentials

#### Issue: "CORS error when calling API"
**Solution:**
1. Verify CORS_ORIGIN in .env
2. Check frontend API_URL
3. Ensure backend is running
4. Check headers in request

#### Issue: "JWT token expired"
**Solution:**
1. Refresh token using /auth/refresh-token
2. Clear browser storage
3. Login again
4. Increase JWT_EXPIRE if needed

#### Issue: "Port 5000 already in use"
**Solution:**
```bash
# On Windows
netstat -ano | findstr :5000
taskkill /PID <pid> /F

# On macOS/Linux
lsof -i :5000
kill -9 <pid>
```

#### Issue: "Frontend not connecting to backend"
**Solution:**
1. Verify both servers are running
2. Check VITE_API_URL in frontend
3. Check CORS configuration
4. Verify backend port matches frontend config

### Performance Optimization

#### Database Indexing
```bash
# Create indexes for frequently queried fields
db.users.createIndex({ email: 1 })
db.waste_logs.createIndex({ userId: 1, timestamp: -1 })
db.bins.createIndex({ coordinates: "2dsphere" })
```

#### Caching
- Implement Redis for session caching
- Cache API responses
- Use CDN for static assets

#### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization
- Minify CSS and JavaScript
- Enable gzip compression

### Logging and Monitoring

#### Application Logs
```bash
# View logs in production
pm2 logs ecobin-api
```

#### Error Tracking
- Integrate Sentry for error tracking
- Setup email alerts for critical errors
- Monitor API response times

## FAQ

### General Questions

**Q: Is EcoBin free to use?**
A: Yes, EcoBin is free for all users. Tokens are earned through waste contributions.

**Q: How do I delete my account?**
A: Go to Settings → Account → Delete Account. Your data will be anonymized within 30 days.

**Q: Can I transfer my tokens to another user?**
A: Currently, tokens are non-transferable. They are earned personally through your contributions.

**Q: Is my personal data safe?**
A: Yes, we use industry-standard encryption and follow GDPR compliance. See our Privacy Policy.

### Technical Questions

**Q: What database does EcoBin use?**
A: MongoDB, a NoSQL document database perfect for flexible data structures.

**Q: Can I self-host EcoBin?**
A: Yes, EcoBin is open-source. You can clone and deploy on your own servers.

**Q: How often is the data updated?**
A: Real-time for most operations. Batch processes run every 6 hours.

**Q: What's the maximum file size for feedback attachments?**
A: 5MB per file, up to 3 files per feedback.

### Feature Questions

**Q: How many bins can I log to?**
A: Unlimited. You can log waste to any bin in the system.

**Q: What happens to tokens after expiration?**
A: Expired tokens are automatically removed. Set expiration in token settings.

**Q: Can admins create promotional campaigns?**
A: Yes, use the Campaigns section in Admin Dashboard.

**Q: Is there a mobile app?**
A: Not yet, but the web app is fully responsive and works great on mobile browsers.

### Account Questions

**Q: How do I become an admin?**
A: Contact the project maintainers with a request.

**Q: Can I have multiple accounts?**
A: Each person should have one account per email address.

**Q: What if I forgot my password?**
A: Click "Forgot Password" on the login page and follow the email instructions.

## Contributing

We welcome contributions from the community! Here's how to get involved:

### Types of Contributions

- **Bug Reports** - Found a bug? Report it in Issues
- **Feature Requests** - Have an idea? Suggest it in Discussions
- **Code Contributions** - Submit pull requests
- **Documentation** - Help improve our docs
- **Translations** - Help translate to other languages

### Contribution Process

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/ecobin-main.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow code style guidelines
   - Write clear commit messages
   - Add comments for complex logic

4. **Test your changes**
   ```bash
   npm test
   npm run lint
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request**
   - Describe changes clearly
   - Reference any related issues
   - Add screenshots if UI changes

### Code Style Guidelines

- Use consistent indentation (2 spaces)
- Use meaningful variable names
- Write comments for complex logic
- Follow ESLint rules
- Format code with Prettier

### Commit Message Format

```
type: subject

body
```

Types: feat, fix, docs, style, refactor, test, chore

Example:
```
feat: add user profile page

- Add profile editing functionality
- Add profile picture upload
- Add preference settings
```

## License

This project is licensed under the **MIT License** - see below for details:

```
MIT License

Copyright (c) 2024 EcoBin Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Support and Contact

### Getting Help

- **GitHub Issues** - Report bugs and request features
- **GitHub Discussions** - Ask questions and discuss ideas
- **Email** - contact@ecobin.dev
- **Twitter** - @EcoBinApp

### Community Links

- [EcoBin Discord](https://discord.gg/ecobin)
- [EcoBin Website](https://ecobin.dev)
- [EcoBin Blog](https://blog.ecobin.dev)

### Contributing to Documentation

Help improve our documentation by:
- Reporting typos and errors
- Suggesting clarifications
- Adding examples
- Translating guides

---

## Additional Resources

### Learning Resources
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Tools and Libraries
- [Postman](https://www.postman.com/) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [VS Code](https://code.visualstudio.com/) - Editor
- [Git](https://git-scm.com/) - Version control

### Roadmap

**Coming Soon:**
- Mobile app (iOS and Android)
- Advanced analytics dashboard
- Gamification features
- Social sharing
- Integration with recycling centers
- AI-powered waste categorization
- Multi-language support

---

**Last Updated:** May 2, 2026

**Version:** 1.0.0

For the latest updates, visit our [GitHub repository](https://github.com/yourusername/ecobin-main)

