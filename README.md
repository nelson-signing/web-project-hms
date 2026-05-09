# 🏨 Hotel Booking System

A fullstack web application for managing hotel room reservations, featuring a customer catalog and a staff management interface. This project demonstrates a complete implementation of a REST API with secure authentication and automated documentation.

## 🚀 Quick Start

### 1. Prerequisites
* **Node.js**
* **MySQL**

### 2. Database Setup
1. Create a MySQL database named `hotel_db`.
2. Import the SQL file located in: `/backend/database/hotel_db.sql`.
    * *This script creates the schema and populates the database with 20 sample rooms.*

### 3. Backend Configuration
1. Navigate to the backend folder: `cd backend`.
2. Install dependencies: `npm install`.
3. Rename the `.env.example` file to **`.env`**.
4. Edit the `.env` file with your local MySQL credentials (especially `DB_PASSWORD`).
5. Start the server: `npm run dev`.
    * *The server runs on **http://localhost:3000** by default.*
    * 🔗 **API Documentation:** Once started, you can explore the endpoints at `http://localhost:3000/api-docs`.

### 4. Frontend Configuration
1. Navigate to the frontend folder: `cd frontend`.
2. Install dependencies: `npm install`.
3. Start the application: `npm run dev`.
4. Access the site at: **http://localhost:5173**.

---

## ⚠️ Important: Port Configuration

The Frontend is pre-configured to communicate with the Backend on **port 3000**. 
If you change the `PORT` in the backend `.env` file, you must update the API base URL in the frontend code (frontend/src/api/index.js) to match the new port.


---

## 🛠️ Tech Stack

### Frontend
* **Vue.js 3**: Progressive JavaScript Framework using Composition API.
* **Vuetify 4**: Material Design component framework for a responsive UI.
* **Vue Router**: Client-side routing for seamless navigation.
* **Axios**: HTTP client for API requests.
* **MDI Fonts**: Material Design Icons integration.

### Backend
* **Node.js & Express 5**: Fast and minimalist web server.
* **Sequelize ORM**: Database management and Object-Relational Mapping.
* **MySQL 2**: Database driver for Node.js.
* **JSON Web Token (JWT)**: Secure authentication for protected routes.
* **Bcrypt**: Password hashing for security.
* **Multer**: Middleware for handling room image uploads.
* **Dotenv**: Environment variable management.
* **Swagger (JSDoc & UI)**: Interactive API documentation.