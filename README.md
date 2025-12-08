# University App

A Next.js and Prisma-powered university management portal for courses, lessons, announcements, and grades.

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set `DATABASE_URL` in `.env` to point to your PostgreSQL instance.
3. Apply the schema (and seed sample data if desired):
   ```bash
   npx prisma db push
   npm run seed
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Authentication
- Visit `/login` to sign in with existing credentials.
- Visit `/register` to create a new account (choose Student, Instructor, or Admin). After successful sign-up, you are redirected back to the login page to start a session.

## Inspecting the database
- **Command line (Prisma Studio):**
  ```bash
  npm run studio
  ```
  This opens Prisma Studio so you can browse and edit tables directly in the browser.
- **GUI client (e.g., DBeaver):**
  1. Create a new PostgreSQL connection in DBeaver.
  2. Paste the same `DATABASE_URL` used by the app (or fill in the host, port, database, user, and password fields individually).
  3. Test the connection and connect to view or edit tables.

