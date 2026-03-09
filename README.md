🏠 GharPayy — Modern Real Estate CRM
<p align="center">

🚀 A modern full-stack CRM platform for real estate teams to manage leads, inventory, agents, and analytics.

</p> <p align="center">

🌐 Live Demo
👉 https://gharpayy-595d.vercel.app/

</p> <p align="center">












</p>
✨ Overview

GharPayy is a real estate CRM dashboard designed to help property businesses manage leads, agents, inventory, visits, and analytics in one place.

It combines data analytics, location intelligence, and modern UI to improve sales workflows and lead conversions.

Users can preview the dashboard before signup, making it easy to explore the product.

🚀 Features
📊 Analytics Dashboard

Lead statistics

Conversion rate tracking

Lead source analytics

Visit trend graphs

Agent performance leaderboard

👥 Lead Management

Add and manage leads

Track lead pipeline stages

View detailed lead profiles

Monitor lead status

🏢 Property Inventory

Manage property listings

Track property owners

Manage availability

📍 Nearby Properties Map

Interactive map with Leaflet

Animated property markers

View nearby properties

Open Google Maps directions

📅 Visit Scheduling

Schedule property visits

Track visit history

Manage upcoming visits

🧑‍💼 Agent Management

Track agent bookings

Monitor performance

Leaderboard ranking

🔐 Authentication

Secure login/signup with Clerk

Session management

Protected routes

🎨 Modern UI

TailwindCSS styling

Framer Motion animations

Interactive charts

🧰 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Framer Motion

Recharts

React Router

Leaflet (Maps)

Clerk Authentication

React Hot Toast

Backend

Node.js

Express.js

PostgreSQL (NeonDB)

REST APIs

Groq API (AI utilities)

🏗️ Project Structure
GharPayy/
│
├── backend/
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── utils/           # Helper utilities
│   ├── server.js        # Backend server entry point
│   ├── package.json
│   ├── .env             # Backend environment variables
│   └── vercel.json      # Deployment config
│
├── frontend/
│   ├── public/
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── assets/      # Images & icons
│   │   │
│   │   ├── components/  # Reusable components
│   │   │   ├── LeadCard.jsx
│   │   │   ├── PipelineChart.jsx
│   │   │   ├── PipelineColumn.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── VisitModal.jsx
│   │   │
│   │   ├── layout/      # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   │   │
│   │   ├── pages/       # Application pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Leads.jsx
│   │   │   ├── Pipeline.jsx
│   │   │   ├── Visits.jsx
│   │   │   ├── Agents.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── Owners.jsx
│   │   │   ├── Nearby.jsx
│   │   │   └── FindAvailability.jsx
│   │   │
│   │   ├── services/    # API calls
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
└── README.md
⚙️ Environment Variables

Create two .env files.

Backend .env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
GROQ_API_KEY=your_groq_api_key
Frontend .env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

⚠️ Never commit real secrets to GitHub.

📦 Installation
1️⃣ Clone the repository
git clone https://github.com/yourusername/gharpayy.git
2️⃣ Backend Setup
cd backend
npm install
npm run dev

Backend runs on:

http://localhost:5000
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:5173
🌍 Live Demo

Try the deployed app:

👉 https://gharpayy-595d.vercel.app/

📊 Dashboard Preview Mode

Visitors can preview the dashboard without signing up.

Flow:

Open homepage
↓
Dashboard preview visible
↓
After 5 seconds
↓
Signup popup appears
↓
User must register to continue
📸 Screenshots (Optional)

Add screenshots here for better GitHub presentation.

/screenshots/dashboard.png
/screenshots/inventory.png
/screenshots/map.png
/screenshots/pipeline.png
🔮 Future Improvements

AI lead scoring

Role-based access (Admin / Agent)

WhatsApp lead automation

Property recommendation system

Advanced analytics

👨‍💻 Author

Abhay Kumar Yadav

B.Tech IT
Chandigarh Engineering College

Passionate about building scalable SaaS platforms and intelligent systems.

⭐ Support

If you like this project:

⭐ Star the repository
🍴 Fork it
🚀 Build something awesome
