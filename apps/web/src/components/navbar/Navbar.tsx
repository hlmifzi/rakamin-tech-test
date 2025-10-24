"use client";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import { Typography } from "@rakamin/ui";

export function Navbar() {
  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <Link href="/" className={styles.brand}>
            <Typography variant="TextXLBold" as="h1">
              Job List
            </Typography>
          </Link>
          <nav className={styles.profile}>
            <Image
              className={styles.avatar}
              src="/admin/avatar.svg"
              alt="Profile-admin"
              width={28}
              height={28}
              priority
            />
          </nav>
        </div>
      </div>
    </header>
  );
}
