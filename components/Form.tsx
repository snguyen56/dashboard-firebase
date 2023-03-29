import {
  Paper,
  Typography,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
  header: string;
  handleSubmit: () => void;
};

export default function Form({ children, header, handleSubmit }: Props) {
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <Stack direction="row" alignItems="baseline">
        <IconButton
          aria-label="back button"
          disableTouchRipple
          onClick={() => router.push("/" + router.asPath.split("/")[1])}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" pb={2} pl={1}>
          Create {header}
        </Typography>
      </Stack>

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
          Create {header}
        </Button>
      </Paper>
    </Container>
  );
}
