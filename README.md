# 🛒 FreshMart — Full-Stack Departmental Store

FreshMart is a modern full-stack departmental store web application that allows users to browse grocery products, manage their cart and wishlist, place orders, and track order status. It also includes a secure admin panel for managing products and customer orders.

The project is built with a React frontend, Node.js/Express backend, and MongoDB database.

---

## ✨ Features

### 👤 User Features

* User registration and login
* JWT-based authentication
* Protected checkout and order routes
* Browse grocery products
* Product details page
* Product search
* Category-based browsing
* Shopping cart
* Wishlist
* Quantity management
* Responsive design
* Order placement
* Cash on Delivery and online payment selection
* Delivery charge calculation
* Discount calculation
* My Orders section
* Individual order details
* Order status tracking

### 📦 Order & Checkout

FreshMart provides a complete checkout flow with:

* Customer contact information
* Delivery address
* Payment method selection
* Order summary
* Subtotal calculation
* Delivery charge calculation
* Discount calculation
* Final payable amount

#### Delivery Charges

* Orders below ₹500 → ₹40 delivery charge
* Orders of ₹500 or above → Free delivery

#### Discount

* Orders of ₹1000 or above receive a 10% discount

---

## 👑 Admin Panel

The application includes a protected admin panel for managing the store.

### Admin Dashboard

* Admin-only access
* Dashboard overview
* Product management
* Order management

### Product Management

Admins can:

* Add products
* Edit products
* Delete products
* View product information
* Manage price and old price
* Manage category
* Manage stock
* Manage delivery information
* Manage product images
* Manage product descriptions

### Order Management

Admins can:

* View customer orders
* View individual order details
* View customer information
* View ordered products
* Update order status
* Monitor payment status

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router DOM
* Tailwind CSS
* Lucide React
* JavaScript (ES6+)

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication
* Mongoose

### Database

* MongoDB

### Development & Deployment

* Git
* GitHub
* VS Code
* Postman
* Vercel — Frontend
* Render — Backend

---

## 🏗️ Project Structure

```text
freshmart-departmental-store/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── clservices/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── ...
│
└── README.md
```

---

## 🔐 Authentication

FreshMart uses JWT-based authentication to secure user and admin functionality.

Authentication includes:

* User registration
* User login
* JWT token generation
* Protected routes
* Admin authorization
* Token-based API requests

Users can access their orders and checkout only after authentication.

Admin routes are protected separately to prevent regular users from accessing administrative functionality.

---

## 🔄 Application Flow

```text
User
  │
  ├── Register / Login
  │
  ├── Browse Products
  │       │
  │       ├── Product Details
  │       └── Add to Cart / Wishlist
  │
  ├── Cart
  │       │
  │       └── Checkout
  │               │
  │               ├── Address
  │               ├── Payment Method
  │               └── Order Summary
  │
  └── Place Order
          │
          ▼
       Backend API
          │
          ▼
       MongoDB
          │
          ▼
      Order Created
          │
          ├── My Orders
          └── Order Tracking
```

---

## 🧮 Order Calculation

The checkout system calculates the final amount using:

```text
Subtotal
   +
Delivery Charges
   -
Discount
   =
Total Payable
```

For example:

```text
Product Total:       ₹300
Delivery Charges:    ₹40
Discount:             ₹0
--------------------------
Total Payable:       ₹340
```

For an order of ₹500 or more:

```text
Product Total:       ₹600
Delivery Charges:    FREE
Discount:             ₹0
--------------------------
Total Payable:       ₹600
```

---

## 📡 API Overview

The backend provides REST APIs for major application functionality.

### Authentication

```text
POST /api/users/register
POST /api/users/login
```

### Products

```text
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

### Orders

```text
POST /api/orders
GET  /api/orders/my-orders
GET  /api/orders/:id
```

Admin order management provides additional protected endpoints for viewing and managing customer orders.

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash

git clone <https://github.com/Priyasaini16/freshmart-departmental-store.git>
cd freshmart-departmental-store
```

## 🌐 Live Demo

[Visit FreshMart Live Website](https://freshmart-departmental-store-1tsu-priyasaini16s-projects.vercel.app)

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the server directory.

Add the required configuration such as:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit real credentials or secrets to GitHub.

### 5. Start the backend

```bash
npm run dev
```

### 6. Start the frontend

Inside the client directory:

```bash
npm run dev
```

The application can then be accessed through the local Vite development URL shown in the terminal.

---

## 🌐 Deployment

The project is deployed as a full-stack application:

```text
React Frontend
      │
      ▼
   Vercel
      │
      ▼
Express REST API
      │
      ▼
   Render
      │
      ▼
   MongoDB
```

---

## 🔒 Security Considerations

* Passwords are handled through backend authentication.
* JWT tokens are used for authenticated API requests.
* Protected routes restrict unauthorized access.
* Admin routes require admin authorization.
* Database credentials and secrets should be stored in environment variables.
* Sensitive configuration should never be committed to GitHub.

---

## 📱 Responsive Design

FreshMart is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile devices

The interface uses responsive Tailwind CSS utilities to adapt layouts to different screen sizes.

---

## 🎯 Project Goals

The main goals of FreshMart are to:

* Build a complete full-stack e-commerce application
* Implement secure authentication and authorization
* Create RESTful backend APIs
* Work with MongoDB and Mongoose
* Build a responsive React interface
* Implement real-world cart and order functionality
* Create an administrative management system
* Deploy a production-ready web application

---

## 🔮 Future Improvements

Possible future enhancements include:

* Online payment gateway integration
* Product image upload
* Advanced product filtering
* Customer reviews and ratings
* Email order notifications
* Inventory alerts
* Sales analytics
* Advanced admin dashboard charts

---

## 👩‍💻 Author

**Priya Saini**

B.Tech Computer Science Engineering

FreshMart was developed as a full-stack web development project demonstrating frontend, backend, database, authentication, API development, and deployment skills.

---

## 📄 License

This project is intended for educational and portfolio purposes.
