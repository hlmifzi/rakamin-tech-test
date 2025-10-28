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

export type SalaryRange = {
  min: number;
  max: number;
  currency: string;
  display_text: string;
};

export type JobListCard = {
  badge?: string;
  started_on_text?: string;
  cta?: string;
} | null;

export type JobRow = {
  id: string;
  slug: string;
  title: string;
  status: "active" | "inactive" | string;
  salary_range: SalaryRange;
  list_card?: JobListCard;
  application_form?: ApplicationForm | null;
};

export type JobQueryOptions = {
  page?: number;
  per?: number;
  offset?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  search?: string;
  filters?: Record<string, string | number | boolean | null | undefined>;
};

export type CreateJobData = {
  title: string;
  type?: string;
  description?: string;
  candidate_needed?: number;
  salary_min?: number;
  salary_max?: number;
};