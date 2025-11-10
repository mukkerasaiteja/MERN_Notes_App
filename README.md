# Notes Full Stack App

A simple full-stack Notes application (MERN-style) — React frontend + Express/MongoDB backend. This repository contains a Vite + React frontend in `frontend/` and an Express backend in `backend/`.

This README explains how the project is organized, how to run it in development, environment variables, API endpoints

## Features

# Notes Full Stack App

A small full-stack Notes application with a React (Vite) frontend and an Express + MongoDB backend.

## What’s included

- `frontend/` — Vite + React app (UI, components, Tailwind CSS)
- `backend/` — Express server (routes, models, DB connection)

## Quick start (development)

1. Install dependencies:

```bash
# from repository root
npm install
cd frontend && npm install && cd ..
```

2. Run backend and frontend in separate terminals:

Backend (from repo root):

```bash
cd backend
node index.js
# or
node backend/index.js
```

Frontend (from `frontend/`):

```bash
cd frontend
npm run dev
```

Note: `frontend/vite.config.js` proxies `/api` to the backend during development.

## Environment variables

Create a `.env` file in the project root with the variable names below.

- PORT
- Mongo_URL
- JWT_User_Secret

## API (overview)

The frontend communicates with these endpoints under `/api` (authentication required for user/notes endpoints):

- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/users/me`
- `GET /api/notes`
- `POST /api/notes`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`
