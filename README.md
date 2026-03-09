# 🏠 GharPayy

### A modern CRM platform built for real-estate teams

GharPayy is a **full-stack real estate CRM** designed to help property businesses manage **leads, listings, agents, visits, and analytics** in one unified dashboard.

It focuses on **speed, usability, and actionable insights** so teams can close deals faster and stay organized.

---

## 🔗 Live Demo

**Explore the product instantly**

https://gharpayy-595d.vercel.app/

Preview mode allows you to **experience the dashboard without creating an account.**

---

# ✨ Features

## 📊 Analytics Dashboard
Powerful analytics to track performance and sales.

- Lead volume tracking
- Conversion rate insights
- Agent performance leaderboard
- Visit trends and analytics
- Interactive charts and statistics

---

## 👥 Lead Management

Manage customer leads across the entire sales pipeline.

Features include:

- Create and update lead profiles
- Drag-and-drop pipeline stages  
  *(New → Contacted → Qualified → Visit → Closed)*
- Lead history tracking
- Status tags and priority labels

---

## 🏡 Property Inventory

A centralized system for managing property listings.

Capabilities:

- Add and manage properties
- Owner information management
- Pricing, amenities, and availability tracking
- Photo and listing management

---

## 🗺️ Nearby Properties Map

Interactive property exploration using **Leaflet Maps**.

Includes:

- Map-based property browsing
- Animated property markers
- Property clustering for better visualization
- Direct Google Maps navigation

---

## 📅 Visit Scheduling

Schedule and manage property visits easily.

Features:

- Upcoming and past visit tracking
- Calendar-based scheduling
- Visit reminders *(future WhatsApp integration)*

---

## 🧑‍💼 Agent Management

Track agent productivity and performance.

Capabilities:

- Agent visit statistics
- Booking tracking
- Performance leaderboards
- Top performer insights

---

# ⚙️ Tech Stack

## Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- Recharts
- Leaflet Maps
- Clerk Authentication
- React Hot Toast

## Backend
- Node.js
- Express.js
- PostgreSQL (Neon)

## AI Utilities
- Groq API

## Deployment
- Vercel

---

# 🏗 Project Structure


GharPayy
│
├── backend
│ ├── models
│ ├── routes
│ ├── utils
│ ├── server.js
│ └── .env
│
├── frontend
│ ├── src
│ │ ├── assets
│ │ ├── components
│ │ ├── layout
│ │ ├── pages
│ │ ├── services
│ │ └── App.jsx
│ └── .env
│
└── README.md


---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/gharpayy.git
cd gharpayy
2️⃣ Setup Backend
cd backend
npm install

Create a .env file

DATABASE_URL=your_database_url
GROQ_API_KEY=your_api_key

Run the server

npm run dev

Backend runs on:

http://localhost:5000
3️⃣ Setup Frontend
cd frontend
npm install

Create .env

VITE_CLERK_PUBLISHABLE_KEY=your_key

Run frontend

npm run dev

Frontend runs on:

http://localhost:5173
📸 Screenshots

Add screenshots of:

Dashboard

Lead pipeline

Analytics page

Nearby map view

(Screenshots help visitors understand the project quickly.)

🔮 Future Roadmap

Upcoming improvements planned for GharPayy:

AI lead scoring and smart recommendations

Role-based access control (Admin / Agent)

WhatsApp automation for leads and visit reminders

Advanced property search and filtering

Exportable analytics reports (PDF / CSV)

👨‍💻 Author

Abhay Kumar Yadav

B.Tech IT
Chandigarh Engineering College, Landran

Passionate about building scalable SaaS products and intelligent real-world tech solutions.
