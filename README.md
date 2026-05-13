# Prosperventure

Prosperventure is a comprehensive, modern MERN-stack platform that offers a unified dashboard for users to request and manage multiple fundamental business services (such as Logistics, Insurance, Real Estate, Taxation, and Content Services) under one roof.

## Tech Stack
- **Frontend**: React (built with Vite), React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Styling**: Vanilla CSS with modern Glassmorphism, Responsive UI
- **Authentication**: JWT & bcrypt

## Features
- **User Authentication**: Secure Login & Registration system with password hashing.
- **Role-based Access Control**: Different dashboards for `user`, `admin`, and `superadmin`.
- **Service Request Management**: Clients can seamlessly submit service requests, and track their real-time statuses.
- **Admin Dashboard**: Secure panel for administrators to manage user roles and update contact request statuses.
- **Fully Responsive**: Flawless experience across desktops, tablets, and mobile devices.

## How to Run Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/Prosperventure.git
cd Prosperventure
```

### 2. Backend Setup
Open a terminal and navigate to the server folder:
```bash
cd server
npm install
npm start
```

### 3. Frontend Setup
Open a new terminal and navigate to the client folder:
```bash
cd client
npm install
npm run dev
```

## Environment Variables

To run this project securely, you will need to create the following `.env` files in their respective folders. **(Do not commit these files to GitHub!)**

### `server/.env`
```env
PORT=10000
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```
*(Note: When deploying to Render, add these variables in the Render Dashboard Environment settings)*

### `client/.env`
```env
VITE_API_URL=http://localhost:10000
```
*(Note: When deploying the frontend to Vercel, set `VITE_API_URL` to your live Render backend URL in the Vercel Project Settings).*

## Live Demo
- **Frontend (Vercel)**: [Live Link Here](#)
- **Backend (Render)**: [Live Link Here](#)
