// Shared types for Add Jobs modal and application form

export type FieldMode = "mandatory" | "optional" | "off";

export type ApplicationFormField = {
  key: string;
  validation: { required: boolean };
};

export type ApplicationFormSection = {
  title: string;
  fields: ApplicationFormField[];
};

export type ApplicationForm = {
  sections: ApplicationFormSection[];
};

export type JobConfigurationFormOptions = {
  application_form: ApplicationForm;
};

export type StaticFormValues = {
  title: string;
  type: string;
  description: string;
  candidate_needed: number | undefined;
  salary_min: number | undefined;
  salary_max: number | undefined;
};

export type DynamicFormValues = Record<string, string | number | undefined>;

export type FormValues = StaticFormValues & DynamicFormValues;

export type Job = {
  title: string;
  type: string;
  description: string;
  candidate_needed: number;
  salary_min: number;
  salary_max: number;
};

// Job Type configuration payload
export type JobTypeOption = { value: string; label: string };
export type JobTypeOptionsPayload = { job_type_options: JobTypeOption[] };