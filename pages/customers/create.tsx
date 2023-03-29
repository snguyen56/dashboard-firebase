import { TextField, AlertColor } from "@mui/material";
import { useForm } from "react-hook-form";
import Form from "@/components/Form";
import { useState } from "react";
import useReset from "@/hooks/useReset";
import PopupAlert from "@/components/PopupAlert";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

type Inputs = {
  fullName: string;
  email: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
};

export default function create() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState<any | string>();

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>();

  const onSubmit = async (data: Object) => {
    setOpen(true);
    setSeverity("success");
    setMessage("Customer created successfully");
    await addDoc(collection(db, "customers"), {
      ...data,
      orders: 0,
      spent: 0,
      userId: user?.uid,
    });
    console.log(data);
  };
  const onError = (data: Object) => {
    setOpen(true);
    setSeverity("error");
    setMessage("Error creating customer");
    console.log(data);
  };

  useReset(reset, isSubmitSuccessful);

  return (
    <Form header="Customer" handleSubmit={handleSubmit(onSubmit, onError)}>
      <TextField
        type="text"
        label="Full Name"
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
        label="Email"
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
        label="State"
        {...register("state", {
          required: "State is required",
        })}
        error={!!errors.state}
        helperText={errors.state?.message}
      />
      <TextField
        type="text"
        label="City"
        {...register("city", {
          required: "City is required",
        })}
        error={!!errors.city}
        helperText={errors.city?.message}
      />
      <TextField
        type="text"
        label="Address"
        {...register("address", {
          required: "Address is required",
        })}
        error={!!errors.address}
        helperText={errors.address?.message}
      />
      <TextField
        type="text"
        label="Zip Code"
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
      <PopupAlert
        open={open}
        setOpen={setOpen}
        severity={severity}
        message={message}
      />
    </Form>
  );
}
