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