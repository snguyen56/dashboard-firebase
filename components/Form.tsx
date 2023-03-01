import {
  Paper,
  Typography,
  Box,
  Button,
  Snackbar,
  Container,
} from "@mui/material";
import { FormEvent, useState, forwardRef } from "react";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

type Props = {
  children: React.ReactNode;
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Form({ children }: Props) {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");

  const handleClick = () => {
    setSeverity("success");
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleClick();
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" pb={2}>
        Create User
      </Typography>
      <Paper
        component="form"
        sx={{ p: 3, textAlign: "right" }}
        onSubmit={(event) => handleSubmit(event)}
      >
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gap="16px"
          mb={3}
        >
          {children}
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Create User
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity={severity}
            sx={{ width: "100%" }}
          >
            This is a submit message.
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}
