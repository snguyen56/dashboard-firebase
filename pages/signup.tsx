import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useForm } from "react-hook-form";

type Inputs = {
  Email: string;
  Password: string;
  ConfirmPassword: string;
};

export default function signup() {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Inputs>();

  function onSubmit(data: Inputs) {
    signup(data.Email, data.Password);
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mb: 2 }}>
        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          justifyContent="space-between"
          height={400}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h3" component="h1">
            Sign Up
          </Typography>
          <TextField
            type="email"
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.Email}
            helperText={errors.Email?.message}
          />
          <TextField
            type="password"
            {...register("Password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.Password}
            helperText={errors.Password?.message}
          />
          <TextField
            type="password"
            {...register("ConfirmPassword", {
              required: "Confirm Password is required",
              validate: (val: string) => {
                if (watch("Password") != val) {
                  return "Passwords do not match";
                }
              },
            })}
            error={!!errors.ConfirmPassword}
            helperText={errors.ConfirmPassword?.message}
          />
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </Box>
      </Paper>
      <Typography textAlign="center">
        Already have an account? <Link href="/login">Login here</Link>
      </Typography>
    </Container>
  );
}
