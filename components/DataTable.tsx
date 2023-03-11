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

type Props = {
  header: string;
  rows: GridRowsProp;
  columns: GridColDef[];
  onSelectionModelChange: any;
  selectionModel: any;
  handleDeleteMultiple: () => void;
};

export default function DataTable({
  header,
  rows,
  columns,
  onSelectionModelChange,
  selectionModel,
  handleDeleteMultiple,
}: Props) {
  return (
    <Container style={{ height: 550, minWidth: 415 }} maxWidth={"xl"}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" component="h1" pb={2}>
          {header}
        </Typography>
        <Box>
          <Button
            variant="contained"
            disabled={selectionModel.length > 0 ? false : true}
            sx={{ mr: 2 }}
            onClick={handleDeleteMultiple}
          >
            Delete Items
          </Button>
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
          onSelectionModelChange={onSelectionModelChange}
          selectionModel={selectionModel}
        />
      </Paper>
    </Container>
  );
}
