"use server";

import { createClient } from "@/lib/supabase/server";

export enum ConfigurationType {
  JOB_CONFIGURATION = "JOB_CONFIGURATION",
  JOB_TYPE_OPTIONS = "JOB_TYPE_OPTIONS",
}

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

type JobConfigurationFormOptions = {
  application_form: ApplicationForm;
};

type ConfigurationRow = {
  id: string;
  type: string;
  form_options: JobConfigurationFormOptions;
};

// Generic row type for mixed configurations (different form_options shapes)
type ConfigurationRowAny = {
  id: string;
  type: string;
  form_options: unknown;
};

export const getConfiguration = async (
  type: ConfigurationType
): Promise<ConfigurationRow | null> => {
  const supabase = await createClient();

  if (!supabase) return null;

  const { data, error } = await supabase
    .from("configurations")
    .select("id, type, form_options")
    .eq("type", type)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Supabase getConfiguration error:", error.message);
    return null;
  }

  if (!data) return null;
  return data as ConfigurationRow;
};

// Fetch multiple configurations by type array
export const getConfigurations = async (
  types: ConfigurationType[]
): Promise<ConfigurationRowAny[]> => {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("configurations")
    .select("id, type, form_options")
    .in("type", types);

  if (error) {
    console.error("Supabase getConfigurations error:", error.message);
    return [];
  }

  return Array.isArray(data) ? (data as ConfigurationRowAny[]) : [];
};