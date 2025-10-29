import JobListCandidate from "@/components/JobListCandidate";
import { getJobs, getJobBySlug } from "@/services/api/job.action";
import { headers } from "next/headers";

type SearchParams = { slug?: string };

export const dynamic = "force-dynamic";

const JobListCandidatePage = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const searchParamsRes = await searchParams || {slug: ""};
  const slug = searchParamsRes?.slug || "";


  const [jobsResult, selectedJob] = await Promise.all([
    getJobs({ page: 1, per: 10, sort_by: "created_at", sort_order: "desc" }),
    slug ? getJobBySlug(slug) : Promise.resolve(null),
  ]);

  const jobs = jobsResult?.data ?? [];
  const hdrs = await headers();
  const cookieHeader = hdrs.get("cookie") || "";
  const userRole = (cookieHeader.split("; ").find((row: string) => row.startsWith("role=")) || "").split("=")[1] || "";

  return (
    <div>
      <JobListCandidate jobs={jobs} selectedSlug={slug} selectedJobDetail={selectedJob || undefined} userRole={userRole} />
    </div>
  );
};

export default JobListCandidatePage;
