import {
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  Box,
} from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import { GetServerSideProps } from "next";
import { currencyFormatter } from "@/lib/numberFormatter";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://dummyjson.com/users?limit=100");
  const data = await res.json();
  return {
    props: { data },
  };
};

export default function customers({ data }: any) {
  const columns: GridColDef[] = [
    { field: "Name", flex: 1 },
    { field: "Email", flex: 1 },
    { field: "Orders", flex: 0.5 },
    { field: "Spent", flex: 0.5 },
    { field: "Location", flex: 1 },
  ];

  const mockRows: GridRowsProp = data.users.map((user: any) => ({
    id: user.id,
    Name: `${user.firstName} ${user.lastName}`,
    Email: user.email,
    Orders: Math.floor(Math.random() * 100),
    Spent: currencyFormatter(Math.random() * 1000),
    Location: `${user.address.city}, ${user.address.state}`,
  }));

  return (
    <Container style={{ height: 550 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" component="h1" pb={2}>
          Customers
        </Typography>
        <Box>
          <Link href="/customers/create">
            <Button variant="contained">Add Customer</Button>
          </Link>
        </Box>
      </Stack>
      <Paper sx={{ height: "inherit", width: "100%" }}>
        <DataGrid
          rows={mockRows}
          columns={columns}
          pageSize={mockRows.length < 25 ? mockRows.length : 25}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
        />
      </Paper>
    </Container>
  );
}
