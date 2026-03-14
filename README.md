# Meal Sharing

A full-stack web app for discovering shared meals, viewing details, and creating reservations and reviews. It pairs a Next.js frontend with an Express + Knex API backed by SQL.

**Why this is useful**
- Helps users find upcoming meals quickly, with filters, details, and availability.
- Supports the core booking flow: browse meals, reserve seats, and leave reviews.

**Status**
- In development.

**Tech Stack**
- Frontend: Next.js 16, React 19, Sass.
- Backend: Express, Knex, MySQL/PostgreSQL.

**Project Structure**
- `app-next/` - Next.js frontend.
- `api/` - Express API server with database access.

**Getting Started**
- Backend:
1. `cd api`
2. Create an `.env` file (see `api/.env` for the expected variables).
3. `npm install`
4. `npm run dev`
- Frontend:
1. `cd app-next`
2. Set `NEXT_PUBLIC_DB_ACCESS` in `.env.local` (example: `http://localhost:8000`).
3. `npm install`
4. `npm run dev`

**Help**
- Start with `api/README.md` for database and deployment guidance.
- If something is unclear, open an issue in this repository.

**Maintainer**
- Not specified; use repository issues for contact.
