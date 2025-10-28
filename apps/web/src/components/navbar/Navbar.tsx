"use client";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import { Typography } from "@rakamin/ui";
import { Breadcrumb } from "../breadcrumb/Breadcrumb";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const isManageCandidate = pathname.startsWith("/admin/job-list/manage-candidate");
  const hasId = segments.length >= 4; // /admin/job-list/manage-candidate/[id]

  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <div className={styles.inner}>
          {isManageCandidate && hasId ? (
            <Breadcrumb className={styles.breadcrumb} linkClassName={styles.link} activeClassName={styles.active} />
          ) : (
            <Link href="/admin/job-list" className={styles.brand}>
              <Typography variant="TextXLBold" as="h1">
                Job List
              </Typography>
            </Link>
          )}
          <nav className={styles.profile}>
            <Image
              className={styles.avatar}
              src="/admin/avatar.svg"
              alt="Profile-admin"
              width={28}
              height={28}
              priority
              placeholder="blur"
              blurDataURL="/tiny-blur.jpg"
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
