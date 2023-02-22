import {
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";

const rows: GridRowsProp = [
  { id: 1, col1: "Hello", col2: "World" },
  { id: 2, col1: "DataGridPro", col2: "is Awesome" },
  { id: 3, col1: "MUI", col2: "is Amazing" },
  { id: 4, col1: "Material UI", col2: "is amazing" },
];

const columns: GridColDef[] = [
  { field: "col1", headerName: "Name", flex: 1 },
  { field: "col2", headerName: "Column 2", flex: 1 },
];

export default function customers() {
  return (
    <Container style={{ height: 550 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" component="h1" pb={2}>
          Customers
        </Typography>
        <Box>
          <Button variant="contained">Add Customer</Button>
        </Box>
      </Stack>
      <Paper sx={{ height: "inherit", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
        />
      </Paper>
    </Container>
  );
}
