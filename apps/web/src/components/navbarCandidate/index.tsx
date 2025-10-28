"use client";

import { Button, Typography } from "@rakamin/ui";
import styles from "./NavbarCandidate.module.scss";
import Image from "next/image";
import Link from "next/link";

export function NavbarCandidate() {

  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <nav className={styles.profile}>
            <Link href="/auth">
              <Button variant="text">
                Login / Register
              </Button>
            </Link>
            {/* <Image
              className={styles.avatar}
              src="/admin/avatar.svg"
              alt="Profile-admin"
              width={28}
              height={28}
              priority
              placeholder="blur"
              blurDataURL="/tiny-blur.jpg"
            /> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
