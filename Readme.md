# 🚗 Vehicle Rental System – Backend API

A complete backend system for managing vehicle rentals with authentication, user roles, vehicle inventory, and booking management.
Built using **Node.js**, **Express.js**, **TypeScript**, and **PostgreSQL**.

---

## 🌐 Live Deployment

**Live API URL:** [https://l-2-a-6.vercel.app]
**GitHub Repository:** [https://github.com/abdulmazidakash/l-2-A-6]

---

## 📌 Features

### 🔐 Authentication

* User registration & login
* JWT-based secure authentication
* Password hashing using bcrypt

### 👤 User Management

* Role-based access (`admin`, `customer`)
* Admin can manage all users
* Customers can update own profile
* Prevent deletion if user has active bookings

### 🚗 Vehicle Management

* Add, update, delete vehicles (Admin only)
* Vehicle availability tracking
* Prevent deletion if vehicle has active bookings
* Public access to view all vehicles

### 📅 Booking System

* Create vehicle bookings
* Automatic total price calculation
* Role-based booking view
* Cancel bookings before start date
* Admin marking vehicle as returned
* Auto-return logic based on dates

---

## 🛠️ Technology Stack

* **Node.js**
* **Express.js**
* **TypeScript**
* **PostgreSQL**
* **bcrypt**
* **jsonwebtoken (JWT)**

---

## 📁 Project Structure

```
src/
 ├── config/
 ├── modules/
 │    ├── auth/
 │    ├── users/
 │    ├── vehicles/
 │    ├── bookings/
 ├── app.ts
 └── server.ts
```

* **Modular architecture**
* Each module contains **routes**, **controllers**, **services**, and **validation**
* Clean separation of concerns

---

## 📦 Installation & Setup

### 1. Clone the repository

```sh
git clone https://github.com/abdulmazidakash/l-2-A-6
cd l-2-A-6
```

### 2. Install dependencies

```sh
npm install
```

### 3. Setup environment variables

Create a `.env` file:

```
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/vehiclerental
JWT_SECRET=your_secret_key
```

### 4. Setup database tables

Database initialization runs automatically from `initDB()`.

### 5. Start development server

```sh
npm run dev
```

### 6. Build project

```sh
npm run build
```

---

## 🌐 API Endpoints Overview

### 🔐 Authentication

| Method | Endpoint              | Access | Description           |
| ------ | --------------------- | ------ | --------------------- |
| POST   | `/api/v1/auth/signup` | Public | Register new user     |
| POST   | `/api/v1/auth/signin` | Public | Login and receive JWT |

---

### 🚗 Vehicles

| Method | Endpoint                      | Access | Description       |
| ------ | ----------------------------- | ------ | ----------------- |
| POST   | `/api/v1/vehicles`            | Admin  | Create vehicle    |
| GET    | `/api/v1/vehicles`            | Public | Get all vehicles  |
| GET    | `/api/v1/vehicles/:vehicleId` | Public | Get vehicle by ID |
| PUT    | `/api/v1/vehicles/:vehicleId` | Admin  | Update vehicle    |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin  | Delete vehicle    |

---

### 👤 Users

| Method | Endpoint                | Access    | Description   |
| ------ | ----------------------- | --------- | ------------- |
| GET    | `/api/v1/users`         | Admin     | Get all users |
| PUT    | `/api/v1/users/:userId` | Admin/Own | Update user   |
| DELETE | `/api/v1/users/:userId` | Admin     | Delete user   |

---

### 📅 Bookings

| Method | Endpoint                      | Access         | Description    |
| ------ | ----------------------------- | -------------- | -------------- |
| POST   | `/api/v1/bookings`            | Customer/Admin | Create booking |
| GET    | `/api/v1/bookings`            | Role-based     | Get bookings   |
| PUT    | `/api/v1/bookings/:bookingId` | Role-based     | Update booking |

---

## 🔐 Authentication Header

All protected routes require:

```
Authorization: Bearer <your_token>
```

---

## 💡 Business Logic Highlights

* `total_price = daily_rent_price × number_of_days`
* Vehicle auto-updates its availability
* Prevent deletion if there are active bookings
* Customers can only cancel before `rent_start_date`
* Admin can mark bookings as returned

---

## 🧪 Response Format

### Success

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error

```json
{
  "success": false,
  "message": "Error description",
  "errors": {}
}
```


---

## 👨‍💻 Author

**Abdul Mazid Akash**
Backend Developer | Full Stack Enthusiast


