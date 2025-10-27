"use server";

import { createClient } from "@/lib/supabase/server";

type ApplicationFormField = {
  key: string;
  validation: { required: boolean };
};

type ApplicationFormSection = {
  title: string;
  fields: ApplicationFormField[];
};

type ApplicationForm = {
  sections: ApplicationFormSection[];
};

type JobRow = {
  id: string;
  slug: string;
  title: string;
  status: "active" | "inactive" | string;
  salary_range: {
    min: number;
    max: number;
    currency: string;
    display_text: string;
  };
  list_card?: {
    badge?: string;
    started_on_text?: string;
    cta?: string;
  } | null;
  application_form?: ApplicationForm | null;
};

export const getJobs = async () => {
    const supabase = await createClient();

  // If Supabase client is available and envs are set, fetch from DB
  if (supabase) {
    const { data, error } = await supabase
      .from("jobs")
      .select("id, slug, title, status, salary_range, list_card")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Supabase getJobs error:", error.message);
    }
    if (Array.isArray(data)) {
      return (data as JobRow[]).map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        status: row.status,
        salary_range: row.salary_range,
        list_card: row.list_card || null,
        application_form: row.application_form || null,
      }));
    }
  }
};

export const getJobById = async (id: string): Promise<JobRow | null> => {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("jobs")
    .select("id, slug, title, status, salary_range, list_card")
    .eq("id", id)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Supabase getJobById error:", error.message);
    return null;
  }

  if (!data) return null;
  const row = data as JobRow;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    status: row.status,
    salary_range: row.salary_range,
    list_card: row.list_card || null,
    application_form: row.application_form || null,
  };
};

export const getJobBySlug = async (slug: string): Promise<JobRow | null> => {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("jobs")
    .select("id, slug, title, status, salary_range, list_card")
    .eq("slug", slug)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Supabase getJobBySlug error:", error.message);
    return null;
  }

  if (!data) return null;
  const row = data as JobRow;
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    status: row.status,
    salary_range: row.salary_range,
    list_card: row.list_card || null,
    application_form: row.application_form || null,
  };
};

export const getActiveJobs = async (): Promise<JobRow[]> => {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("jobs")
    .select("id, slug, title, status, salary_range, list_card")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getActiveJobs error:", error.message);
    return [];
  }

  return Array.isArray(data)
    ? (data as JobRow[]).map((row) => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        status: row.status,
        salary_range: row.salary_range,
        list_card: row.list_card || null,
        application_form: row.application_form || null,
      }))
    : [];
};