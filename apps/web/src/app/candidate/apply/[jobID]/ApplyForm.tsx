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
} from "@rakamin/ui";
import { useForm, Controller } from "react-hook-form";
import styles from "./apply.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useTransition } from "react";
import { useToastStore } from "@/lib/store/toastStore";
import { scrollToFirstError } from "@/lib/hook/scrollToFirstError";

type Attribute = { key: string; label: string; value: string; order: number };

export default function ApplyForm({ jobID, onApply }: { jobID: string; onApply: (payload: { attributes: Attribute[] }) => Promise<void> }) {
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

  const handlePhotoCapture = (dataUrl: string) => {
    form.setValue("photo", dataUrl);
  };

  const onValid = (data: FormData) => {
    const genderLabel = data.pronoun === "female" ? "Female" : data.pronoun === "male" ? "Male" : "";
    const attributes: Attribute[] = [
      { key: "full_name", label: "Full Name", value: String(data.fullName || ""), order: 1 },
      { key: "email", label: "Email", value: String(data.email || ""), order: 2 },
      { key: "phone", label: "Phone", value: String(data.phoneNumber || ""), order: 3 },
      { key: "domicile", label: "Domicile", value: String(data.domicile || ""), order: 4 },
      { key: "gender", label: "Gender", value: genderLabel, order: 5 },
      { key: "linkedin_link", label: "LinkedIn", value: String(data.linkedin || ""), order: 6 },
      { key: "dob", label: "Date of Birth", value: String(data.dateOfBirth || ""), order: 7 },
      { key: "photo_profile", label: "Photo Profile", value: String(data.photo || ""), order: 8 },
    ];

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
            <Typography variant="TextXLBold">Apply Front End at Rakamin</Typography>
          </div>
          <div>
            <Typography variant="TextMRegular">ℹ️ This field required to fill</Typography>
          </div>
        </div>
        <div className={styles.content}>
          <Typography variant="TextSBold" className="text-danger mb-4">* Required</Typography>
          <TakePictureInput
            label="Photo Profile"
            defaultImageSrc="/candidate/default-picture.webp"
            form={form}
            name="photo"
            onCaptured={handlePhotoCapture}
          />

          <Controller
            name="fullName"
            rules={{ required: true }}
            control={form.control}
            render={({ field }) => (
              <TextInput
                placeholder="Enter Your Fullname"
                label="Full name"
                isMandatory
                value={field.value}
                onChange={field.onChange}
                isError={Boolean(errors.fullName)}
              />
            )}
          />

          <Controller
            name="dateOfBirth"
            rules={{ required: true }}
            control={form.control}
            render={({ field }) => (
              <DatePicker
                placeholder="Select date of birth"
                label="Date of birth"
                isMandatory
                format="DD MMMM YYYY"
                value={undefined}
                prefixIconSrc={<Image src={"/candidate/date.svg"} width={20} height={20} alt="icon date" />}
                onChange={(_, dateString) => field.onChange(Array.isArray(dateString) ? "" : dateString)}
              />
            )}
          />

          <div className="mb-4">
            <div className="mb-2">
              <Typography variant="TextSRegular">Pronoun (gender) <span className="text-danger">*</span></Typography>
            </div>
            <Controller
              name="pronoun"
              rules={{ required: true }}
              control={form.control}
              render={({ field }) => (
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-[10px] cursor-pointer">
                    <input type="radio" value="female" name={field.name} checked={field.value === "female"} onChange={() => field.onChange("female")} className="sr-only" />
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${field.value === "female" ? "border-primary" : "border-neutral-90"}`}>
                      {field.value === "female" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                      )}
                    </span>
                    <Typography variant="TextMRegular" className="text-neutral-90">She/her (Female)</Typography>
                  </label>
                  <label className="flex items-center gap-[10px] cursor-pointer">
                    <input type="radio" value="male" name={field.name} checked={field.value === "male"} onChange={() => field.onChange("male")} className="sr-only" />
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${field.value === "male" ? "border-primary" : "border-neutral-90"}`}>
                      {field.value === "male" && (
                        <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                      )}
                    </span>
                    <Typography variant="TextMRegular" className="text-neutral-90">He/him (Male)</Typography>
                  </label>
                </div>
              )}
            />
          </div>

          <Controller
            name="domicile"
            rules={{ required: true }}
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
                label="Domicile"
                isMandatory
                value={field.value}
                onChange={field.onChange}
                isError={Boolean(errors.domicile)}
              />
            )}
          />

          <Controller
            name="phoneNumber"
            rules={{ required: true }}
            control={form.control}
            render={({ field }) => (
              <PhoneNumberInput
                label="Phone number"
                isMandatory
                value={field.value ?? ""}
                onChange={(val) => form.setValue("phoneNumber", val ?? "", { shouldDirty: true })}
                country={form.watch("phoneCountry")}
                onCountryChange={(code) => form.setValue("phoneCountry", code)}
                placeholder="Enter phone number"
                isError={Boolean(errors.phoneNumber)}
              />
            )}
          />

          <Controller
            name="email"
            rules={{ required: true }}
            control={form.control}
            render={({ field }) => (
              <TextInput
                placeholder="Enter your email address"
                label="Email"
                isMandatory
                value={field.value}
                onChange={field.onChange}
                isError={Boolean(errors.email)}
              />
            )}
          />

          <Controller
            name="linkedin"
            rules={{ required: true }}
            control={form.control}
            render={({ field }) => (
              <TextInput
                placeholder="https://linkedin.com/in/username"
                label="Link Linkedin"
                isMandatory
                value={field.value}
                onChange={field.onChange}
                isError={Boolean(errors.linkedin)}
              />
            )}
          />
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