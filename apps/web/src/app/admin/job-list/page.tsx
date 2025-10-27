import JobListAdmin from "@/components/JobListAdmin";
import { FIVE_MINUTES } from "@/lib/constant";
import { getJobs } from "@/services/api/job.action";
import { getConfigurations, ConfigurationType } from "@/services/api/inputConfiguration.action";
import type { JobConfigurationFormOptions, JobTypeOptionsPayload } from "@/types/type";

export const revalidate = FIVE_MINUTES

const JobListAdminPage = async () => {
  const [jobs, configurations] = await Promise.all([
    getJobs(),
    getConfigurations([ConfigurationType.JOB_CONFIGURATION, ConfigurationType.JOB_TYPE_OPTIONS]),
  ]);

  // Ambil konfigurasi application form dari hasil configurations
  const jobConfig = (configurations.find(c => c.type === ConfigurationType.JOB_CONFIGURATION)?.form_options || null) as JobConfigurationFormOptions | null;
  const jobTypeOptionsPayload = (configurations.find(c => c.type === ConfigurationType.JOB_TYPE_OPTIONS)?.form_options || null) as JobTypeOptionsPayload | null;

  return (
    <div>
      <JobListAdmin 
        jobs={jobs} 
        configuration={jobConfig} 
        options={jobTypeOptionsPayload}
      />
    </div>
  );
}

export default JobListAdminPage