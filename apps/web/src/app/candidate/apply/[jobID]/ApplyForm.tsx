"use client";
import {
  Button,
  TextInput,
  Typography,
  UilArrowLeft,
  TakePictureInput,
  SearchSelect,
  DatePicker,
  PhoneNumberInput,
  RadioGroup,
} from "@rakamin/ui";
import { useForm, Controller } from "react-hook-form";
import styles from "./apply.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useTransition, useMemo, useEffect } from "react";
import { useToastStore } from "@/lib/store/toastStore";
import { scrollToFirstError } from "@/lib/hook/scrollToFirstError";
import type { ApplicationForm } from "@/types/type";

type Attribute = { key: string; label: string; value: string; order: number };

export default function ApplyForm({ jobID, jobTitle, applicationForm, onApply }: { jobID: string; jobTitle?: string; applicationForm?: ApplicationForm; onApply: (payload: { attributes: Attribute[] }) => Promise<void> }) {
  const { showToast } = useToastStore.getState();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  interface FormData {
    photo?: string;
    fullName?: string;
    domicile?: string;
    email?: string;
    linkedin?: string;
    dateOfBirth?: string;
    pronoun?: string;
    phoneNumber?: string;
    phoneCountry?: string;
  }

  const form = useForm<FormData>({
    defaultValues: {
      photo: "",
      fullName: "",
      domicile: "",
      email: "",
      linkedin: "",
      dateOfBirth: "",
      pronoun: "",
      phoneNumber: "",
      phoneCountry: "ID",
    },
    mode: "onSubmit",
  });

  const { errors } = form.formState;

  const flatFields = useMemo(() => (
    (applicationForm?.sections || []).flatMap((section) => section.fields || [])
  ), [applicationForm]);

  // Build a fast lookup set for required fields from applicationForm
  const requiredKeys = useMemo(() => new Set(
    flatFields.filter((f) => Boolean(f?.validation?.required)).map((f) => f.key)
  ), [flatFields]);
  const isRequired = (key: string) => requiredKeys.has(key);

  // Register validation rule for photo so errors.photo works
  useEffect(() => {
    const requiredPhoto = isRequired("photo_profile");
    form.register("photo", { required: requiredPhoto });
  }, [form, requiredKeys]);

  // Adapter to satisfy UI component's FormAdapter signature without changing form behavior
  const formAdapter = useMemo(() => ({
    setValue: (name: string, value: unknown, options?: unknown) => {
      // Bridge to react-hook-form typed key
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form.setValue(name as keyof FormData, value as any, options as any);
    },
  }), [form]);

  const LABELS: Record<string, string> = {
    full_name: "Full Name",
    email: "Email",
    phone_number: "Phone",
    domicile: "Domicile",
    gender: "Pronoun (gender)",
    linkedin_link: "LinkedIn",
    date_of_birth: "Date of Birth",
    photo_profile: "Photo Profile",
  };

  const FORM_NAME_BY_KEY: Record<string, keyof FormData> = {
    full_name: "fullName",
    email: "email",
    phone_number: "phoneNumber",
    domicile: "domicile",
    gender: "pronoun",
    linkedin_link: "linkedin",
    date_of_birth: "dateOfBirth",
    photo_profile: "photo",
  };

  const handlePhotoCapture = (dataUrl: string) => {
    // Set nilai foto dan lakukan validasi agar error terhapus ketika foto tersedia
    form.setValue("photo", dataUrl, { shouldValidate: true, shouldDirty: true });
    form.clearErrors("photo");
  };

  const onValid = (data: FormData) => {
    const attributes: Attribute[] = flatFields.map((f, idx) => {
      const key = f.key;
      const label = LABELS[key] || key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
      let value = "";
      switch (key) {
        case "gender": {
          const v = data.pronoun;
          value = v === "female" ? "Female" : v === "male" ? "Male" : "";
          break;
        }
        case "phone_number": {
          value = String(data.phoneNumber || "").trim();
          break;
        }
        case "full_name": {
          value = String(data.fullName || "");
          break;
        }
        case "domicile": {
          value = String(data.domicile || "");
          break;
        }
        case "linkedin_link": {
          value = String(data.linkedin || "");
          break;
        }
        case "date_of_birth": {
          value = String(data.dateOfBirth || "");
          break;
        }
        case "photo_profile": {
          value = String(data.photo || "");
          break;
        }
        case "email":
        default: {
          const formName = FORM_NAME_BY_KEY[key as keyof typeof FORM_NAME_BY_KEY];
          value = String((formName ? data[formName] : "") || "");
          break;
        }
      }
      return { key, label, value, order: idx + 1 };
    });

    startTransition(async () => {
      try {
        await onApply({ attributes });
        showToast("Application submitted successfully");
        router.replace("/candidate/apply/success");
      } catch (e) {
        showToast("Failed to submit application", "danger");
      }
    });
  };

  const onInvalid = () => {
    scrollToFirstError(errors);
    showToast("Please complete required fields", "danger");
  };

  return (
    <form onSubmit={form.handleSubmit(onValid, onInvalid)}>

      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <div className={styles.headerTitleContainer}>
            <Link href="/candidate/job-list">
              <Button variant="default" className={styles.backBtn}>
                <UilArrowLeft />
              </Button>
            </Link>
            <Typography variant="TextXLBold">Apply {jobTitle || "Job"} at Rakamin</Typography>
          </div>
          <div>
            <Typography variant="TextMRegular">ℹ️ This field required to fill</Typography>
          </div>
        </div>
        <div className={styles.content}>
          <Typography variant="TextSBold" className="text-danger mb-4">* Required</Typography>

          {flatFields.map((f) => {
            const key = f.key;
            const label = LABELS[key] || key;
            const required = isRequired(key);

            // Specialized renders per key
            if (key === "photo_profile") {
              return (
                <TakePictureInput
                  key={key}
                  label={label}
                  isMandatory={required}
                  // Tampilkan error hanya setelah form di-submit
                  isError={form.formState.isSubmitted && Boolean(errors.photo)}
                  defaultImageSrc="/candidate/default-picture.webp"
                  form={formAdapter}
                  name="photo"
                  onCaptured={handlePhotoCapture}
                />
              );
            }

            if (key === "date_of_birth") {
              return (
                <Controller
                  key={key}
                  name="dateOfBirth"
                  rules={{ required }}
                  control={form.control}
                  render={({ field }) => (
                    <DatePicker
                      placeholder="Select date of birth"
                      label={label}
                      isMandatory={required}
                      format="DD MMMM YYYY"
                      value={undefined}
                      prefixIconSrc={<Image src={"/candidate/date.svg"} width={20} height={20} alt="icon date" />}
                      onChange={(_, dateString) => field.onChange(Array.isArray(dateString) ? "" : dateString)}
                    />
                  )}
                />
              );
            }

            if (key === "gender") {
              return (
                <Controller
                  key={key}
                  name="pronoun"
                  rules={{ required }}
                  control={form.control}
                  render={({ field }) => (
                    <RadioGroup
                      label={label}
                      isMandatory={required}
                      name={field.name}
                      options={[
                        { label: "She/her (Female)", value: "female" },
                        { label: "He/him (Male)", value: "male" },
                      ]}
                      value={field.value}
                      onChange={field.onChange}
                      error={form.formState.isSubmitted && Boolean(errors.pronoun)}
                      helperText={form.formState.isSubmitted && Boolean(errors.pronoun) ? "* field pronoun is required" : undefined}
                    />
                  )}
                />
              );
            }

            if (key === "domicile") {
              return (
                <Controller
                  key={key}
                  name="domicile"
                  rules={{ required }}
                  control={form.control}
                  render={({ field }) => (
                    <SearchSelect
                      options={[
                        { value: "aceh-barat", label: "Kabupaten Aceh Barat" },
                        { value: "aceh-barat-daya", label: "Kabupaten Aceh Barat Daya" },
                        { value: "aceh-besar", label: "Kabupaten Aceh Besar" },
                        { value: "aceh-jaya", label: "Kabupaten Aceh Jaya" },
                        { value: "aceh-utara", label: "Kabupaten Aceh Utara" },
                        { value: "banda-aceh", label: "Kota Banda Aceh" },
                        { value: "lhokseumawe", label: "Kota Lhokseumawe" },
                      ]}
                      placeholder="Enter Your Domicile"
                      label={label}
                      isMandatory={required}
                      value={field.value}
                      onChange={field.onChange}
                      isError={form.formState.isSubmitted && Boolean(errors.domicile)}
                    />
                  )}
                />
              );
            }

            if (key === "phone_number") {
              return (
                <Controller
                  key={key}
                  name="phoneNumber"
                  rules={{
                    required,
                    validate: (v) => {
                      const val = (v ?? "").trim();
                      if (!val) return !required;
                      // Allow typical phone characters: digits, spaces, plus, parentheses, hyphen
                      return /^[\d\s()+-]+$/.test(val);
                    },
                  }}
                  control={form.control}
                  render={({ field }) => (
                    <PhoneNumberInput
                      label={label}
                      isMandatory={required}
                      value={field.value ?? ""}
                      onChange={(val) => {
                        // Store raw string to avoid over-sanitizing into empty values
                        field.onChange(typeof val === "string" ? val : String(val ?? ""));
                      }}
                      country={form.watch("phoneCountry")}
                      onCountryChange={(code) => form.setValue("phoneCountry", code)}
                      placeholder="Enter phone number"
                      isError={form.formState.isSubmitted && Boolean(errors.phoneNumber)}
                    />
                  )}
                />
              );
            }

            if (key === "email") {
              return (
                <Controller
                  key={key}
                  name="email"
                  rules={{ required }}
                  control={form.control}
                  render={({ field }) => (
                    <TextInput
                      placeholder="Enter your email address"
                      label={label}
                      isMandatory={required}
                      value={field.value}
                      onChange={field.onChange}
                      isError={form.formState.isSubmitted && Boolean(errors.email)}
                    />
                  )}
                />
              );
            }

            if (key === "linkedin_link") {
              return (
                <Controller
                  key={key}
                  name="linkedin"
                  rules={{ required }}
                  control={form.control}
                  render={({ field }) => (
                    <TextInput
                      placeholder="https://linkedin.com/in/username"
                      label={label}
                      isMandatory={required}
                      value={field.value}
                      onChange={field.onChange}
                      isError={form.formState.isSubmitted && Boolean(errors.linkedin)}
                    />
                  )}
                />
              );
            }

            if (key === "full_name") {
              return (
                <Controller
                  key={key}
                  name="fullName"
                  rules={{ required }}
                  control={form.control}
                  render={({ field }) => (
                    <TextInput
                      placeholder="Enter Your Fullname"
                      label={label}
                      isMandatory={required}
                      value={field.value}
                      onChange={field.onChange}
                      isError={form.formState.isSubmitted && Boolean(errors.fullName)}
                    />
                  )}
                />
              );
            }

            // Unknown key: skip rendering to keep form type-safe
            return null;
          })}
        </div>
        <div className={styles.btnAction}>
          <Button variant="primary" type="submit" loading={isPending}>
            <Typography variant="TextLBold">Submit</Typography>
          </Button>
        </div>
      </div>
    </form>
  );
}