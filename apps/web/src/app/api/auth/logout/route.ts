import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set({ name: "role", value: "", path: "/", httpOnly: true, maxAge: 0 });
  return response;
}

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set({ name: "role", value: "", path: "/", httpOnly: true, maxAge: 0 });
  return response;
}