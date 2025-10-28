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

const ApplyPage = () => {
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
  });

  const handlePhotoCapture = (dataUrl: string) => {
    console.log("Photo captured:", dataUrl.substring(0, 50) + "...");
    form.setValue("photo", dataUrl);
  };

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", {
      ...data,
      photo: data.photo ? `${data.photo.substring(0, 50)}...` : "No photo",
    });
  };

  // Watch form values untuk debug
  const watchedValues = form.watch();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className={styles.cardContainer}>
        <div className={styles.header}>
          <div className={styles.headerTitleContainer}>
            <Button variant="default" className={styles.backBtn}>
              <UilArrowLeft />
            </Button>
            <Typography variant="TextXLBold">
              Apply Front End at Rakamin
            </Typography>
          </div>
          <div>
            <Typography variant="TextMRegular">
              ℹ️ This field required to fill
            </Typography>
          </div>
        </div>
        <div className={styles.content}>
          <Typography variant="TextSBold" className="text-danger mb-4">
            * Required
          </Typography>
          <TakePictureInput
            label="Photo Profile"
            defaultImageSrc="/candidate/default-picture.webp"
            form={form}
            name="photo"
            onCaptured={handlePhotoCapture}
          />

          <Controller
            name="fullName"
            control={form.control}
            render={({ field }) => (
              <TextInput
                placeholder="Enter Your Fullname"
                label="Full name"
                isMandatory
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="dateOfBirth"
            control={form.control}
            render={({ field }) => (
              <DatePicker
                placeholder="Select date of birth"
                label="Date of birth"
                isMandatory
                format="DD MMMM YYYY"
                value={undefined}
                prefixIconSrc="/candidate/date.svg"
                onChange={(_, dateString) =>
                  field.onChange(Array.isArray(dateString) ? "" : dateString)
                }
              />
            )}
          />

          {/* Pronoun (gender) */}
          <div className="mb-4">
            <div className="mb-2">
              <Typography variant="TextSRegular">
                Pronoun (gender) <span className="text-danger">*</span>
              </Typography>
            </div>
            <Controller
              name="pronoun"
              rules={{ required: true }}
              control={form.control}
              render={({ field }) => (
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-[10px] cursor-pointer">
                    <input
                      type="radio"
                      value="female"
                      name={field.name}
                      checked={field.value === "female"}
                      onChange={() => field.onChange("female")}
                      className="peer sr-only"
                    />
                    <span className="w-5 h-5 rounded-full border-2 border-neutral-90 flex items-center justify-center">
                      <span className="hidden peer-checked:block w-2.5 h-2.5 rounded-full bg-primary"></span>
                    </span>
                    <Typography variant="TextMRegular" className="text-neutral-90">She/her (Female)</Typography>
                  </label>
                  <label className="flex items-center gap-[10px] cursor-pointer">
                    <input
                      type="radio"
                      value="male"
                      name={field.name}
                      checked={field.value === "male"}
                      onChange={() => field.onChange("male")}
                      className="peer sr-only"
                    />
                    <span className="w-5 h-5 rounded-full border-2 border-neutral-90 flex items-center justify-center">
                      <span className="hidden peer-checked:block w-2.5 h-2.5 rounded-full bg-primary"></span>
                    </span>
                    <Typography variant="TextMRegular" className="text-neutral-90">He/him (Male)</Typography>
                  </label>
                </div>
              )}
            />
          </div>

          <Controller
            name="domicile"
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
              />
            )}
          />

          {/* Phone number with country search */}
          <Controller
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <PhoneNumberInput
                label="Phone number"
                isMandatory
                value={field.value}
                onChange={field.onChange}
                country={form.watch("phoneCountry")}
                onCountryChange={(code) => form.setValue("phoneCountry", code)}
                placeholder="Enter phone number"
              />
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field }) => (
              <TextInput
                placeholder="Enter your email address"
                label="Email"
                isMandatory
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name="linkedin"
            control={form.control}
            render={({ field }) => (
              <TextInput
                placeholder="https://linkedin.com/in/username"
                label="Link Linkedin"
                isMandatory
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className={styles.btnAction}>
          <Button variant="primary" type="submit">
            <Typography variant="TextLBold">Submit</Typography>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ApplyPage;
