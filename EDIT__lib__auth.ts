import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getPool } from "./db";

const SESSION_COOKIE = "jobprimed_session";
const SESSION_DAYS = 7;

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_SECRET is not set. Copy .env.example to .env.local and set a random secret string."
    );
  }
  return secret;
}

export type Plan = "free" | "premium";
export type SessionUser = { id: number; email: string; name: string | null; plan: Plan };

export async function createUser(email: string, password: string, name?: string) {
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await getPool().query(
    `INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3)
     RETURNING id, email, name, plan`,
    [email.toLowerCase().trim(), passwordHash, name ?? null]
  );
  return result.rows[0] as SessionUser;
}

export async function verifyUser(email: string, password: string): Promise<SessionUser | null> {
  const result = await getPool().query(
    `SELECT id, email, name, plan, password_hash FROM users WHERE email = $1`,
    [email.toLowerCase().trim()]
  );
  const row = result.rows[0];
  if (!row) return null;
  const valid = await bcrypt.compare(password, row.password_hash);
  if (!valid) return null;
  return { id: row.id, email: row.email, name: row.name, plan: row.plan };
}

// No real payment processor is connected — this only flips the plan column
// in the database for the current account. See app/api/account/upgrade.
export async function setUserPlan(userId: number, plan: Plan): Promise<SessionUser> {
  const result = await getPool().query(
    `UPDATE users SET plan = $1 WHERE id = $2 RETURNING id, email, name, plan`,
    [plan, userId]
  );
  return result.rows[0] as SessionUser;
}

export function signSession(user: SessionUser): string {
  return jwt.sign(user, getSecret(), { expiresIn: `${SESSION_DAYS}d` });
}

export async function setSessionCookie(user: SessionUser) {
  const token = signSession(user);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, getSecret()) as SessionUser;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
