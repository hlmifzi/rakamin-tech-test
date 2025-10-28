"use client";
 import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TextInput, Button, Typography, EmptyState, Card, Badge, UilSearch, SkeletonTable, SkeletonInput } from "@rakamin/ui";
import { ModalAddJobs } from "@/components/modalAddJobs/ModalAddJobs";
import { formatRupiah } from "@/lib/format";
import type { JobTypeOptionsPayload } from "@/types/type";
import type { CreateJobData } from "@/types/jobActionType";
import { useRouter } from "next/navigation";
import { JobListSkeleton } from "@/app/admin/job-list/loading";

import styles from "./jobs.module.scss";
import { useForm, Controller } from "react-hook-form";

type JobType = {
  id: number | string;
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
  jobs?: JobType[];
  configuration?: JobConfigurationFormOptions | null;
  jobTypeOptions?: JobTypeOptionsPayload | null;
  initialQuery?: string;
  onCreateJob?: (payload: { data: CreateJobData; application_form?: ApplicationForm }) => Promise<void>;
};

type ApplicationFormField = { key: string; validation: { required: boolean } };
type ApplicationFormSection = { title: string; fields: ApplicationFormField[] };
type ApplicationForm = { sections: ApplicationFormSection[] };
type JobConfigurationFormOptions = { application_form: ApplicationForm };

 type SearchForm = { search: string };

 export default function JobsPage({ jobs = [], configuration = null, jobTypeOptions = null, initialQuery = "", onCreateJob }: Props) {
   const { control, handleSubmit } = useForm<SearchForm>({
     defaultValues: { search: initialQuery || "" },
   });
   const [isSearching, setIsSearching] = useState(false);
   const router = useRouter();

  // Client no longer syncs query via effect; re-init handled by key

  const [isModalOpen, setIsModalOpen] = useState(false);

  const safeJobs = Array.isArray(jobs) ? jobs : [];

  const handleSubmitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleSubmit(({ search }) => {
      const q = (search || "").trim();
      const prev = (initialQuery || "").trim();
      const url = q ? `/admin/job-list?search=${encodeURIComponent(q)}` : `/admin/job-list`;

      // Jika query sama dengan yang sudah aktif, jangan tahan skeleton
      if (q === prev) {
        router.replace(url);
        setIsSearching(false);
        return;
      }

      // Tampilkan skeleton saat navigasi ke query baru
      setIsSearching(true);
      router.push(url);
    })();
  };

  // Reset skeleton setelah server-side render selesai (ketika initialQuery berubah)
  useEffect(() => {
    setIsSearching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  return (
    <>
      <div className={styles.container} key={initialQuery}>
        <div>
          <div className={styles.searchBar}>
            <form onSubmit={handleSubmitSearch} key={initialQuery}>
              <Controller
                name="search"
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Search by job details"
                    value={field.value}
                    onChange={field.onChange}
                    addonAfter={
                      <button type="submit" aria-label="Search">
                        <UilSearch />
                      </button>
                    }
                  />
                )}
              />
            </form>
          </div>

          {isSearching ? (
            <div className="p-6">
              <div className="mb-6"><SkeletonInput className="w-12" /></div>
              <JobListSkeleton />
            </div>
          ) : Boolean(!safeJobs.length) ? (
            <EmptyState
              icon={
                <Image
                  src="/empty/artwork.svg"
                  alt="Empty state artwork"
                  width={306}
                  height={300}
                  placeholder="blur"
                  blurDataURL="/tiny-blur.jpg"
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
            safeJobs.map((job) => (
              <Card key={String(job.id)}>
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
                        {job?.list_card?.cta || "Manage Job"}
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
            placeholder="blur"
            blurDataURL="/tiny-blur.jpg"
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
        configuration={configuration}
        jobTypeOptions={jobTypeOptions?.job_type_options ?? []}
        onCreate={onCreateJob}
      />
    </>
  );
}
