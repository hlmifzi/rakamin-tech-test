"use client";
import Image from "next/image";
import { Typography } from "@rakamin/ui";
import styles from "./success.module.scss";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useEffect } from "react";

const ApplySuccessPage = () => {
  // Fire confetti once on mount
  useEffect(() => {
    const duration = 2 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // a bigger burst
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      scalar: 1.2,
      ticks: 200,
    });
  }, []);

  return (
    <div className={styles.root}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image
          src="/candidate/apply-success.svg"
          alt="Application sent successfully"
          width={306}
          height={300}
          className={styles.image}
          priority
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Typography variant="HeadingMBold" as="h1">
          🎉 Your application was sent!
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography variant="TextLRegular" className={styles.description}>
          Congratulations! You&apos;ve taken the first step towards a rewarding career at Rakamin. We look forward to learning more about you during the application process.
        </Typography>
      </motion.div>
    </div>
  );
};

export default ApplySuccessPage;