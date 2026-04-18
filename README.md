# 💰 PhonePe Backend Clone (MERN)

A backend system simulating core features of a digital payment app like
PhonePe.

Built using Node.js, Express, MongoDB with JWT authentication and
Swagger API documentation.

------------------------------------------------------------------------

## 🚀 Features

### 🔐 Authentication

-   User Registration
-   User Login (JWT based)
-   Protected Routes
-   Profile API

### 🔑 Security

-   Password hashing (bcrypt)
-   MPIN setup & update
-   JWT authentication middleware

### 💳 transactions System

-   Add Money
-   Send Money via UPI
-   Balance management

### 📜 Transactions

-   Transaction logging
-   Unique Transaction IDs
-   Transaction history (credit/debit)

### 📄 API Documentation

-   Swagger UI integrated
-   Test APIs directly from browser

------------------------------------------------------------------------

## 🛠️ Tech Stack

-   Node.js
-   Express.js
-   MongoDB + Mongoose
-   JWT (Authentication)
-   bcrypt.js (Hashing)
-   Swagger (API Docs)

------------------------------------------------------------------------

## 📂 Project Structure

phonepe-backend/ │ ├── src/ │ ├── config/ │ ├── controllers/ │ ├──
models/ │ ├── routes/ │ ├── middlewares/ │ └── swagger.js │ ├── .env ├──
.gitignore ├── package.json ├── server.js └── README.md

------------------------------------------------------------------------

## ⚙️ Setup Instructions

1.  Clone the repo\
    git clone https://github.com/your-username/your-repo.git

2.  Install dependencies\
    npm install

3.  Create `.env` file

PORT=3000\
MONGO_URI=your_mongodb_connection\
JWT_SECRET=your_secret_key

4.  Run server\
    npm run dev

------------------------------------------------------------------------

## 📌 API Endpoints

### Auth Routes

POST /api/auth/register\
POST /api/auth/login\
POST /api/auth/set-mpin\
POST /api/auth/update-mpin\
GET /api/auth/profile

### Transactions Routes

POST /api/transactions/add-money\
POST /api/transactions/send-money\
GET /api/transactions/history

------------------------------------------------------------------------

## 📖 Swagger API Docs

http://localhost:3000/api-docs

------------------------------------------------------------------------

## ⚠️ Important Notes

-   This is a learning project, not production-ready
-   No payment gateway integration
-   No atomic transactions yet

------------------------------------------------------------------------

## 🚀 Future Improvements

-   Atomic transactions
-   Rate limiting
-   Pagination & filters
-   Payment gateway integration

------------------------------------------------------------------------

## 👨‍💻 Author

Harshit
