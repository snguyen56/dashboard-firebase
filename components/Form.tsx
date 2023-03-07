import { Paper, Typography, Box, Button, Container } from "@mui/material";

type Props = {
  children: React.ReactNode;
  handleSubmit: () => void;
};

export default function Form({ children, handleSubmit }: Props) {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" pb={2}>
        Create Item
      </Typography>
      <Paper
        component="form"
        sx={{ p: 3, textAlign: "right" }}
        onSubmit={handleSubmit}
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
          Create Item
        </Button>
      </Paper>
    </Container>
  );
}
