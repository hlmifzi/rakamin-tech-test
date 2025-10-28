"use server"

import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createJobs } from "@/services/api/job.action";
import type { ApplicationForm, CreateJobData } from "@/types/jobActionType";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data: CreateJobData = body?.data || {};
    const application_form: ApplicationForm | undefined = body?.application_form || undefined;

    const created = await createJobs({ data, application_form });

    // Revalidate relevant pages
    revalidatePath("/admin/job-list");
    revalidatePath("/candidate/job-list");

    return NextResponse.json({ success: true, job: created }, { status: 201 });
  } catch (err) {
    console.error("[api/jobs/create] error:", err);
    return NextResponse.json({ success: false, error: "Failed to create job" }, { status: 500 });
  }
}