# 💰 PhonePe Backend Clone (MERN)

A scalable backend system simulating core features of a digital payment app like **PhonePe**.

Built with **Node.js, Express, MongoDB, JWT authentication**, and **Swagger API documentation**.

---

## 🚀 API Documentation

👉 [https://phonepe-backend-w8dg.onrender.com/api-docs](https://phonepe-backend-w8dg.onrender.com/api-docs)

---

## ✨ Features

### 🔐 Authentication

- User Registration & Login
- JWT-based Authentication
- Protected Routes
- User Profile API

### 🔑 Security

- Password hashing using bcrypt
- MPIN setup & update
- Secure authentication middleware

### 💳 Transactions System

- Add Money to wallet
- Send Money via UPI ID
- Balance tracking
- Prevent self-transfer
- MPIN validation before transaction

### 📜 Transaction Management

- Transaction history (credit/debit)
- Sender & receiver tracking
- Status handling (success/failed)

### 📄 API Documentation

- Swagger UI integration
- Interactive API testing

---

## 🛠️ Tech Stack

| Technology | Purpose           |
| ---------- | ----------------- |
| Node.js    | Backend runtime   |
| Express.js | API framework     |
| MongoDB    | Database          |
| Mongoose   | ODM               |
| JWT        | Authentication    |
| bcrypt.js  | Password security |
| Swagger    | API documentation |

---

## 📂 Project Structure

```
phonepe-backend/
│
├── src/
│   ├── config/        # Database connection
│   ├── controllers/   # Business logic
│   ├── models/        # Schemas
│   ├── routes/        # API routes
│   ├── middlewares/   # Auth middleware
│   └── swagger.js     # Swagger config
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/harshit-software/phonepe-backend.git
cd phonepe-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Run server
```bash
npm run dev
```

---

## 📌 API Endpoints

### 🔐 Auth Routes
- POST   `/api/auth/register`
- POST   `/api/auth/login`
- POST   `/api/auth/set-mpin`
- POST   `/api/auth/update-mpin`
- GET    `/api/auth/profile`

### 💳 Transaction Routes
- POST   `/api/transactions/add-money`
- POST   `/api/transactions/send-money`
- GET    `/api/transactions/history`

---

## 🔒 Authentication

Protected routes require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

## ⚠️ Limitations

- No real payment gateway integration
- Transactions are not atomic (risk of inconsistency)
- No rate limiting or fraud detection

---

## 🚀 Future Improvements

- Atomic transactions using MongoDB sessions
- Pagination & filtering for history
- Rate limiting & security enhancements
- Notifications (Email/SMS)
- Payment gateway integration

---

## 🧠 What This Project Demonstrates

- REST API design
- Secure authentication system
- Backend architecture
- Fintech logic implementation

---

## 👨‍💻 Author

**Harshit Agrawal**

- 💼 Backend Developer (Node.js | MongoDB)
- 📧 Email: harshit.agr.1511@gmail.com
- 🔗 GitHub: https://github.com/harshit-software
- 🔗 LinkedIn: https://linkedin.com/in/harshit-software

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.