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
  GridRowModes,
  GridRowModel,
  GridActionsCellItem,
  GridSelectionModel,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import PopupAlert from "@/components/PopupAlert";
import { AlertColor } from "@mui/material/Alert";
import { useRouter } from "next/router";
import Link from "next/link";
type Props = {
  header: string;
  rowData: GridRowsProp;
  columns: GridColDef[];
};

export default function DataTable({ header, rowData, columns }: Props) {
  const [rows, setRows] = useState<any>([]);
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>("warning");
  const [message, setMessage] = useState<string>("");

  const router = useRouter();
  console.log(router.pathname);

  useEffect(() => {
    setRows(rowData);
  }, [rowData]);

  const actionColumn = [
    ...columns,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: ({ id }: any) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(id)}
        />,
      ],
    },
  ];

  //delete functions
  function handleDelete(id: any) {
    setRows((rows: any) => rows.filter((row: any) => row.id !== id));
    // deleteDoc(doc(db, "products", id));
  }

  function handleDeleteMultiple() {
    // rows.forEach((row: any) => {
    //   if (selectedRows.includes(row.id)) {
    //     console.log("deleted " + row.name);
    //     deleteDoc(doc(db, header.toLowerCase(), row.id));
    //   }
    // });

    setRows((rows: any) =>
      rows.filter((row: any) => {
        return !selectedRows.includes(row.id);
      })
    );
  }

  //checkbox function
  function onRowSelectionModelChange(newRowSelectionModel: any) {
    setSelectedRows(newRowSelectionModel);
    console.log(selectedRows);
  }

  //update functions
  function processRowUpdated(newRow: GridRowModel, oldRow: GridRowModel) {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
      return oldRow;
    }
    const { id, ...props } = newRow;
    // updateDoc(doc(db, header.toLowerCase(), newRow.id), { ...props });
    handleOpen("success", `${header} updated successfully`);
    return newRow;
  }

  function onRowUpdateError(error: Error) {
    console.log(error);
  }

  //snackbar functions
  function handleOpen(severity: AlertColor, message: string) {
    setOpenSnackbar(true);
    setSeverity(severity);
    setMessage(message);
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container style={{ height: 550, minWidth: 550 }} maxWidth={"xl"}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" component="h1" pb={2}>
          {header}
        </Typography>
        <Box>
          <Button
            variant="contained"
            disabled={selectedRows.length > 0 ? false : true}
            sx={{ mr: 2 }}
            onClick={handleDeleteMultiple}
          >
            Delete {header}
          </Button>
          <Button
            variant="contained"
            onClick={() => router.push(router.pathname + "/create")}
          >
            Add {header}
          </Button>
        </Box>
      </Stack>
      <Paper sx={{ height: "inherit", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={actionColumn}
          pageSize={rowData.length < 25 ? rowData.length : 25}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={onRowSelectionModelChange}
          selectionModel={selectedRows}
          editMode="row"
          // rowModesModel={{ 1: { mode: GridRowModes.Edit } }}
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={processRowUpdated}
          onProcessRowUpdateError={onRowUpdateError}
        />
        <Typography variant="subtitle2">*Double click row to edit</Typography>
      </Paper>
      <PopupAlert
        open={openSnackbar}
        severity={severity}
        message={message}
        handleClose={handleClose}
      />
    </Container>
  );
}
