"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { TextInput, Button, Typography, EmptyState, Card, Badge, UilSearch } from "@rakamin/ui";
import { ModalAddJobs } from "@/components/modalAddJobs/ModalAddJobs";
import { formatRupiah } from "@/lib/format";
import styles from "./jobs.module.scss";

const JOBS = [
  {
    id: 1,
    title: "Frontend Engineer",
    company: "Rakamin",
    location: "Jakarta",
    status: "success",
    min_salary: 7000000,
    max_salary: 13000000,
    status_label: "active"
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Tokopedia",
    location: "Jakarta",
    status: "danger",
    min_salary: 7000000,
    max_salary: 13000000,
    status_label: "inactive"
  },
  {
    id: 4,
    title: "Mobile Developer",
    company: "Traveloka",
    location: "Jakarta",
    status: "warning",
    min_salary: 7000000,
    max_salary: 13000000,
    status_label: "draft"
  },
];

// ... existing code ...

// Locations list removed to satisfy lint (unused constant)

 export default function JobsPage() {
   const [query, setQuery] = useState("");

  const [location] = useState("");
   const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = useMemo(() => {
    return JOBS.filter((job) => {
      const matchesQuery =
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase());
      const matchesLocation = location ? job.location === location : true;
      return matchesQuery && matchesLocation;
    });
  }, [query, location]);

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
                  <Badge variant={job?.status}>
                    <Typography className="rounded-lg" variant="TextMBold">
                      {job?.status_label}
                    </Typography>
                  </Badge>
                  <Badge>
                    <Typography variant="TextMRegular">
                      started on 1 Oct 2025
                    </Typography>
                  </Badge>
                </div>
                <div className={styles.jobDescriptionContainer}>
                  <Typography variant="TextXLBold" className="text-neutral-100">
                    {job.title}
                  </Typography>
                  <Typography variant="TextLRegular" className="text-neutral-80">
                    {formatRupiah(job.min_salary)} - {formatRupiah(job.max_salary)}
                  </Typography>
                </div>

                <div className={styles.ctaManageJob}>
                  <Button variant="primary">
                    <Typography variant="TextSBold">
                      Manage Job
                    </Typography> 
                  </Button>
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
