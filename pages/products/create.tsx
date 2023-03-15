import Form from "@/components/Form";
import { TextField, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AlertColor } from "@mui/material/Alert";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import PopupAlert from "@/components/PopupAlert";
type Inputs = {
  name: string;
  price: number;
  cost: number;
  stock: number;
  category: string;
  supplier: string;
};

export default function create() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState<any | string>();

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    setOpen(true);
    setSeverity("success");
    setMessage("Product created successfully");
    await addDoc(collection(db, "products"), {
      name: data.name,
      price: data.price,
      cost: data.cost,
      stock: data.stock,
      category: data.category,
      supplier: data.supplier,
      userId: user?.uid,
    });
  };

  function onError(data: object) {
    setOpen(true);
    setSeverity("error");
    setMessage("Error creating product");
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Form handleSubmit={handleSubmit(onSubmit, onError)}>
      <TextField
        type="text"
        placeholder="Name"
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        type="number"
        placeholder="Sales Price"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        {...register("price", {
          required: "Price is required",
          min: { value: 0.01, message: "value must be greater than 0" },
          valueAsNumber: true,
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <TextField
        type="number"
        placeholder="Unit Cost"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        {...register("cost", {
          required: "Cost is required",
          min: { value: 0.01, message: "value must be greater than 0" },
          valueAsNumber: true,
        })}
        error={!!errors.cost}
        helperText={errors.cost?.message}
      />
      <TextField
        type="number"
        placeholder="Stock"
        defaultValue={0}
        {...register("stock", {
          required: "Stock is required",
          min: { value: 0, message: "value cannot be negative" },
          valueAsNumber: true,
        })}
        error={!!errors.stock}
        helperText={errors.stock?.message}
      />
      <TextField
        type="text"
        placeholder="Category"
        {...register("category", { required: "Category is required" })}
        error={!!errors.category}
        helperText={errors.category?.message}
      />
      <TextField
        type="text"
        placeholder="Supplier"
        {...register("supplier", { required: "Supplier is required" })}
        error={!!errors.supplier}
        helperText={errors.supplier?.message}
      />
      <PopupAlert
        open={open}
        handleClose={handleClose}
        severity={severity}
        message={message}
      />
    </Form>
  );
}
