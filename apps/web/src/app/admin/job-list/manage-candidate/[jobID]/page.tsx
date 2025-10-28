import ManageJobsPage from "@/components/ManageCandidate";
import { getCandidateByJobId } from "@/services/api/candidate.action";
import { getJobById } from "@/services/api/job.action";

export const revalidate = 300;

const ManageCandidatePage = async ({ params }: { params: { jobID: string } }) => {
  const { jobID } = await params;

  const [candidates, job] = await Promise.all([
    getCandidateByJobId(jobID),
    getJobById(jobID),
  ]);

  return (
    <div>
      <ManageJobsPage jobID={jobID} candidates={candidates || []} jobTitle={job?.title || ""} />
    </div>
  )
}

export default ManageCandidatePage;