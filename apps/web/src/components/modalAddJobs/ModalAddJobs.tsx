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
import { useForm, Controller, useWatch } from "react-hook-form";
import { useEffect, useMemo, useState, useCallback } from "react";
import { scrollToFirstError } from "@/lib/hook/scrollToFirstError";
import {
  JobConfigurationFormOptions,
  FormValues,
  FieldMode,
} from "@/types/type";

import styles from "./modalAddJobs.module.scss";


// types moved to '@/types/type'

export interface ModalAddJobsProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  configuration?: JobConfigurationFormOptions | null;
}

export function ModalAddJobs({
  open,
  onClose,
  onConfirm,
  configuration = null,
}: ModalAddJobsProps) {
  const dynamicKeys = (configuration?.application_form?.sections || [])
    .flatMap((section) => section.fields.map((f) => f.key));

  const defaultValues: FormValues = {
    title: "",
    type: "",
    description: "",
    candidate_needed: undefined,
    salary_min: undefined,
    salary_max: undefined,
    ...Object.fromEntries(dynamicKeys.map((k) => [k, ""]))
  };

  const { control, handleSubmit, formState, setValue, unregister, clearErrors } = useForm<FormValues>({
    defaultValues,
    mode: "onSubmit",
  });

  const { errors } = formState;
  const watchedValues = useWatch<FormValues>({ control });

  const asFormPrimitive = (v: unknown): string | number | undefined => {
    if (typeof v === "string" || typeof v === "number") return v;
    return undefined;
  };
  const initialModes = useMemo(() => {
    const modes: Record<string, FieldMode> = {};
    (configuration?.application_form?.sections || []).forEach((section) => {
      section.fields.forEach((f) => {
        modes[f.key] = f.validation?.required ? "mandatory" : "optional";
      });
    });
    return modes;
  }, [configuration]);

  const [fieldModes, setFieldModes] = useState<Record<string, FieldMode>>(initialModes);

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

  const applicationFormBuilt = useMemo(() => ({
    sections: (configuration?.application_form?.sections || []).map((section) => ({
      title: section.title,
      fields: section.fields
        .filter((f) => fieldModes[f.key] !== "off")
        .map((f) => ({
          key: f.key,
          validation: { required: fieldModes[f.key] === "mandatory" },
          value: asFormPrimitive(watchedValues?.[f.key as keyof FormValues]) ?? null,
        })),
    })),
  }), [configuration, fieldModes, watchedValues]);

  const onValid = useCallback((data: FormValues) => {
    const payload = {
      data,
      application_form: applicationFormBuilt,
    };
    console.log("[AddJob Submit Payload]", payload);
    onConfirm ? onConfirm() : onClose();
  }, [applicationFormBuilt, onConfirm, onClose]);

  const onInvalid = useCallback(() => {
    scrollToFirstError(errors);
  }, [errors]);

  
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Job Opening"
      className={styles.modalContainer}
      footer={
        <div>
          <Button
            variant="primary"
            onClick={handleSubmit(onValid, onInvalid)}
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
              options={[{ value: "intern", label: "inter" }]}
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
          render={({ field }) => (
              <NumberInput label="Minimum Estimated Salary" addonBefore="Rp" value={typeof field.value === 'number' ? field.value : undefined} onChange={field.onChange} name="salary_min" isError={Boolean(errors.salary_min)} />
            )}
          />
        </div>
        <div id="salary_max">
          <Controller
            name="salary_max"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <NumberInput label="Maximum Estimated Salary" addonBefore="Rp" value={typeof field.value === 'number' ? field.value : undefined} onChange={field.onChange} name="salary_max" isError={Boolean(errors.salary_max)} />
            )}
          />
        </div>
      </div>

      <div className={styles.borderForm}>
        {configuration?.application_form?.sections?.map((section, idx) => (
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
