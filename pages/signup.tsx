import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function signup() {
  const { signup, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  console.log(user);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signup(email, password);
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
          maxHeight="100vh"
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography variant="h3" component="h1">
            Sign Up
          </Typography>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </Box>
      </Paper>
      <Typography textAlign="center">
        Already have an account? Login here
      </Typography>
    </Container>
  );
}
