import React from "react";
import { Box, Typography } from "@mui/material";
import VuiStepperRoot from "./VuiStepperRoot";

const VuiStepper = ({ steps = [], activeStep = 0 }) => {
  return (
    <VuiStepperRoot activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;


        return (
          <Box key={index} className="step-container">
            {/* Circle */}
            <Box
              className={`step-circle ${isActive ? "active" : ""} ${
                isCompleted ? "completed" : ""
              }`}
            />

            {/* Line */}
            {index > 0 && (
              <Box className={`step-line ${index < activeStep + 1  ? "completed" : ""}`} />
            )}

            {/* Label */}
            <Typography
              variant="caption"
              className={`step-label ${isActive ? "active" : ""}`}
            >
              {label}
            </Typography>
          </Box>
        );
      })}
    </VuiStepperRoot>
  );
};

export default VuiStepper;
