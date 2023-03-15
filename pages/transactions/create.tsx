import Form from "@/components/Form";
import { TextField, Autocomplete, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { AlertColor } from "@mui/material/Alert";
import PopupAlert from "@/components/PopupAlert";

type Inputs = {
  product: string;
  quantity: number;
  cost: number;
  customerID: string;
};

export default function create() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState<any | string>();

  const options: any[] = [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: object) => {
    setOpen(true);
    setSeverity("success");
    setMessage("Product created successfully");
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
        placeholder="Product"
        {...register("product", { required: "Product is required" })}
        error={!!errors.product}
        helperText={errors.product?.message}
      />
      <TextField
        type="number"
        placeholder="Quantity"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        {...register("quantity", {
          required: "Quantity is required",
          min: { value: 0.01, message: "value must be greater than 0" },
        })}
        error={!!errors.quantity}
        helperText={errors.quantity?.message}
      />
      <TextField
        type="number"
        placeholder="Cost"
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        {...register("cost", {
          required: "Cost is required",
          min: { value: 0.01, message: "value must be greater than 0" },
        })}
        error={!!errors.cost}
        helperText={errors.cost?.message}
      />
      {/* <TextField placeholder="CustomerID" /> */}
      <Autocomplete
        options={options}
        renderInput={(params) => (
          <TextField
            type="text"
            {...params}
            label="Customer"
            placeholder="customer"
            {...register("customerID", { required: "Customer is required" })}
            error={!!errors.customerID}
            helperText={errors.customerID?.message}
          />
        )}
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
