import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";

type Inputs = {
  Email: string;
  Password: string;
};

export default function login() {
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  function onSubmit<Inputs>(data: Inputs) {
    console.log(data);
    login(data.Email, data.Password);
    router.push("/");
  }

  function handleErrors(errors: Object) {
    console.log(errors);
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mb: 2 }}>
        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          justifyContent="space-between"
          height={350}
          component="form"
          onSubmit={handleSubmit(onSubmit, handleErrors)}
        >
          <Typography variant="h3" component="h1">
            Log In
          </Typography>
          <TextField
            {...register("Email", {
              required: "Email is required",
              value: "test@test.com",
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
              value: "123123",
            })}
            error={!!errors.Password}
            helperText={errors.Password?.message}
          />
          <Button variant="contained" type="submit">
            Log In
          </Button>
        </Box>
      </Paper>
      <Typography textAlign="center">
        Don't have an account? <Link href="/signup">Signup here</Link>
      </Typography>
    </Container>
  );
}
