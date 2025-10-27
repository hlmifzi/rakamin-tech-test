"use server";

import { supabase } from "@/lib/supabase";

export enum ConfigurationType {
  JOB_CONFIGURATION = "JOB_CONFIGURATION",
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

export const getConfiguration = async (
  type: ConfigurationType
): Promise<ConfigurationRow | null> => {
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