import { Paper, Typography, TextField, Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";

type Inputs = {
  fullName: string;
  email: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
};

export default function create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Object) => {
    console.log(data);
  };
  const onError = (data: Object) => {
    console.log(data);
  };
  return (
    <Container
      maxWidth="md"
      component="form"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <Typography variant="h4" component="h1" pb={2}>
        Create User
      </Typography>
      <Paper sx={{ p: 3, textAlign: "right" }}>
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gap="16px"
          mb={3}
        >
          <TextField
            type="text"
            placeholder="Full Name"
            {...register("fullName", {
              required: "Full Name is required",
              pattern: {
                value: /^[a-zA-Z ]+$/,
                message: "Full Name can only contain letters",
              },
            })}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
          <TextField
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            type="text"
            placeholder="State"
            {...register("state", {
              required: "State is required",
            })}
            error={!!errors.state}
            helperText={errors.state?.message}
          />
          <TextField
            type="text"
            placeholder="City"
            {...register("city", {
              required: "City is required",
            })}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
          <TextField
            type="text"
            placeholder="Address"
            {...register("address", {
              required: "Address is required",
            })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <TextField
            type="text"
            placeholder="Zip Code"
            {...register("zipCode", {
              required: "Zip Code is required",
              pattern: {
                value: /^[0-9]{5}$/,
                message: "Invalid zip code",
              },
            })}
            error={!!errors.zipCode}
            helperText={errors.zipCode?.message}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Create User
        </Button>
      </Paper>
    </Container>
  );
}
