"use client";

import { Button, Typography } from "@rakamin/ui";
import styles from "./NavbarCandidate.module.scss";
import Image from "next/image";
import Link from "next/link";
// Hover-only dropdown; no click state needed

type NavbarCandidateProps = {
  userRole?: string;
};

export function NavbarCandidate({ userRole }: NavbarCandidateProps) {

  return (
    <header className={styles.root}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <nav className={styles.profile}>
            {userRole ? (
              <div className="relative group">
                <Image
                  className={styles.avatar}
                  src="/admin/avatar.svg"
                  alt="Profile"
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
            ) : (
              <Link href="/auth">
                <Button variant="text">
                  Login / Register
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
