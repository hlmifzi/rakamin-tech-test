"use server";

import { createClient } from "@/lib/supabase/server";

// Candidate attribute structure based on the migration seed
type CandidateAttribute = {
  key: string;
  label: string;
  value: string;
  order: number;
};

// Candidate row structure from Supabase
type CandidateRow = {
  id: string;
  apply_jobs_id: string;
  attributes: CandidateAttribute[];
  created_at: string;
  updated_at: string;
};

// Processed candidate data for UI consumption
export type Candidate = {
  id: string;
  apply_jobs_id: string;
  attributes: CandidateAttribute[];
  created_at: string;
  updated_at: string;
};

export const getCandidateByJobId = async (jobId: string): Promise<Candidate[] | null> => {
  const supabase = await createClient()
  ;
  if (!supabase) return null;

  console.log("[candidates] jobId:", jobId);
    
  const { data, error } = await supabase
      .from("candidates")
      .select("id, apply_jobs_id, attributes, created_at, updated_at")
      .eq("apply_jobs_id", jobId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase getCandidateByJobId error:", error.message);
      return [];
    }

    if (!Array.isArray(data)) {
      return [];
    }

    // Process and return candidates with proper typing
    return (data as CandidateRow[]).map((row) => ({
      id: row.id,
      apply_jobs_id: row.apply_jobs_id,
      attributes: Array.isArray(row.attributes) ? row.attributes : [],
      created_at: row.created_at,
      updated_at: row.updated_at,
    }));
};

// Payload untuk membuat candidate baru (apply ke sebuah job)
export type CreateCandidatePayload = {
  apply_jobs_id: string;
  attributes: CandidateAttribute[];
};

// Buat candidate baru dan kembalikan output sesuai format yang diminta
export const createCandidate = async (
  payload: CreateCandidatePayload
): Promise<{ data: Candidate[] }> => {
  const supabase = await createClient();
  if (!supabase) return { data: [] };

  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  const id = `cand_${y}${m}${d}_${seq}`;

  // Normalisasi atribut: pastikan bentuknya konsisten, urutkan berdasarkan order jika ada
  const attrs = Array.isArray(payload.attributes)
    ? payload.attributes
        .map((a, i) => ({
          key: a.key,
          label: a.label,
          value: a.value,
          order: typeof a.order === "number" ? a.order : i + 1,
        }))
        .sort((a, b) => a.order - b.order)
    : [];

  const { data, error } = await supabase
    .from("candidates")
    .insert({
      id,
      apply_jobs_id: payload.apply_jobs_id,
      attributes: attrs,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    })
    .select("id, apply_jobs_id, attributes, created_at, updated_at")
    .limit(1);

  if (error) {
    console.error("Supabase createCandidate error:", error.message);
    throw new Error("CREATE_CANDIDATE_FAILED");
  }

  const row = Array.isArray(data)
    ? (data[0] as CandidateRow)
    : (data as unknown as CandidateRow);

  const candidate: Candidate = {
    id: row.id,
    apply_jobs_id: row.apply_jobs_id,
    attributes: Array.isArray(row.attributes) ? row.attributes : [],
    created_at: row.created_at,
    updated_at: row.updated_at,
  };

  return { data: [candidate] };
};