import Form from "@/components/Form";
import {
  TextField,
  Autocomplete,
  InputAdornment,
  Paper,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material/Alert";
import PopupAlert from "@/components/PopupAlert";
import { Controller } from "react-hook-form";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";
import useReset from "@/hooks/useReset";

type Inputs = {
  product: string;
  quantity: number;
  cost: number;
  customer: string;
};

export default function create() {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState<any | string>();
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);

  const { user } = useAuth();

  const theme = useTheme();

  const options: any[] = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
    control,
  } = useForm<Inputs>();

  const onSubmit = async (data: object) => {
    setOpen(true);
    setSeverity("success");
    setMessage("Product created successfully");
    await addDoc(collection(db, "transactions"), {
      ...data,
      userId: user?.uid,
      date: serverTimestamp(),
      createdAt: serverTimestamp(),
    });
    console.log(data);
  };

  function onError(data: object) {
    setOpen(true);
    setSeverity("error");
    setMessage("Error creating product");
    console.log(data);
  }

  useEffect(() => {
    const getData = async () => {
      const col = collection(db, "customers");
      const q = await query(col, where("userId", "==", user?.uid));
      const data = await getDocs(q);
      setCustomers(
        data.docs.map((doc) => {
          return {
            label: doc.data().fullName,
            id: doc.id,
          };
        })
      );
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const col = collection(db, "products");
      const q = await query(col, where("userId", "==", user?.uid));
      const data = await getDocs(q);
      setProducts(
        data.docs.map((doc) => {
          return {
            label: doc.data().name,
            id: doc.id,
          };
        })
      );
    };
    getData();
  }, []);

  useReset(reset, isSubmitSuccessful);

  return (
    <Form header="Transaction" handleSubmit={handleSubmit(onSubmit, onError)}>
      <Controller
        render={({ field, formState }) => (
          <Autocomplete
            options={products}
            autoHighlight
            renderInput={(params) => (
              <TextField
                type="text"
                {...params}
                label="Product"
                error={!!formState.errors.product}
                helperText={formState.errors.product?.message}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            onChange={(_, data) => field.onChange(data)}
          />
        )}
        name="product"
        control={control}
        defaultValue={""}
        rules={{ required: "product is required" }}
      />
      <TextField
        type="number"
        label="Quantity"
        {...register("quantity", {
          required: "Quantity is required",
          min: { value: 0, message: "value cannot be a negative number" },
        })}
        error={!!errors.quantity}
        helperText={errors.quantity?.message}
      />
      <TextField
        type="number"
        label="Cost"
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
      <Controller
        render={({ field, formState }) => (
          <Autocomplete
            options={customers}
            autoHighlight
            renderInput={(params) => (
              <TextField
                type="text"
                {...params}
                label="Customer"
                error={!!formState.errors.customer}
                helperText={formState.errors.customer?.message}
              />
            )}
            isOptionEqualToValue={(option, value) =>
              option.label === value.label
            }
            onChange={(_, data) => field.onChange(data)}
          />
        )}
        name="customer"
        control={control}
        defaultValue={""}
        rules={{ required: "customer is required" }}
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
