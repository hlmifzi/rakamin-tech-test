import JobListAdmin from "@/components/JobListAdmin";
import { FIVE_MINUTES } from "@/lib/constant";
import { getJobs } from "@/services/api/job.action";
import { getConfiguration, ConfigurationType } from "@/services/api/inputConfiguration.action";

export const revalidate = FIVE_MINUTES

const JobListAdminPage = async () => {
  const [jobs, configuration] = await Promise.all([
    getJobs(),
    getConfiguration(ConfigurationType.JOB_CONFIGURATION),
  ]);

  return (
    <div>
      <JobListAdmin jobs={jobs} configuration={configuration?.form_options} />
    </div>
  );
}

export default JobListAdminPage