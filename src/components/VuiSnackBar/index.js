import React from "react";
import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { hideSnackBar, useVisionUIController } from "../../context";

const VisionUISnackBar = () => {
  const [controller, dispatch] = useVisionUIController();
  const { snackBarOpen, snackBarMessage, snackBarSeverity } = controller;

  const handleClose = () => {
    hideSnackBar(dispatch);
  };

  return (
    <Snackbar
      open={snackBarOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <SnackbarContent
        style={{
          backgroundColor: snackBarSeverity === "error" ? "#f44336" : "#0075FF",
          color: "#ffffff",
          borderRadius: "8px",
        }}
        message={snackBarMessage}
        action={
          <IconButton size="small" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default VisionUISnackBar;
