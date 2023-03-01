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

type Props = { header: string; rows: GridRowsProp; columns: GridColDef[] };

export default function DataTable({ header, rows, columns }: Props) {
  return (
    <Container style={{ height: 550 }} maxWidth={"xl"}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" component="h1" pb={2}>
          {header}
        </Typography>
        <Box>
          <Button variant="contained">Add Item</Button>
        </Box>
      </Stack>
      <Paper sx={{ height: "inherit", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={rows.length < 25 ? rows.length : 25}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
        />
      </Paper>
    </Container>
  );
}
