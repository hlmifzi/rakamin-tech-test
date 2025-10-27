"use server";

import { supabase } from "@/lib/supabase";

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