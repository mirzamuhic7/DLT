import { useState } from "react";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signUpImage.png";
import VuiBox from "../../../components/VuiBox";
import VuiInput from "../../../components/VuiInput";
import VuiButton from "../../../components/VuiButton";
import VuiStepper from "../../../components/VuiStepper";
import VuiTypography from "../../../components/VuiTypography";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";

function SignUpStepper() {
  const steps = ["Personal Details", "Professional Details", "Upload Photo"];
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    school: "",
    photo: null,
  });

  const [errors, setErrors] = useState({});
  const [avatarPreview, setAvatarPreview] = useState(null); // State to store the avatar preview

  const validateStep = () => {
    const currentErrors = {};
    if (activeStep === 0) {
      if (!formData.firstName.trim()) currentErrors.firstName = "First name is required.";
      if (!formData.lastName.trim()) currentErrors.lastName = "Last name is required.";
    } else if (activeStep === 1) {
      if (!formData.email.trim()) currentErrors.email = "Email is required.";
      if (!formData.phone.trim()) currentErrors.phone = "Phone number is required.";
    } else if (activeStep === 2) {
      if (!formData.subject.trim()) currentErrors.subject = "Subject is required.";
      if (!formData.school.trim()) currentErrors.school = "School is required.";
      if (!formData.photo) currentErrors.photo = "Avatar is required.";
    }
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setAvatarPreview(URL.createObjectURL(file)); // Preview the selected avatar
    }
  };

  const handleSubmit = () => {
    if (validateStep()) {
      console.log("Form Submitted:", formData);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <VuiBox sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <VuiTypography sx={{ fontSize: "0.7rem", margin: "10px 0" }}>First Name</VuiTypography>
            <VuiInput
              fullWidth
              label="First Name"
              variant="outlined"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              error={!!errors.firstName}
            />

            <VuiTypography sx={{ fontSize: "0.7rem", margin: "10px 0" }}>Last Name</VuiTypography>
            <VuiInput
              fullWidth
              label="Last Name"
              variant="outlined"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              error={!!errors.lastName}
            />
            <VuiTypography sx={{ fontSize: "0.7rem", margin: "10px 0" }}>Email</VuiTypography>
            <VuiInput
              fullWidth
              label="Email"
              variant="outlined"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={!!errors.email}
            />
            <VuiTypography sx={{ fontSize: "0.7rem", margin: "10px 0" }}>Phone Number</VuiTypography>
            <VuiInput
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              error={!!errors.phone}
            />
          </VuiBox>
        );
      case 1:
        return (
          <VuiBox sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <VuiTypography sx={{ fontSize: "0.7rem", margin: "10px 0" }}>Subject</VuiTypography>
            <VuiInput
              fullWidth
              label="Subject"
              variant="outlined"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
              error={!!errors.subject}
            />
            <VuiTypography sx={{ fontSize: "0.7rem", margin: "10px 0" }}>School</VuiTypography>
            <VuiInput
              fullWidth
              label="School"
              variant="outlined"
              value={formData.school}
              onChange={(e) => handleChange("school", e.target.value)}
              error={!!errors.school}
            />
          </VuiBox>
        );
      case 2:
        return (
          <VuiBox sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <VuiTypography sx={{ fontSize: "0.7rem", margin: "10px 0" }}>Upload Avatar</VuiTypography>

            {/* Avatar Preview */}
            {avatarPreview ? (
              <Avatar sx={{ width: 100, height: 100, marginBottom: "1em" }} src={avatarPreview} />
            ) : (
              <Avatar sx={{ width: 100, height: 100, marginBottom: "1em" }} />
            )}

            {/* Avatar File Input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              style={{ marginBottom: "1em" }}
            />

            {errors.photo && <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.photo}</VuiTypography>}
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
          <VuiButton
            variant="contained"
            color="secondary"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </VuiButton>
          {activeStep === steps.length - 1 ? (
            <VuiButton variant="contained" color="success" onClick={handleSubmit}>
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
            You have an account?{" "}
            <VuiTypography
              component={Link}
              to="/authentication/sign-in"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Sign In
            </VuiTypography>
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignUpStepper;
