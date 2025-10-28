import Image from "next/image";
import styles from "./jobList.module.scss";
import {
  Button,
  EmptyState,
  Typography,
  UilLocationPoint,
  UilMoneyBill,
} from "@rakamin/ui";
import Link from "next/link";

const jobListPage = async () => {
  const jobListLength = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {jobListLength.length > 0 ? (
          <>
            <div className={styles.listJobContainer}>
              {jobListLength.map((_, index) => (
                <div key={index} className={styles.cardBorder}>
                  <div className={styles.cardBorderHeader}>
                    <Image
                      src="/rakamin-logo.webp"
                      alt="artwork"
                      width={100}
                      height={100}
                      placeholder="blur"
                      blurDataURL="/tiny-blur.jpg"
                    />
                    <Typography variant="TextLBold">UX Designer</Typography>
                    <Typography variant="TextMRegular">Rakamin</Typography>
                  </div>
                  <div className={styles.jobDescContainer}>
                    <div className={styles.jobDescItem}>
                      <UilLocationPoint />
                      <Typography variant="TextSRegular">Jakarta Selatan</Typography>
                    </div>
                    <div className={styles.jobDescItem}>
                      <UilMoneyBill />
                      <Typography variant="TextSRegular">
                        Rp7.000.000 - Rp15.000.000
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.cardDetailJob}>
              <div className="relative">
                <div className={styles.cardBorderDetail}>
                  <Image
                    src="/rakamin-logo.webp"
                    alt="artwork"
                    width={100}
                    height={100}
                    placeholder="blur"
                    blurDataURL="/tiny-blur.jpg"
                  />
                  <Typography className={styles.jobType} variant="TextSBold">
                    Fulltime
                  </Typography>
                  <Typography variant="TextLBold">UX Designer</Typography>
                  <Typography variant="TextMRegular">Rakamin</Typography>
                </div>
                <Link href={"/candidate/apply/1212"}>
                  <Button className={styles.applyButton} variant="secondary">
                    <Typography variant="TextMBold">Apply</Typography>
                  </Button>
                </Link>
              </div>

              <div className={styles.contentJobDetail}>
                <ul>
                  <li>Develop, test, and maintain responsive, high-performance web applications using modern front-end technologies.</li>
                  <li>Collaborate with UI/UX designers to translate wireframes and prototypes into functional code.</li>
                  <li>Integrate front-end components with APIs and backend services.</li>
                  <li>Ensure cross-browser compatibility and optimize applications for maximum speed and scalability.</li>
                  <li>Write clean, reusable, and maintainable code following best practices and coding standards.</li>
                  <li>Participate in code reviews, contributing to continuous improvement and knowledge sharing.</li>
                  <li>Troubleshoot and debug issues to improve usability and overall application quality.</li>
                  <li>Stay updated with emerging front-end technologies and propose innovative solutions.</li>
                  <li>Collaborate in Agile/Scrum ceremonies, contributing to sprint planning, estimation, and retrospectives.</li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <EmptyState
            icon="/empty/artwork.svg"
            title="No job openings available"
            description="Please wait for the next batch of openings."
          />
        )}
        
      </div>
    </div>
  );
};

export default jobListPage;
