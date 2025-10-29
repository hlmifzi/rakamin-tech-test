"use client";

import Image from "next/image";
import Link from "next/link";
import { TextInput, PasswordInput, Button, Typography, IconEmail, IconSSOLogin } from "@rakamin/ui";
import { motion } from "framer-motion";
import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useToastStore } from "@/lib/store/toastStore";
import styles from "@/app/auth/auth.module.scss";

export default function AuthForm({ jobID = "" }: { jobID?: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const showToast = useToastStore((s) => s.showToast);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "invalid") {
      showToast("Invalid username or password", "danger");
    }
  }, [searchParams, showToast]);

  return (
    <div className={styles.root}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={styles.loginContainer}
      >
        <div className={styles.logoContainer}>
          <Image
            src="/auth/logo-with-name.webp"
            alt="rakamin-logo"
            width={145}
            height={50}
            className={styles.image}
            priority
            placeholder="blur"
            blurDataURL="/tiny-blur.png"
          />
        </div>
        <div className={styles.loginCardContainer}>
          <div className={styles.loginCardTitle}>
            <Typography variant="HeadingMBold" as="h1">
              Log in to Rakamin
            </Typography>
            <Typography variant="TextMRegular" as="p">
              Don’t have an account yet? {" "}
              <Link href="/auth/signup" className={styles.spanSign}>
                Sign up with your email
              </Link>
            </Typography>
          </div>

          <form
            action="/api/auth/login"
            method="post"
            onSubmit={() => {
              startTransition(() => {
                setSubmitting(true);
              });
            }}
          >
            <input type="hidden" name="jobID" value={jobID} />
            <div className={styles.formGroup}>
              <TextInput
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div className={styles.formGroup}>
              <PasswordInput
                label="Password"
                id="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>

            <Link href="/auth/forgot-password" className={styles.spanSignForgot}>
              <Typography variant="TextMRegular" as="p">
                Forgot password?
              </Typography>
            </Link>
            <Button type="submit" variant="secondary" loading={submitting || isPending}>
              Log in
            </Button>
          </form>

          <div className={styles.divider}>
           <Typography variant="TextSRegular" as="p">or</Typography>
          </div>

          <div className={styles.ssoContainer}>
            <Button leftIcon={<IconEmail />} variant="default">
              Kirim link login melalui email
            </Button>
            <Button leftIcon={<IconSSOLogin />} variant="default">
              Masuk dengan Google
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}