import ApplyForm from "@/app/candidate/apply/[jobID]/ApplyForm";
import { createCandidate } from "@/services/api/candidate.action";
import { revalidatePath } from "next/cache";

type Attribute = { key: string; label: string; value: string; order: number };

export default async function ApplyPage({ params }: { params: { jobID: string } }) {
  const paramsResult =  await params;
  const jobID = paramsResult.jobID;

  async function onApply(payload: { attributes: Attribute[] }) {
    "use server";
    const payloads = { apply_jobs_id: jobID, attributes: payload.attributes }
    await createCandidate(payloads);
    revalidatePath(`/admin/job-list/manage-candidate/${jobID}`);
  }

  return <ApplyForm jobID={jobID} onApply={onApply} />;
}
