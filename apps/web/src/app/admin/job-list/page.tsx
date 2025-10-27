import JobListAdmin from "@/components/JobListAdmin";
import { getJobs } from "@/services/api/job.action";

const JobListAdminPage = async () => {
  const jobs = await getJobs();

  console.log(jobs);


  return (
    <div>
      <JobListAdmin jobs={jobs} />
    </div>
  );
}

export default JobListAdminPage