import Form from "@/components/Form";
import { TextField } from "@mui/material";

export default function create() {
  return (
    <Form>
      <TextField placeholder="Name" />
      <TextField placeholder="Price" />
      <TextField placeholder="Cost" />
      <TextField placeholder="Stock" />
      <TextField placeholder="Category" />
      <TextField placeholder="Supplier" />
    </Form>
  );
}
