import { Snackbar } from "@mui/material";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import React, { forwardRef } from "react";

type Props = {
  open: boolean;
  severity: AlertColor;
  message: string;
  setOpen(value: boolean): void;
};

export default function PopupAlert({
  open,
  severity,
  message,
  setOpen,
}: Props) {
  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
