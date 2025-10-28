"use client";

import {
  Modal,
  Button,
  TextInput,
  Select,
  TextArea,
  NumberInput,
  Typography,
} from "@rakamin/ui";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useMemo, useState, useCallback, useTransition } from "react";
import { scrollToFirstError } from "@/lib/hook/scrollToFirstError";
import {
  JobConfigurationFormOptions,
  FormValues,
  FieldMode,
} from "@/types/type";
import type { ApplicationForm, CreateJobData } from "@/types/jobActionType";

import { useToastStore } from "@/lib/store/toastStore";

import styles from "./modalAddJobs.module.scss";

export interface ModalAddJobsProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  configuration?: JobConfigurationFormOptions | null;
  jobTypeOptions?: { value: string; label: string }[];
  onCreate: (payload: { data: CreateJobData; application_form?: ApplicationForm }) => Promise<void>;
}

export function ModalAddJobs({
  open,
  onClose,
  onConfirm,
  configuration = null,
  jobTypeOptions = [],
  onCreate,
}: ModalAddJobsProps) {
  const showToast = useToastStore((s) => s.showToast);
  // Fallback default application form when configuration is not available
  const defaultApplicationForm: ApplicationForm = {
    sections: [
      {
        title: "Minimum Profile Information Required",
        fields: [
          { key: "full_name", validation: { required: true } },
          { key: "photo_profile", validation: { required: true } },
          { key: "gender", validation: { required: false } },
          { key: "domicile", validation: { required: false } },
          { key: "email", validation: { required: true } },
          { key: "phone_number", validation: { required: false } },
          { key: "linkedin_link", validation: { required: false } },
          { key: "date_of_birth", validation: { required: false } },
        ],
      },
    ],
  };

  const effectiveSections = (configuration?.application_form?.sections?.length
    ? configuration.application_form.sections
    : defaultApplicationForm.sections);

  const dynamicKeys = effectiveSections.flatMap((section) =>
    section.fields.map((f) => f.key)
  );

  const defaultValues: FormValues = {
    title: "",
    type: "",
    description: "",
    candidate_needed: undefined,
    salary_min: undefined,
    salary_max: undefined,
    ...Object.fromEntries(dynamicKeys.map((k) => [k, ""]))
  };

  const { control, handleSubmit, formState, setValue, unregister, clearErrors, reset } = useForm<FormValues>({
    defaultValues,
    mode: "onSubmit",
  });

  const { errors } = formState;

  const handleCloseModal = useCallback(() => {
    // Bersihkan semua error saat modal ditutup
    clearErrors();
    onClose();
  }, [clearErrors, onClose]);

  const initialModes = useMemo(() => {
    const modes: Record<string, FieldMode> = {};
    effectiveSections.forEach((section) => {
      section.fields.forEach((f) => {
        modes[f.key] = f.validation?.required ? "mandatory" : "optional";
      });
    });
    return modes;
  }, [effectiveSections]);

  const [fieldModes, setFieldModes] = useState<Record<string, FieldMode>>(initialModes);
  const [submitting, setSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setFieldModes(initialModes);
  }, [initialModes]);

  const setFieldMode = useCallback((key: string, mode: FieldMode) => {
    setFieldModes((prev) => ({ ...prev, [key]: mode }));
    if (mode === "off") {
      setValue(key as string, undefined);
      clearErrors(key as string);
      unregister(key as string);
    }
  }, [setFieldModes, setValue, clearErrors, unregister]);

  const onValid = useCallback((data: FormValues) => {
    const createData: CreateJobData = {
      title: typeof data.title === "string" ? data.title : "",
      type: typeof data.type === "string" ? data.type : undefined,
      description: typeof data.description === "string" ? data.description : undefined,
      candidate_needed: typeof data.candidate_needed === "number" ? data.candidate_needed : undefined,
      salary_min: typeof data.salary_min === "number" && Number.isFinite(data.salary_min) ? data.salary_min : undefined,
      salary_max: typeof data.salary_max === "number" && Number.isFinite(data.salary_max) ? data.salary_max : undefined,
    };

    const applicationFormForAction: ApplicationForm = {
      sections: effectiveSections
        .map((section) => ({
          title: section.title,
          fields: section.fields
            .filter((f) => fieldModes[f.key] !== "off")
            .map((f) => ({
              key: f.key,
              validation: { required: fieldModes[f.key] === "mandatory" },
            })),
        })),
    };

    const payload = {
      data: createData,
      application_form: applicationFormForAction,
    };

    // Jalankan seluruh submit flow di dalam startTransition (sesuai standar yang diminta)
    startTransition(async () => {
      setSubmitting(true);
      try {
          await onCreate(payload);
          showToast("Job vacancy successfully created");
          reset();
          onConfirm ? onConfirm() : onClose();
      } catch (e) {
        let message = "Gagal membuat job. Coba lagi.";
        if (e && typeof e === "object") {
          const m = (e as Error).message || "";
          if (m.includes("DUPLICATE_SLUG")) {
            message = "Slug already exist. use uniq name";
          } else if (m.includes("CREATE_JOB_FAILED")) {
            message = "Failed to create job. Please try again.";
          }
        }
        showToast(message, "danger");
      } finally {
        setSubmitting(false);
      }
    });
  }, [effectiveSections, fieldModes, onConfirm, onClose, showToast, reset, onCreate]);

  const onInvalid = useCallback(() => {
    scrollToFirstError(errors);
    showToast("Submission failed. Please complete the form.", "danger");
  }, [errors, showToast]);

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      title="Job Opening"
      className={styles.modalContainer}
      footer={
        <div className={styles.publishButton}>
          <Button
            variant="primary"
            onClick={handleSubmit(onValid, onInvalid)}
            loading={submitting || isPending}
          >
            <Typography variant="TextMBold">Publish Job</Typography>
          </Button>
        </div>
      }
    >
      <div id="title">
        <Controller
          name="title"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextInput label="Job Name" isMandatory value={field.value} onChange={field.onChange} name="title" isError={Boolean(errors.title)} />
          )}
        />
      </div>
      <div id="type">
        <Controller
          name="type"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              label="Job Type"
              isMandatory
              options={jobTypeOptions?.length ? jobTypeOptions : [
                { value: "full_time", label: "Full-time" },
                { value: "contract", label: "Contract" },
                { value: "part_time", label: "Part-time" },
                { value: "internship", label: "Internship" },
                { value: "freelance", label: "Freelance" },
              ]}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select job type"
              isError={Boolean(errors.type)}
            />
          )}
        />
      </div>
      <div id="description">
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextArea label="Job Description" isMandatory value={field.value as string} onChange={field.onChange} name="description" isError={Boolean(errors.description)} />
          )}
        />
      </div>
      <div id="candidate_needed">
        <Controller
          name="candidate_needed"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <NumberInput label="Number of Candidate Needed" isMandatory value={typeof field.value === 'number' ? field.value : undefined} onChange={field.onChange} name="candidate_needed" isError={Boolean(errors.candidate_needed)} />
          )}
        />
      </div>
      <div className={styles.jobSalaryForm}>
        <Typography variant="TextSRegular">Job Salary</Typography>
      </div>
  <div className={styles.salaryInputContainer}>
    <div id="salary_min">
      <Controller
        name="salary_min"
        control={control}
        rules={{ required: false }}
        render={({ field }) => {
          const format = (num?: number) => (typeof num === "number" ? new Intl.NumberFormat("id-ID").format(num) : "");
          const parse = (raw: string) => {
            const digits = raw.replace(/\D/g, "");
            return digits ? Number(digits) : undefined;
          };
          return (
            <TextInput
              label="Minimum Estimated Salary"
              addonBefore="Rp"
              value={format(field.value as number | undefined)}
              onChange={(val) => field.onChange(parse(val))}
              name="salary_min"
              isError={Boolean(errors.salary_min)}
              placeholder="0"
            />
          );
        }}
      />
    </div>
    <div id="salary_max">
      <Controller
        name="salary_max"
        control={control}
        rules={{ required: false }}
        render={({ field }) => {
          const format = (num?: number) => (typeof num === "number" ? new Intl.NumberFormat("id-ID").format(num) : "");
          const parse = (raw: string) => {
            const digits = raw.replace(/\D/g, "");
            return digits ? Number(digits) : undefined;
          };
          return (
            <TextInput
              label="Maximum Estimated Salary"
              addonBefore="Rp"
              value={format(field.value as number | undefined)}
              onChange={(val) => field.onChange(parse(val))}
              name="salary_max"
              isError={Boolean(errors.salary_max)}
              placeholder="0"
            />
          );
        }}
      />
    </div>
  </div>

      <div className={styles.borderForm}>
        {effectiveSections.map((section, idx) => (
          <div key={idx}>
            <Typography className="mb-4" variant="TextMBold">
              {section.title}
            </Typography>
            <div className={styles.builderFormContainer}>
              <div key={idx}>
                {section.fields.map((field) => (
                  <div id={field.key} key={field.key} className={styles.builderFormItem}>
                    {/* Tampilkan key field sebagai label */}
                    <Typography variant="TextMRegular" className="mb-2 capitalize">{field.key.replaceAll('_', ' ')}</Typography>
                    <div className={styles.builderFormItemSetting}>
                      {(() => {
                        const isOrigRequired = field.validation?.required;
                        const mode = fieldModes[field.key];
                        const disableOthers = Boolean(isOrigRequired);
                        return (
                          <>
                            <Button
                              variant={mode === "mandatory" ? "tertiary" : "default"}
                              rounded
                              aria-pressed={mode === "mandatory"}
                              onClick={() => setFieldMode(field.key, "mandatory")}
                            >
                              <Typography variant="TextMRegular">Mandatory</Typography>
                            </Button>
                            <Button
                              variant={mode === "optional" ? "tertiary" : "default"}
                              rounded
                              aria-pressed={mode === "optional"}
                              disabled={disableOthers}
                              onClick={() => setFieldMode(field.key, "optional")}
                            >
                              <Typography variant="TextMRegular">Optional</Typography>
                            </Button>
                            <Button
                              variant={mode === "off" ? "tertiary" : "default"}
                              rounded
                              aria-pressed={mode === "off"}
                              disabled={disableOthers}
                              onClick={() => setFieldMode(field.key, "off")}
                            >
                              <Typography variant="TextMRegular">Off</Typography>
                            </Button>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default ModalAddJobs;
