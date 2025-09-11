# E-Commerce Web App

A simple **E-commerce web application** with JWT authentication, item CRUD operations, and persistent user cart. Built with **MERN stack** (MongoDB, Express.js, React, Node.js).

---

## Table of Contents

- [Features](#features)  
- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)    
- [API Endpoints](#api-endpoints) 
- [Future Improvements](#future-improvements)  
- [Repository](#repository)
- [Live Url](#live)

---

## Features

- User authentication (register/login) with JWT  
- CRUD operations for items  
- Persistent per-user cart  
- Filtering, sorting, and pagination for items  
- Backend and frontend setup with single command using concurrently

---

## Getting Started

1. Clone the repository:  
   ```bash
   git clone https://github.com/Mohdsohail7/E-Commerce-Web-App.git
   ```
   cd E-Commerce-Web-App

2. Copy .env.example to .env and fill in your values:
```bash
cp backend/.env
cp frontend/.env
```

3. Install dependencies for both backend and frontend:
```bash
npm install --prefix backend
npm install --prefix frontend
```
4. Run the app (backend + frontend concurrently):
```bash
npm run dev or npm start
```
Backend runs on: http://localhost:4000
Frontend runs on: http://localhost:3000 

## Environment Variables
Backend (backend/.env) example:
```bash
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Frontend (frontend/.env) example:
```bash
REACT_APP_API_URL=http://localhost:4000/api
```
## API Endpoints
Auth
POST /api/auth/register
Request: { name, email, password }

POST /api/auth/login
Request: { email, password }

GET /api/auth/me (protected)
Returns current logged-in user info

Items
Query parameters:
```bash
category, minPrice, maxPrice, search, sort, page, limit
```
GET /api/items/:id

POST /api/items (protected)
Request: { name, price, category, description, image, stock }

PUT /api/items/:id (protected)

DELETE /api/items/:id (protected)

Cart (all protected)
GET /api/cart

POST /api/cart { itemId, quantity }

PUT /api/cart { itemId, quantity }

DELETE /api/cart/:itemId

DELETE /api/cart (clear cart)


## Future Improvements
Rate limiting to prevent abuse

Improved error handling & logging

Unit & integration testing

## Repository
https://github.com/Mohdsohail7/E-Commerce-Web-App

## Live Url
https://e-commerce-web-app-1zry.vercel.app


🤝 Contributing If you want to contribute or add new features, feel free to submit a pull request! 😊

If you like this project, don't forget to give it a ⭐! 😃

🛡️ License

This project is licensed under the MIT License.