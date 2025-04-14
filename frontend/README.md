# 🛍️ Admin Panel - Category Management

A full-stack e-commerce category management dashboard that allows users to **sign up**, **log in**, and **view, add, or edit categories** in a sleek, professional UI.

## 🔧 Tech Stack

- **Frontend:** React.js (Hooks + Functional Components)
- **Backend:** Node.js, Express.js
- **Database:** SQLite 
- **Authentication:** JWT-based secure auth

---

## ✨ Features

### 🔐 Authentication
- Sign up and login functionality
- JWT token-based user authentication
- Session persistence across refresh

### 📦 Category Dashboard (Post-Login)
- Responsive grid of category cards
- Each card includes:
  - 📸 Category image
  - 🏷️ Category name (e.g., *Summer Clothes*)
  - 🔢 Item count (e.g., *26 items*)

### ➕ Add New Category *(Optional)*
- Form to add:
  - Category name
  - Item count
  - Upload image (stored locally or in cloud)
- Categories update in real-time upon submission

### ✏️ Edit Category *(Optional)*
- Modify name, image, or item count
- UI updates immediately post-edit
## 🚀 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Soniya-321/Cart-Management-App.git

```
### 2. Install Dependencies 
### Frontend:
```bash
cd frontend
npm install
npm start 
```
### Backend:
```bash 
cd backend
npm install
node app.js or nodemon app.js
```
---
