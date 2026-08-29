import { NextRequest, NextResponse } from "next/server";
import { createUser, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
    }

    const user = await createUser(email, password, name);
    await setSessionCookie(user);
    return NextResponse.json({ user });
  } catch (err: any) {
    if (err?.code === "23505") {
      return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    }
    console.error(err);
    return NextResponse.json({ error: "Something went wrong creating your account." }, { status: 500 });
  }
}
