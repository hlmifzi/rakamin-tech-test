"use client";

import styles from "./NavbarCandidate.module.scss";
import Image from "next/image";

export function NavbarCandidate() {

  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <div className={styles.inner}>
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
