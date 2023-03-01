import Form from "@/components/Form";
import { TextField } from "@mui/material";

export default function create() {
  return (
    <Form>
      <TextField placeholder="Product" />
      <TextField placeholder="Quantity" />
      <TextField placeholder="Cost" />
      <TextField placeholder="UserID" />
    </Form>
  );
}
