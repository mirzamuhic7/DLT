import React from "react";
import { Step, StepLabel, Stepper } from "@mui/material";

const VuiStepper = ({ steps = [], activeStep = 0 }) => {
  return (
    <Stepper  activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => {
        return (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default VuiStepper;
