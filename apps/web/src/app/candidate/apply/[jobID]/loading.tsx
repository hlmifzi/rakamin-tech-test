import styles from "@/app/candidate/apply/[jobID]/apply.module.scss";
import { Button, Typography } from "@rakamin/ui";

export default function Loading() {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.header}>
        <div className={styles.headerTitleContainer}>
          <div className={`${styles.backBtn} bg-neutral-30 rounded-lg animate-pulse`} />
          <div className="h-7 w-60 bg-neutral-30 rounded-md animate-pulse" />
        </div>
        <div className="h-5 w-56 bg-neutral-30 rounded-md animate-pulse" />
      </div>
      <div className={styles.content}>
        <div className="h-4 w-24 bg-neutral-30 rounded-md animate-pulse mb-4" />
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 w-full bg-neutral-30 rounded-md animate-pulse" />
          ))}
        </div>
      </div>
      <div className={styles.btnAction}>
        <Button variant="primary" disabled>
          <Typography variant="TextLBold">Loading</Typography>
        </Button>
      </div>
    </div>
  );
}