# Task Manager Project

A full-stack **Task Manager** application built with **React**, **Redux Toolkit**, **Tailwind CSS**, **Express**, and **Prisma** (with MySQL/PostgreSQL).  
It allows users to **register, login, and manage tasks** with different statuses (`To do`, `In Progress`, `Done`).

---

## Features

- User authentication with **JWT** and secure cookies
- Role-based task management
- CRUD operations for tasks
- Filter tasks by status
- Responsive and modern UI using Tailwind CSS
- State management using Redux Toolkit

---


## Tech Stack

**Frontend:**  
- React
- Redux Toolkit  
- Tailwind CSS  
- React Router DOM  
- React Icons  

**Backend:**  
- Node.js & Express  
- Prisma ORM  
- PostgreSQL  
- bcrypt for password hashing  
- JSON Web Tokens (JWT) for authentication  

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/<your-username>/task-manager.git
cd task-manager

### install backendd dependencies
cd backend
npm install


### Install frontend dependencies
cd ../frontend
npm install

### backend/.env
DATABASE_URL
JWT_SECRET
PORT
CORS_ORIGIN

### frontend/.env
VITE_BACKEND_URL

