import JobListCandidate from "@/components/JobListCandidate";
import { getJobs, getJobBySlug } from "@/services/api/job.action";
type SearchParams = { slug?: string };

// Ensure fresh data per navigation based on slug param
export const revalidate = 0;
export const dynamic = "force-dynamic";

const JobListCandidatePage = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const slug = searchParams?.slug || "";

  const [jobsResult, selectedJob] = await Promise.all([
    getJobs({ page: 1, per: 100, sort_by: "created_at", sort_order: "desc" }),
    slug ? getJobBySlug(slug) : Promise.resolve(null),
  ]);

  const jobs = jobsResult?.data ?? [];

  return (
    <div>
      <JobListCandidate jobs={jobs} selectedSlug={slug} selectedJobDetail={selectedJob || undefined} />
    </div>
  );
};

export default JobListCandidatePage;