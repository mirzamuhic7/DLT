import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper"; // Import Stepper component

const VuiStepperRoot = styled(Stepper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "90%",
  padding: "0px 20px", // Add spacing
  position: "relative",
  margin: "20px 0px 30px 0",

  ".step-container": {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    position: "relative",
    flex: "1",

    // Step Circle
    ".step-circle": {
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      backgroundColor: "#0075FF", // Default inactive color
      transition: "all 0.3s ease",
      zIndex: 1,
    },

    ".step-circle.active": {
      background: "#ffffff", // Active step color
      boxShadow: `0px 0px 6px #ffffff`, // Active shadow effect
    },

    ".step-circle.completed": {
      background: "#ffffff", // Completed step color
    },

    // Step Line
    ".step-line": {
      position: "absolute",
      top: "6px",
      left: "-50%",
      width: "100%",
      height: "2px",
      backgroundColor: "#0075FF", // Default line color
      zIndex: 0,
      transition: "background-color 0.3s ease", // Ensure smooth transition
    },

    ".step-line.completed": {
      backgroundColor: "#ffffff", // Completed step line color
    },

    "&:first-of-type .step-line": {
      display: "none", // Hide the first line
    },

    // Step Label
    ".step-label": {
      marginTop: "10px",
      fontSize: "12px",
      color: "#ffffff", // Default text color
      fontWeight: "400",
      transition: "color 0.3s ease",
    },

    ".step-label.active": {
      color: "#ffffff", // Active label color
      fontWeight: "600", // Bold active label
    },
  },
}));

export default VuiStepperRoot;
