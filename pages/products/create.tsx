import Form from "@/components/Form";
import { TextField, Snackbar } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState, forwardRef } from "react";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

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

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: object) => {
    setOpen(true);
    setSeverity("success");
    setMessage("Product created successfully");
    console.log(data);
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
        {...register("price", {
          required: "Price is required",
          min: { value: 0.01, message: "value must be greater than 0" },
        })}
        error={!!errors.price}
        helperText={errors.price?.message}
      />
      <TextField
        type="number"
        placeholder="Unit Cost"
        {...register("cost", {
          required: "Cost is required",
          min: { value: 0.01, message: "value must be greater than 0" },
        })}
        error={!!errors.cost}
        helperText={errors.cost?.message}
      />
      <TextField
        type="number"
        placeholder="Stock"
        defaultValue={0}
        {...register("stock", { required: "Stock is required" })}
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
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Form>
  );
}
