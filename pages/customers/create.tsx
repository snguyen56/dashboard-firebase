import { Paper, Typography, TextField, Box, Button } from "@mui/material";
import { Container } from "@mui/system";

export default function create() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" pb={2}>
        Create User
      </Typography>
      <Paper component="form" sx={{ p: 3, textAlign: "right" }}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gap="16px"
          mb={3}
        >
          <TextField placeholder="Full Name" />
          <TextField placeholder="Email" />
          <TextField placeholder="State" />
          <TextField placeholder="City" />
          <TextField placeholder="Address" />
          <TextField placeholder="Zip Code" />
        </Box>
        <Button variant="contained" color="primary">
          Create User
        </Button>
      </Paper>
    </Container>
  );
}
