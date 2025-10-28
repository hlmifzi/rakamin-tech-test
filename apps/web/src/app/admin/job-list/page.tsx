import JobListAdmin from "@/components/JobListAdmin";
import { getJobs, createJobs } from "@/services/api/job.action";
import { getConfigurations, ConfigurationType } from "@/services/api/inputConfiguration.action";
import { revalidatePath } from "next/cache";
import type { ApplicationForm, CreateJobData } from "@/types/jobActionType";
import type { JobConfigurationFormOptions, JobTypeOptionsPayload } from "@/types/type";

export const revalidate = 300;

const JobListAdminPage = async ({ searchParams }: { searchParams?: { search?: string } }) => {
  const resolvedParams = await searchParams;
  const search = resolvedParams?.search ?? "";

  const [jobsResult, configurations] = await Promise.all([
    getJobs({ page: 1, per: 10, sort_by: "created_at", sort_order: "desc", search }),
    getConfigurations([ConfigurationType.JOB_CONFIGURATION, ConfigurationType.JOB_TYPE_OPTIONS]),
  ]);
  const jobs = jobsResult?.data ?? [];

  const jobConfig = (configurations.find(c => c.type === ConfigurationType.JOB_CONFIGURATION)?.form_options || null) as JobConfigurationFormOptions | null;
  const jobTypeOptionsPayload = (configurations.find(c => c.type === ConfigurationType.JOB_TYPE_OPTIONS)?.form_options || null) as JobTypeOptionsPayload | null;

  const onCreateJob = async (payload: { data: CreateJobData; application_form?: ApplicationForm }) => {
    "use server";
    await createJobs(payload);
    revalidatePath("/admin/job-list");
    revalidatePath("/candidate/job-list");
  };

  return (
    <div>
      <JobListAdmin
        key={search}
        jobs={jobs}
        configuration={jobConfig}
        jobTypeOptions={jobTypeOptionsPayload}
        initialQuery={search}
        onCreateJob={onCreateJob}
      />
    </div>
  );
}

export default JobListAdminPage