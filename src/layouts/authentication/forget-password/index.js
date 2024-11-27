import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgForgetPassword from "assets/images/signInImage.png"; // Replace with appropriate image
import CircularProgress from "@mui/material/CircularProgress";
import { useForgetPassword } from "api/auth/forgetPassword";

function ForgetPassword() {
    const [cooldown, setCooldown] = useState(0); // Cooldown timer state

    // Hook to handle the forgot-password request
    const { mutate, isLoading } = useForgetPassword();

    // react-hook-form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data) => {
        mutate(data.email, {
            onSuccess: () => {
                setCooldown(60); // Start cooldown on success
            },
        });
    };

    // Decrement cooldown every second
    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [cooldown]);

    return (
        <CoverLayout
            title="Forgot your password?"
            color="white"
            description="Enter your email address and we’ll send you instructions to reset your password"
            premotto="PRIME BETA SCHOOL"
            motto="PLATFORME POUR ENSEIGNANTS"
            image={bgForgetPassword} // Background image for forget password page
        >
            {isLoading ? (
                <VuiBox sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress color="info" />
                </VuiBox>
            ) : (
                <VuiBox component="form" onSubmit={handleSubmit(onSubmit)} role="form">
                    {/* Email Field */}
                    <VuiBox mb={2}>
                        <VuiBox>
                            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                                Email
                            </VuiTypography>
                        </VuiBox>
                        <VuiInput
                            {...register("email", {
                                required: "Email is required",
                                pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
                            })}
                            type="email"
                            placeholder="Your email address"
                        />
                        {errors.email && (
                            <VuiTypography variant="caption" color="error">
                                {errors.email.message}
                            </VuiTypography>
                        )}
                    </VuiBox>

                    {/* Submit Button */}
                    <VuiBox mt={4} mb={1}>
                        <VuiButton type="submit" color="info" fullWidth disabled={cooldown > 0}>
                            {cooldown > 0 ? `Try again in ${cooldown}s` : "Send Reset Link"}
                        </VuiButton>
                    </VuiBox>
                </VuiBox>
            )}
        </CoverLayout>
    );
}

export default ForgetPassword;
