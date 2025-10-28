import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const jobID = String(formData.get("jobID") || "").trim();

  let role = "";
  if (email === "candidate@gmail.com" && password === "123456") role = "candidate";
  else if (email === "recruiter@gmail.com" && password === "123456") role = "recruiter";

  if (!role) {
    const url = new URL(`/auth${jobID ? `?error=invalid&jobID=${encodeURIComponent(jobID)}` : "?error=invalid"}`, request.url);
    return NextResponse.redirect(url);
  }

  // Tentukan path redirect
  let redirectPath = "/candidate/job-list";
  if (role === "recruiter") {
    redirectPath = "/admin/job-list";
  } else if (jobID) {
    redirectPath = `/candidate/apply/${encodeURIComponent(jobID)}`;
  }

  const response = NextResponse.redirect(new URL(redirectPath, request.url));
  response.cookies.set({ name: "role", value: role, path: "/", httpOnly: true });
  return response;
}