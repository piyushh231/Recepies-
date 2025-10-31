# Recipes on Render

Simple recipes app using Express, EJS, and Prisma with PostgreSQL. Ready to deploy on Render.

## Features
- Create, read, update, delete recipes
- EJS server-rendered views
- PostgreSQL via Prisma ORM
- `render.yaml` for one-click deploy

## Local Development
1. Install Node 18+.
2. Install deps:
   ```bash
   npm install
   ```
3. Set up env:
   - Copy `.env.example` to `.env`
   - Provide a `DATABASE_URL` to a local Postgres instance. Example:
     ```
     DATABASE_URL="postgresql://postgres:postgres@localhost:5432/recipes?schema=public"
     ```
4. Initialize Prisma client and database:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
5. Start the server:
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

## Deploy to Render
1. Push this repo to GitHub/GitLab.
2. Click New > Blueprint in Render and select this repo.
3. Render will provision the web service and a PostgreSQL database using `render.yaml`.
4. First deploy runs `prisma migrate deploy` to apply schema.

## Structure
```
src/
  server.js         Express app and routes wiring
  db.js             Prisma client
  routes/recipes.js CRUD endpoints
views/              EJS templates
prisma/schema.prisma Prisma schema (Recipe model)
public/styles.css   Minimal styles
render.yaml         Render blueprint (web + database)
```

## Environment
- `DATABASE_URL`: PostgreSQL connection string (Render provides automatically).


