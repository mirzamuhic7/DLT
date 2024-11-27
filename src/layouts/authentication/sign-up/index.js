import { useState } from "react";
import { useForm } from "react-hook-form"; // Import React Hook Form
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signUpImage.png";
import VuiBox from "../../../components/VuiBox";
import VuiInput from "../../../components/VuiInput";
import VuiButton from "../../../components/VuiButton";
import VuiStepper from "../../../components/VuiStepper";
import VuiTypography from "../../../components/VuiTypography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton"; // For the toggle icon
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useSignUp } from "../../../api";
import CircularProgress from "@mui/material/CircularProgress";

function SignUpStepper() {
  const steps = ["Personal Details", "Professional Details", "Upload Photo"];

  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState(null); // State to store the avatar preview
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  const { mutate, isLoading } = useSignUp();

  const { register, handleSubmit, getValues, formState: { errors }, setValue, trigger } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      institution: "",
      yearsOfExperience: 0,
      profilePic: null,
      password: "",
    },
  });

  const validateStep = async () => {
    let fieldsToValidate = [];
    switch (activeStep) {
      case 0:
        fieldsToValidate = ["firstName", "lastName", "email", "password"];
        break;
      case 1:
        fieldsToValidate = ["subject", "institution", "yearsOfExperience"];
        break;
      case 2:
        fieldsToValidate = ["profilePic"];
        break;
      default:
        break;
    }
    return await trigger(fieldsToValidate);
  };

  const handleNext = async () => {
    const isStepValid = await validateStep();
    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append text fields
    formData.append("email", data.email);
    formData.append("firstName", data.firstName);
    formData.append("institution", data.institution);
    formData.append("lastName", data.lastName);
    formData.append("password", data.password);
    formData.append("subject", data.subject);
    formData.append("yearsOfExperience", data.yearsOfExperience);

    // Append file (if any)
    if (data.profilePic && data.profilePic instanceof File) {
      formData.append("profilePic", data.profilePic); // Make sure `profilePic` is a File
    }

    await mutate(formData);

  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("profilePic", file); // Update photo in React Hook Form
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <VuiBox sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              Prénom
            </VuiTypography>
            <VuiInput
              {...register("firstName", { required: "Le prénom est obligatoire." })}
              placeholder="Votre prénom..."
              error={!!errors.firstName}
            />
            {errors.firstName &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.firstName.message}</VuiTypography>}
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              Nom de famille
            </VuiTypography>
            <VuiInput
              {...register("lastName", { required: "Le nom de famille est obligatoire." })}
              placeholder="Votre nom..."
              error={!!errors.lastName}
            />
            {errors.lastName &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.lastName.message}</VuiTypography>}
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              Email
            </VuiTypography>
            <VuiInput
              {...register("email", {
                required: "L'adresse électronique est obligatoire.",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address." },
              })}
              placeholder="Votre email..."
              type="email"
              error={!!errors.email}
            />
            {errors.email &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.email.message}</VuiTypography>
            }
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              Password
            </VuiTypography>
            <VuiInput
              {...register("password", {
                required: "Le mot de passe est requis.",
                minLength: { value: 6, message: "Password must be at least 6 characters." },
              })}
              placeholder="Votre password..."
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              endAdornment={
                <IconButton sx={{ position: "absolute", right: 25 }} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff color="white" /> : <Visibility color="white" />}
                </IconButton>
              }
            />
            {errors.password &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.password.message}</VuiTypography>
            }
          </VuiBox>
        );
      case 1:
        return (
          <VuiBox sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              Subject
            </VuiTypography>
            <VuiInput
              {...register("subject", { required: "Subject is required." })}
              placeholder="Your subject..."
              error={!!errors.subject}
            />
            {errors.subject &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.subject.message}</VuiTypography>}

            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              School
            </VuiTypography>
            <VuiInput
              {...register("institution", { required: "School is required." })}
              placeholder="Your institution ..."
              error={!!errors.institution}
            />
            {errors.institution &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.institution.message}</VuiTypography>}
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              Years Of Experience
            </VuiTypography>
            <VuiInput
              type={"number"}
              {...register("yearsOfExperience", { required: "Years Of Experience is required." })}
              placeholder="Your years of experience ..."
              error={!!errors.yearsOfExperience}
            />
            {errors.yearsOfExperience &&
              <VuiTypography
                sx={{ color: "red", fontSize: "0.7rem" }}>{errors.yearsOfExperience.message}</VuiTypography>}
          </VuiBox>
        );
      case 2:
        return (
          <VuiBox sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              Upload Avatar
            </VuiTypography>

            {avatarPreview ? (
              <Avatar sx={{ width: 100, height: 100, marginBottom: "1em" }} src={avatarPreview} />
            ) : (
              <Avatar sx={{ width: 100, height: 100, marginBottom: "1em" }} />
            )}

            <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ marginBottom: "1em" }} />
            {errors.profilePic &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.profilePic.message}</VuiTypography>}
          </VuiBox>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <CoverLayout
      title="Welcome!"
      color="white"
      description="Create a new account with these forms."
      premotto="PRIME BETA SCHOOL"
      motto="PLATFORME POUR ENSEIGNANTS"
      image={bgSignIn}
    >
      {isLoading ?
        <VuiBox sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress color={"info"} />
        </VuiBox> :
        <VuiBox sx={{ width: "100%" }}>
          <VuiStepper activeStep={activeStep} steps={steps} />
          <VuiBox>{renderStepContent()}</VuiBox>
          <VuiBox display="flex" justifyContent="space-between" sx={{ marginTop: "2rem" }}>
            <VuiButton variant="contained" color="secondary" disabled={activeStep === 0} onClick={handleBack}>
              Back
            </VuiButton>
            {activeStep === steps.length - 1 ? (
              <VuiButton variant="gradient" gradient color="info" onClick={handleSubmit(onSubmit)} type="submit">
                Submit
              </VuiButton>
            ) : (
              <VuiButton variant="contained" color="info" onClick={handleNext}>
                Next
              </VuiButton>
            )}
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              You have an account?
              <VuiTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                Sign in
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>}
    </CoverLayout>
  );
}

export default SignUpStepper;
