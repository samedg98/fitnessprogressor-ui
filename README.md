# FitnessProgressor

A full‑stack fitness tracking application that helps users log workouts, track progress, view insights, and manage their profile. Built with a modern React frontend, a secure Node/Express backend, and a PostgreSQL database.

---

## 🌐 Live Demo

**Frontend (Netlify):**  
https://delicate-liger-d20157.netlify.app/

**NEW LINK**: https://fitnessprogressor.netlify.app

**Backend API (Render):**  
https://fitnessprogressor-backend.onrender.com/

**Sprint Board:**  
https://github.com/users/samedg98/projects/1/views/1

**Frontend Repo:**  
https://github.com/samedg98/fitnessprogressor-ui

**Backend Repo:**  
https://github.com/samedg98/fitnessprogressor-services

---

## 🚀 Features

### 🔐 Authentication
- Register new users  
- Login with JWT authentication  
- Update profile (email + password)  
- Secure password hashing with bcrypt  

### 🏋️‍♂️ Workout Management
- Add workouts with exercises, sets, reps, and weight  
- View all logged workouts  
- Edit existing workouts  
- Delete workouts  
- Clean, responsive UI for easy logging  

### 📊 Dashboard Insights
- Weekly total weight lifted  
- Monthly workout history  
- Strength progression for top exercises  
- Consistency score  
- Clean card‑based layout  

### ⚙️ Profile Settings
- Update email  
- Change password  
- Protected routes using JWT middleware  

---

## 🛠️ Tech Stack

### Frontend
- React + Vite  
- Axios  
- React Router  
- Modern UI styling  

### Backend
- Node.js  
- Express.js  
- PostgreSQL  
- bcrypt for password hashing  
- JWT for authentication  
- CORS configuration for Netlify + local dev  

### Deployment
- **Frontend:** Netlify  
- **Backend:** Render  
- **Database:** PostgreSQL (Render)  

---

## 📡 API Endpoints

### **Auth Routes**
| Method | Endpoint           | Description |
|--------|--------------------|-------------|
| POST   | `/auth/register`   | Register new user |
| POST   | `/auth/login`      | Login + receive JWT |
| PUT    | `/auth/update`     | Update email/password (protected) |

### **Workout Routes**
| Method | Endpoint                | Description |
|--------|--------------------------|-------------|
| POST   | `/workouts`             | Create workout |
| GET    | `/workouts`             | Get all workouts |
| PUT    | `/workouts/:id`         | Update workout |
| DELETE | `/workouts/:id`         | Delete workout |
| GET    | `/workouts/stats`       | Dashboard insights |

---

## 🧪 Local Development Setup

### 1. Clone both repos

git clone https://github.com/samedg98/fitnessprogressor-ui
git clone https://github.com/samedg98/fitnessprogressor-services


### 2. Install dependencies

Frontend:
cd fitnessprogressor-ui
npm install

Backend:
cd fitnessprogressor-services
npm install


### 3. Environment Variables

#### Frontend `.env`
VITE_API_BASE_URL=http://localhost:4000


#### Backend `.env`
PORT=4000
DATABASE_URL=<your-postgres-url>
JWT_SECRET=supersecretkey


### 4. Start servers

Backend:
npm start

Frontend:
npm run dev

---

## 🌐 Production Deployment

### Netlify (Frontend)
Uses environment variable:

VITE_API_BASE_URL=https://fitnessprogressor-backend.onrender.com


### Render (Backend)
- Auto‑deploys on push  
- PostgreSQL database hosted on Render  
- CORS configured for:  
  - http://localhost:5173  
  - https://delicate-liger-d20157.netlify.app  

---

## 📸 Screenshots

- Login Page // screenshots/Login Screenshot.png
- Register Page  //  screenshots/Register Screenshot.png
- Dashboard  //  screenshots/Dashboard Screenshot 1.png , screenshots/Dashboard Screenshot 2.png
- Workout History List  // screenshots/History Screenshot.png
- Log Workout // screenshots/Log Workout Screenshot.png
- Profile Settings  //  screenshots/Profile Settings Screenshot.png

---

## 📈 Future Improvements

- Dark mode  
- Social sharing  
- Exercise library with images  
- Goal tracking with streaks  
- Mobile app version  

---

## 🧠 What I Learned

- Full‑stack authentication with JWT  
- Secure password hashing with bcrypt  
- Managing relational data in PostgreSQL  
- Handling CORS for multi‑environment deployments  
- Deploying full‑stack apps with Netlify + Render  
- Debugging production issues and environment mismatches  

---

## 📬 Contact

Created by **Samed**

