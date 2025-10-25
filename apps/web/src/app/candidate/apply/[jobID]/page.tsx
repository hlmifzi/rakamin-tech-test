"use client";
import { Button, TextInput, Typography, UilArrowLeft, TakePictureInput, Select } from "@rakamin/ui"
import { useForm, Controller } from "react-hook-form"
import styles from "./apply.module.scss"

interface FormData {
    photo?: string;
    fullName?: string;
    domicile?: string;
    email?: string;
    linkedin?: string;
}

const ApplyPage = () => {
    const form = useForm<FormData>({
        defaultValues: {
            photo: "",
            fullName: "",
            domicile: "",
            email: "",
            linkedin: ""
        }
    });

    const handlePhotoCapture = (dataUrl: string) => {
        console.log("Photo captured:", dataUrl.substring(0, 50) + "...");
        form.setValue("photo", dataUrl);
    };

    const onSubmit = (data: FormData) => {
        console.log("Form submitted:", {
            ...data,
            photo: data.photo ? `${data.photo.substring(0, 50)}...` : "No photo"
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
                        <Typography variant="TextXLBold">Apply Front End at Rakamin</Typography>
                    </div>
                    <div>
                        <Typography variant="TextMRegular">ℹ️ This field required to fill</Typography>
                    </div>
                </div>
                <div className={styles.content}>
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
                        name="domicile"
                        control={form.control}
                        render={({ field }) => (
                            <Select 
                                options={[{value: "tes", label: "tis"}]} 
                                placeholder="Enter Your Domicile" 
                                label="Domicile" 
                                isMandatory 
                                value={field.value}
                                onChange={field.onChange}
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
                        <Typography variant="TextLBold">
                            Submit
                        </Typography>
                    </Button>
                </div>
            </div>
        </form>
    )
}

export default ApplyPage