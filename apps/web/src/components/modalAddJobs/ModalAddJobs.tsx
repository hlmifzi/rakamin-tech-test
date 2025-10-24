"use client";
import { Modal, Button, TextInput, Select, TextArea, NumberInput, Typography } from "@rakamin/ui";
import styles from "./modalAddJobs.module.scss"

export interface ModalAddJobsProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

export function ModalAddJobs({
  open,
  onClose,
  onConfirm,
}: ModalAddJobsProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Job Opening"
      className={styles.modalContainer}
      footer={
        <div>
          <Button variant="primary" onClick={() => (onConfirm ? onConfirm() : onClose())}>
            <Typography variant="TextMBold">
              Publish Job
            </Typography>
          </Button>
        </div>
      }
    >
      <TextInput label="Job Name" isMandatory />
      <Select label="Job Type" isMandatory options={[{ value: "intern", label: "inter" }]} />
      <TextArea label="Job Description" isMandatory />
      <NumberInput  label="Number of Candidate Needed" isMandatory/>
      <div className={styles.jobSalaryForm}>
        <Typography variant="TextSRegular">Job Salary</Typography>
      </div>
      <div className={styles.salaryInputContainer}>
        <NumberInput label="Minimum Estimated Salary" addonBefore="Rp" />
        <NumberInput label="Maximum Estimated Salary" addonBefore="Rp" />
      </div>

      <div className={styles.borderForm}>
        <Typography className="mb-4" variant="TextMBold">
          Minimum Profile Information Required
        </Typography>

        <div className={styles.builderFormContainer}>
          <div className={styles.builderFormItem}>
            <Typography variant="TextMRegular">Full name</Typography>
            <div className={styles.builderFormItemSetting}>
              <Button variant="tertiary" rounded>
                 <Typography variant="TextMRegular">Mandatory</Typography>
              </Button>
              <Button variant="tertiary" rounded disabled>
                 <Typography variant="TextMRegular">Optional</Typography>
              </Button>
              <Button variant="default" rounded>
                 <Typography variant="TextMRegular">Off</Typography>
              </Button>
            </div>
          </div>
          <div className={styles.builderFormItem}>
            <Typography variant="TextMRegular">Full name</Typography>
            <div className={styles.builderFormItemSetting}>
              <Button variant="tertiary" rounded>
                 <Typography variant="TextMRegular">Mandatory</Typography>
              </Button>
              <Button variant="tertiary" rounded disabled>
                 <Typography variant="TextMRegular">Optional</Typography>
              </Button>
              <Button variant="default" rounded>
                 <Typography variant="TextMRegular">Off</Typography>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
    </Modal>
  );
}

export default ModalAddJobs;