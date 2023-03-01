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
import { useRouter } from "next/router";
import Link from "next/link";

export default function login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123123");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(email, password);
    router.push("/");
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
          maxHeight="100vh"
          component="form"
          onSubmit={handleSubmit}
        >
          <Typography variant="h3" component="h1">
            Log In
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
