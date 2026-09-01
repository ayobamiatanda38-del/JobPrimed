# JobPrimed

A real Next.js site for JobPrimed.com: marketing pages, a working signup/login
system backed by Postgres, and a protected dashboard. Built and tested end to
end (signup → session cookie → protected route → logout → login → wrong-password
rejection → duplicate-email rejection) before being handed off.

## What's real

- **Auth**: passwords hashed with bcrypt, sessions are signed JWTs in an
  httpOnly cookie, `/dashboard` is checked server-side and redirects to
  `/login` if you're not signed in.
- **Database**: plain Postgres via the `pg` driver (`lib/db.ts`) — works
  against local Postgres or any hosted Postgres (Neon, Supabase, Vercel
  Postgres) by just changing `DATABASE_URL`.
- **Routing**: real Next.js App Router pages — every page has its own URL,
  works with the browser back/forward buttons and a hard refresh, and can be
  linked to directly.

## What's not built yet

- No payment processing (checkout leads into real signup, not a real charge).
- No saved CVs/cover letters/interview history — the dashboard is the anchor
  point for adding those tables and pages next.
- The mock interview's AI replies are a small scripted rotation, not a live
  LLM call.
- No OAuth (Google/LinkedIn) — email/password only for now.

## Run it locally

1. Have a Postgres database reachable somewhere (local install, or a free
   instance from [Neon](https://neon.tech) or [Supabase](https://supabase.com)).
2. Apply the schema once:
   ```
   psql "$DATABASE_URL" -f prisma/schema.sql
   ```
3. Copy `.env.example` to `.env.local` and fill in `DATABASE_URL` and a
   `JWT_SECRET` (any random string — `openssl rand -base64 32` works).
4. ```
   npm install
   npm run dev
   ```
5. Visit http://localhost:3000, sign up, and you'll land on a real,
   database-backed `/dashboard`.

## Deploy it (Vercel + a hosted Postgres)

This is the fastest real path to a live URL. None of these steps can be done
from inside an AI chat session — they need your own accounts.

1. **Push this project to a GitHub repo.**
   ```
   git init
   git add .
   git commit -m "Initial JobPrimed site"
   git branch -M main
   git remote add origin <your-empty-github-repo-url>
   git push -u origin main
   ```
2. **Create a free Postgres database** at neon.tech or supabase.com. Copy the
   connection string it gives you.
3. **Apply the schema** to that hosted database once:
   ```
   psql "<hosted-connection-string>" -f prisma/schema.sql
   ```
4. **Import the repo into Vercel** (vercel.com → New Project → pick your
   GitHub repo). Vercel auto-detects Next.js — no build config needed.
5. **Set environment variables** in the Vercel project settings:
   - `DATABASE_URL` → the hosted Postgres connection string from step 2
   - `JWT_SECRET` → a random string (generate a new one for production,
     don't reuse the local dev one)
6. **Deploy.** Vercel gives you a `*.vercel.app` URL immediately — test
   signup/login there before doing anything else.
7. **Point jobprimed.com at it**: buy/already own the domain at any
   registrar, then in the Vercel project go to Settings → Domains, add
   `jobprimed.com`, and follow the DNS records it gives you (either point
   nameservers at Vercel, or add the specific A/CNAME records it shows).
   DNS propagation can take a few minutes to a few hours.

That's the whole path from this code to a live, real jobprimed.com with
working signup and login.

## Connecting Flutterwave for real Premium payments

The checkout page can charge a real card through Flutterwave — the code is
built and wired up, but I have not been able to test it end to end myself
(no network access to Flutterwave's API from this environment, and no
account of my own). Test it yourself before relying on it:

1. Create a Flutterwave account at https://flutterwave.com (or your
   country's flutterwave.com/XX site) and complete their verification.
2. In the Flutterwave dashboard, go to Settings -> API and copy your
   **Test** Secret Key (starts with `FLWSECK_TEST-`).
3. Add these environment variables in Vercel (Settings -> Environment
   Variables), same place as DATABASE_URL and JWT_SECRET:
   - `FLW_SECRET_KEY` — your test secret key to start
   - `FLW_PREMIUM_AMOUNT` — the amount to charge, e.g. `8000`
   - `FLW_CURRENCY` — e.g. `NGN`
4. Redeploy. On the live site, go to Pricing -> Get Premium -> Pay with
   Flutterwave. Use one of Flutterwave's published test card numbers
   (see their docs) to complete a test payment.
5. Confirm it actually upgraded the account: check your dashboard shows
   "You're on Premium", or query the database directly:
   `SELECT email, plan FROM users;`
6. Once a test payment works end to end, replace `FLW_SECRET_KEY` with your
   **Live** secret key in Vercel to start accepting real payments.

How it works: clicking "Pay with Flutterwave" calls
`/api/payments/flutterwave/initiate`, which asks Flutterwave for a hosted
checkout link and redirects the browser there. After payment, Flutterwave
redirects back to `/api/payments/flutterwave/callback`, which
re-verifies the transaction server-side with your secret key (never trusts
the redirect alone) before flipping the account's plan to `premium` in
the database.
