"use client";

import Image from "next/image";
import styles from "./jobList.module.scss";
import {
  Button,
  EmptyState,
  Typography,
  UilLocationPoint,
  UilMoneyBill,
} from "@rakamin/ui";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DetailJobListSkeleton } from "@/app/candidate/job-list/loading";

type JobType = {
  id: number | string;
  slug?: string;
  title: string;
  status?: "active" | "inactive" | string;
  description?: string;
  type?: "full-time" | "part-time" | string;
  location?: string; // optional field for filtering compatibility
  salary_range?: {
    min?: number;
    max?: number;
    display_text?: string;
    currency?: string;
  } | null;
  list_card?: {
    badge?: string;
    started_on_text?: string;
    cta?: string;
  } | null;
};

type JobListCandidateType = {
  jobs?: JobType[];
  selectedSlug?: string;
  selectedJobDetail?: JobType | undefined;
  userRole?: string;
};

const JobListCandidate = ({ jobs = [], selectedSlug = "", selectedJobDetail, userRole = "" }: JobListCandidateType) => {
  const safeJobs = Array.isArray(jobs) ? jobs : [];
  const params = useSearchParams();
  const currentSlug = params.get("slug") || selectedSlug || "";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  // userRole dikirim dari server, tidak membaca cookie di klien

  const selectedIndex = useMemo(() => {
    if (!safeJobs.length) return -1;

    if (selectedJobDetail) {
      const byId = safeJobs.findIndex((j) => String(j.id) === String(selectedJobDetail.id));
      if (byId >= 0) return byId;
      const bySlug = safeJobs.findIndex((j) => (j?.slug ?? String(j.id)) === (selectedJobDetail?.slug ?? String(selectedJobDetail.id)));
      if (bySlug >= 0) return bySlug;
    }

    if (currentSlug) {
      const idx = safeJobs.findIndex((j) => {
        const jobSlug = j?.slug ?? String(j.id);
        return jobSlug === currentSlug;
      });
      if (idx >= 0) return idx;
    }

    return 0;
  }, [safeJobs, currentSlug, selectedJobDetail]);

  const selectedJob = useMemo(() => {
    if (selectedJobDetail) return selectedJobDetail;
    return selectedIndex >= 0 ? safeJobs[selectedIndex] || null : null;
  }, [safeJobs, selectedIndex, selectedJobDetail]);

  // Read cookie once via lazy state initializer to avoid setState in effects

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {safeJobs.length > 0 ? (
          <>
            <div className={styles.listJobContainer}>
              {safeJobs.map((job, index) => (
                <div
                  key={String(job.id) || index}
                  className={`${index === selectedIndex ? styles.cardBorderSelected : styles.cardBorder}`}
                  onClick={() => {
                    const slug = job.slug ? String(job.slug) : String(job.id);
                    // Use transition untuk men-trigger skeleton detail sambil navigasi
                    startTransition(() => {
                      router.push(`/candidate/job-list?slug=${encodeURIComponent(slug)}`, { scroll: false });
                    });
                  }}
                >
                  <div className={styles.cardBorderHeader}>
                    <Image
                      src="/rakamin-logo.webp"
                      alt="artwork"
                      width={100}
                      height={100}
                      placeholder="blur"
                  blurDataURL="/tiny-blur.png"
                    />
                    <Typography variant="TextLBold" className="capitalize">{job.title}</Typography>
                    <Typography variant="TextMRegular">Rakamin</Typography>
                  </div>
                  <div className={styles.jobDescContainer}>
                    <div className={styles.jobDescItem}>
                      <UilLocationPoint />
                      <Typography variant="TextSRegular">Bogor</Typography>
                    </div>
                    <div className={styles.jobDescItem}>
                      <UilMoneyBill />
                      <Typography variant="TextSRegular">
                        {job?.salary_range?.display_text || "—"}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cardDetailJob}>
              <div className="relative">
                {isPending ? (
                  <DetailJobListSkeleton noBorder />
                ) : (
                  <div className={styles.cardBorderDetail}>
                  <Image
                    src="/rakamin-logo.webp"
                    alt="artwork"
                    width={100}
                    height={100}
                    placeholder="blur"
                  blurDataURL="/tiny-blur.png"
                  />
                  {selectedJob && (
                    <>
                      <Typography className={styles.jobType} variant="TextSBold">
                        {selectedJob?.type?.replaceAll("_", " ") || "Full-time"}
                      </Typography>
                      <Typography variant="TextLBold" className="capitalize">{selectedJob.title}</Typography>
                      <Typography variant="TextMRegular">Rakamin</Typography>
                    </>
                  )}
                  </div>
                )}
                {!isPending && (
                  <Link href={selectedJob ? (userRole ? `/candidate/apply/${selectedJob.id}` : `/auth?jobID=${encodeURIComponent(String(selectedJob.id))}`) : "#"}>
                    <Button className={styles.applyButton} variant="secondary">
                      <Typography variant="TextMBold">Apply</Typography>
                    </Button>
                  </Link>
                )}
              </div>

              <div className={styles.contentJobDetail}>
                
                <div className="whitespace-pre-line">
                  {isPending ? (
                    <></>
                  ) : selectedJob ? (
                    <>
                      {selectedJob.description}
                    </>
                  ) : (
                    <li>Select a job from the list to see details.</li>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyState
            icon="/empty/artwork.svg"
            title="No job openings available"
            description="Please wait for the next batch of openings."
          />
        )}
        
      </div>
    </div>
  );
};

export default JobListCandidate;
