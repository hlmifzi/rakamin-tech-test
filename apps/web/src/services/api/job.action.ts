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


type JobQueryOptions = {
  page?: number;
  per?: number;
  offset?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  search?: string;
  filters?: Record<string, string | number | boolean | null | undefined>;
};

export const getJobs = async (options: JobQueryOptions = {}) => {
  const {
    page = 1,
    per = 10,
    offset,
    sort_by = "created_at",
    sort_order = "desc",
    search,
    filters = {},
  } = options;

  const supabase = await createClient();
  if (!supabase)
    return {
      data: [],
      meta: {
        page,
        per,
        offset: offset ?? Math.max(0, (page - 1) * per),
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
        sortBy: sort_by,
        sortOrder: sort_order,
        search: search ?? null,
        filters,
      },
    };

  const from = typeof offset === "number" ? Math.max(0, offset) : Math.max(0, (page - 1) * per);
  const to = from + per - 1;

  let query = supabase
    .from("jobs")
    .select("id, slug, title, status, salary_range, list_card, application_form", { count: "exact" })
    .order(sort_by, { ascending: sort_order === "asc" });

  // Apply filters
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    // Simple equality filter for primitive values
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      query = query.eq(key, value);
    }
  });

  // Apply search across main fields using ILIKE (safe baseline)
  if (search && typeof search === "string" && search.trim().length > 0) {
    const term = search.trim();
    const like = `%${term}%`;
    query = query.or([
      `title.ilike.${like}`,
      `slug.ilike.${like}`,
      `status.ilike.${like}`,
    ].join(","));
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error("Supabase getJobsPaginated error:", error.message);
    return {
      data: [],
      meta: {
        page,
        per,
        offset: from,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrev: page > 1,
        sortBy: sort_by,
        sortOrder: sort_order,
        search: search ?? null,
        filters,
      },
    };
  }

  const rows = Array.isArray(data) ? (data as JobRow[]) : [];
  const mapped = rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    title: row.title,
    status: row.status,
    salary_range: row.salary_range,
    list_card: row.list_card || null,
    application_form: row.application_form || null,
  }));

  const total = typeof count === "number" ? count : mapped.length;
  const totalPages = per > 0 ? Math.ceil(total / per) : 0;
  const currentPage = typeof offset === "number" ? Math.floor(from / per) + 1 : page;
  const hasNext = currentPage < totalPages;
  const hasPrev = currentPage > 1;

  return {
    data: mapped,
    meta: {
      page: currentPage,
      per,
      offset: from,
      total,
      totalPages,
      hasNext,
      hasPrev,
      sortBy: sort_by,
      sortOrder: sort_order,
      search: search ?? null,
      filters,
    },
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

// ---------- Create Jobs ----------
type CreateJobData = {
  title: string;
  type?: string;
  description?: string;
  candidate_needed?: number;
  salary_min?: number;
  salary_max?: number;
};

export const createJobs = async (
  payload: { data: CreateJobData; application_form?: ApplicationForm }
) => {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data } = payload;

  const now = new Date();
  const id = `job_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}_${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;

  const slug = String(data.title || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

  const formatCurrency = (n?: number) => {
    if (typeof n !== "number") return "0";
    return n.toLocaleString("id-ID");
  };

  const salary_range = {
    min: data.salary_min ?? 0,
    max: data.salary_max ?? 0,
    currency: "IDR",
    display_text: `Rp${formatCurrency(data.salary_min)} - Rp${formatCurrency(data.salary_max)}`,
  };

  const list_card = {
    badge: "Active",
    started_on_text: `created on ${now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`,
    cta: "Manage Job",
  };

  const { data: inserted, error } = await supabase
    .from("jobs")
    .insert({
      id,
      slug,
      title: data.title,
      status: "active",
      salary_range,
      list_card,
      application_form: payload.application_form ?? null,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    })
    .select("id, slug, title, status, salary_range, list_card, application_form")
    .limit(1);

  if (error) {
    console.error("Supabase createJobs error:", error.message);
    return null;
  }

  const row = Array.isArray(inserted) ? (inserted[0] as JobRow) : (inserted as unknown as JobRow);
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    status: row.status,
    salary_range: row.salary_range,
    list_card: row.list_card || null,
    application_form: row.application_form || null,
  } as JobRow;
};