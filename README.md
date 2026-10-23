
TraceLens - Developer Profile Explorer

TraceLens is a demonstration full-stack application that visualizes developer portfolios, projects, and technologies.

## Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, React Flow, Recharts, Vite
- **Backend**: Node.js, Express, PostgreSQL

## Getting Started

### 1. Database Setup
Start a local PostgreSQL database:
```bash
docker run --name tracelens-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tracelens -p 5432:5432 -d postgres
```

### 2. Backend Setup
```bash
cd backend
npm install

# Make sure your database is running, then seed the fictional demo data:
npm run seed

# Start the API server
npm start
```
The backend will run on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`. Open it in your browser.

## Features
- **Demo Mode**: Includes a fictional developer profile (Alex Morgan) to explore.
- **Dashboard**: View summary stats, tech stacks, and a timeline.
- **Relationship Graph**: Interactive node-based visualization using React Flow..
