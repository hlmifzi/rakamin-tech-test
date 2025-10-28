"use client";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import { Typography, Button } from "@rakamin/ui";
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
            <div className="relative group">
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
              {/* Hilangkan gap (mt-0) supaya hover tidak putus saat pindah ke menu */}
              <div className="absolute right-0 top-full mt-0 hidden group-hover:block bg-white border border-neutral-40 rounded-md shadow-modal p-2 z-50 min-w-[160px]">
                <ul className="flex flex-col">
                  <li>
                    <form action="/api/auth/logout" method="post">
                      <Button type="submit" variant="text">Log out</Button>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
