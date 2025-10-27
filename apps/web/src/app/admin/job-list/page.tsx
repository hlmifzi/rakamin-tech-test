import JobListAdmin from "@/components/JobListAdmin";
import { FIVE_MINUTES } from "@/lib/constant";
import { getJobs } from "@/services/api/job.action";
import { getConfigurations, ConfigurationType } from "@/services/api/inputConfiguration.action";
import type { JobConfigurationFormOptions, JobTypeOptionsPayload } from "@/types/type";

export const revalidate = FIVE_MINUTES

const JobListAdminPage = async ({ searchParams }: { searchParams?: { search?: string } }) => {
  const search = searchParams?.search ?? "";
  const [jobsResult, configurations] = await Promise.all([
    getJobs({ page: 1, per: 100, sort_by: "created_at", sort_order: "desc", search }),
    getConfigurations([ConfigurationType.JOB_CONFIGURATION, ConfigurationType.JOB_TYPE_OPTIONS]),
  ]);
  const jobs = jobsResult?.data ?? [];

  // Ambil konfigurasi application form dari hasil configurations
  const jobConfig = (configurations.find(c => c.type === ConfigurationType.JOB_CONFIGURATION)?.form_options || null) as JobConfigurationFormOptions | null;
  const jobTypeOptionsPayload = (configurations.find(c => c.type === ConfigurationType.JOB_TYPE_OPTIONS)?.form_options || null) as JobTypeOptionsPayload | null;

  return (
    <div>
      <JobListAdmin
        key={search}
        jobs={jobs}
        configuration={jobConfig}
        jobTypeOptions={jobTypeOptionsPayload}
        initialQuery={search}
      />
    </div>
  );
}

export default JobListAdminPage