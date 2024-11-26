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

function SignUpStepper() {
  const steps = ["Personal Details", "Professional Details", "Upload Photo"];
  const [activeStep, setActiveStep] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState(null); // State to store the avatar preview
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  const { register, handleSubmit , getValues, formState: { errors }, setValue, trigger } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      school: "",
      photo: null,
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
        fieldsToValidate = ["subject", "school"];
        break;
      case 2:
        fieldsToValidate = ["photo"];
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

  const onSubmit = (data) => {
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("photo", file); // Update photo in React Hook Form
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <VuiBox sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white" fontWeight="medium">
              Prénom
            </VuiTypography>
            <VuiInput
              {...register("firstName", { required: "Le prénom est obligatoire." })}
              placeholder="Votre prénom..."
              error={!!errors.firstName}
            />
            {errors.firstName && <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.firstName.message}</VuiTypography>}
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white" fontWeight="medium">
              Nom de famille
            </VuiTypography>
            <VuiInput
              {...register("lastName", { required: "Le nom de famille est obligatoire." })}
              placeholder="Votre nom..."
              error={!!errors.lastName}
            />
            {errors.lastName &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.lastName.message}</VuiTypography>}
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white" fontWeight="medium">
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
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white" fontWeight="medium">
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
                <IconButton sx={{ position: "absolute", right: 10 }} onClick={() => setShowPassword(!showPassword)}>
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
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white" fontWeight="medium">
              Subject
            </VuiTypography>
            <VuiInput
              {...register("subject", { required: "Subject is required." })}
              placeholder="Your subject..."
              error={!!errors.subject}
            />
            {errors.subject &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.subject.message}</VuiTypography>}

            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white" fontWeight="medium">
              School
            </VuiTypography>
            <VuiInput
              {...register("school", { required: "School is required." })}
              placeholder="Your school..."
              error={!!errors.school}
            />
            {errors.school &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.school.message}</VuiTypography>}
          </VuiBox>
        );
      case 2:
        return (
          <VuiBox sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white" fontWeight="medium">
              Upload Avatar
            </VuiTypography>

            {avatarPreview ? (
              <Avatar sx={{ width: 100, height: 100, marginBottom: "1em" }} src={avatarPreview} />
            ) : (
              <Avatar sx={{ width: 100, height: 100, marginBottom: "1em" }} />
            )}

            <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ marginBottom: "1em" }} />
            {errors.photo &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.photo.message}</VuiTypography>}
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
      <VuiBox sx={{ width: "100%", padding: 3 }}>
        <VuiStepper activeStep={activeStep} steps={steps} />
        <VuiBox>{renderStepContent()}</VuiBox>
        <VuiBox display="flex" justifyContent="space-between" sx={{ marginTop: "2rem" }}>
          <VuiButton variant="contained" color="secondary" disabled={activeStep === 0} onClick={handleBack}>
            Back
          </VuiButton>
          {activeStep === steps.length - 1 ? (
            <VuiButton variant="contained" color="success" onClick={handleSubmit(onSubmit)} type="submit">
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
      </VuiBox>
    </CoverLayout>
  );
}

export default SignUpStepper;
