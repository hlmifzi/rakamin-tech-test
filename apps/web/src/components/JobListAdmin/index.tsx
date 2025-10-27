"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TextInput, Button, Typography, EmptyState, Card, Badge, UilSearch } from "@rakamin/ui";
import { ModalAddJobs } from "@/components/modalAddJobs/ModalAddJobs";
import { formatRupiah } from "@/lib/format";
import styles from "./jobs.module.scss";

type StrapiJob = {
  id: number;
  title: string;
  status?: "active" | "inactive" | string;
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

type Props = {
  jobs?: StrapiJob[];
};

 export default function JobsPage({ jobs = [] }: Props) {
   const [query, setQuery] = useState("");

  const [location] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesQuery =
        job.title?.toLowerCase().includes(query.toLowerCase());
      const matchesLocation = location ? job.location === location : true;
      return matchesQuery && matchesLocation;
    });
  }, [query, location, jobs]);

  return (
    <>
      <div className={styles.container}>
        <div>
          <div className={styles.searchBar}>
            <TextInput
              placeholder="Search by job details"
              value={query}
              onChange={setQuery}
              addonAfter={<UilSearch />}
            />
          </div>

          {Boolean(!filtered.length) ? (
            <EmptyState
              icon={
                <Image
                  src="/empty/artwork.svg"
                  alt="Empty state artwork"
                  width={306}
                  height={300}
                />
              }
              title="No job openings available"
              description="Create a job opening now and start the candidate process."
              primaryAction={
                <Button 
                  onClick={() => setIsModalOpen(true)} 
                  variant="secondary"
                >
                  Create a new job
                </Button>
              }
            />
          ) : (
            filtered.map((job, index) => (
              <Card key={index}>
                <div className={styles.badgeContainer}>
                  <Badge variant={job?.status === "active" ? "success" : job?.status === "inactive" ? "danger" : "warning"}>
                    <Typography className="rounded-lg" variant="TextMBold">
                      {job?.list_card?.badge || job?.status || "status"}
                    </Typography>
                  </Badge>
                  <Badge>
                    <Typography variant="TextMRegular">
                      {job?.list_card?.started_on_text || "started on 1 Oct 2025"}
                    </Typography>
                  </Badge>
                </div>
                <div className={styles.jobDescriptionContainer}>
                  <Typography variant="TextXLBold" className="text-neutral-100">
                    {job.title}
                  </Typography>
                  <Typography variant="TextLRegular" className="text-neutral-80">
                    {job?.salary_range?.display_text || `${formatRupiah(job?.salary_range?.min || 0)} - ${formatRupiah(job?.salary_range?.max || 0)}`}
                  </Typography>
                </div>

                <div className={styles.ctaManageJob}>
                  <Link href={`/admin/job-list/manage-candidate/${job.id}`}>
                    <Button variant="primary">
                      <Typography variant="TextSBold">
                        Manage Job
                      </Typography> 
                    </Button>
                  </Link>
                </div>
              </Card>
            ))
          )}
        </div>
        <div className={styles.ctaContainer}>
          <Image
            src="/admin/background-cta-create-job.webp"
            alt="Hero banner"
            fill
            priority
            quality={85}
            sizes="300px"
            className="object-cover"
          />
          <div className={styles.ctaOverlay} />
          <div className={styles.ctaInnerText}>
            <div>
              <Typography variant="TextXLBold">
                Recruit the best candidates
              </Typography>
              <Typography variant="TextMRegular">
                Create jobs, invite, and hire with ease
              </Typography>
            </div>
            <Button onClick={() => setIsModalOpen(true)} variant="primary">
              Create a new job
            </Button>
          </div>
        </div>
      </div>
      <ModalAddJobs
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => setIsModalOpen(false)}
      />
    </>
  );
}
