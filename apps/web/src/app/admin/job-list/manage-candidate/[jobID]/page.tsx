import ManageJobsPage from "@/components/ManageCandidate";
import { FIVE_MINUTES } from "@/lib/constant";
import { getCandidateByJobId } from "@/services/api/candidate.action";

export const revalidate = FIVE_MINUTES

const ManageCandidatePage = async ({ params }: { params: { jobID: string } }) => {
  const { jobID } = await params;

  const candidates = await getCandidateByJobId(jobID);

  return (
    <div>
      <ManageJobsPage jobID={jobID} candidates={candidates || []} />
    </div>
  )
}

export default ManageCandidatePage;