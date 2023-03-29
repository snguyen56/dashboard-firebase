import { Typography, Paper, Stack, Button, Box } from "@mui/material";
import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
  GridRowModes,
  GridRowModel,
  GridActionsCellItem,
  GridSelectionModel,
  GridRowModesModel,
  GridRowId,
  GridEventListener,
  GridRowParams,
  MuiEvent,
} from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import PopupAlert from "@/components/PopupAlert";
import { AlertColor } from "@mui/material/Alert";
import { useRouter } from "next/router";

type Props = {
  header: string;
  rowData: GridRowsProp;
  columns: GridColDef[];
};

export default function DataTable({ header, rowData, columns }: Props) {
  const [rows, setRows] = useState<any>([]);
  const [pageSize, setPageSize] = useState<number>(25);
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor>("warning");
  const [message, setMessage] = useState<string>("");
  const [minWidth, setminWidth] = useState<number>(0);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const router = useRouter();

  const headerRef = useRef<HTMLHeadingElement>(null);
  const buttonsRef = useRef<HTMLBodyElement>(null);

  useEffect(() => {
    if (headerRef.current && buttonsRef.current) {
      setminWidth(
        headerRef.current.offsetWidth + buttonsRef.current.offsetWidth + 10
      );
    }
  }, [headerRef.current, buttonsRef.current]);

  useEffect(() => {
    setRows(rowData);
  }, [rowData]);

  const actionColumn = [
    ...columns,
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: ({ id }: any) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSave(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancel(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEdit(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(id)}
          />,
        ];
      },
    },
  ];

  //delete functions
  function handleDelete(id: any) {
    // setRows((rows: any) => rows.filter((row: any) => row.id !== id));
    deleteDoc(doc(db, header.toLowerCase(), id));
  }

  function handleDeleteMultiple() {
    // rows.forEach((row: any) => {
    //   if (selectedRows.includes(row.id)) {
    //     console.log("deleted " + row.name);
    //     deleteDoc(doc(db, header.toLowerCase(), row.id));
    //   }
    // });

    selectedRows.forEach((row: any) => {
      console.log(row);
      deleteDoc(doc(db, header.toLowerCase(), row));
    });

    // setRows((rows: any) =>
    //   rows.filter((row: any) => {
    //     return !selectedRows.includes(row.id);
    //   })
    // );
  }

  //checkbox function
  function onRowSelectionModelChange(newRowSelectionModel: any) {
    setSelectedRows(newRowSelectionModel);
    console.log(selectedRows);
  }

  //update functions
  function processRowUpdated(newRow: GridRowModel, oldRow: GridRowModel) {
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
      console.log(oldRow, newRow);
      return oldRow;
    }
    const { id, ...props } = newRow;
    console.log({ ...props });
    updateDoc(doc(db, header.toLowerCase(), id), { ...props });
    handleOpen("success", `${header.slice(0, -1)} updated successfully`);
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

  //icon functions
  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEdit = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSave = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancel = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  return (
    <Box style={{ height: 550, minWidth: minWidth }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4" component="h1" pb={2} ref={headerRef}>
          {header}
        </Typography>
        <Box ref={buttonsRef}>
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
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 25, 50]}
          components={{ Toolbar: GridToolbar }}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={onRowSelectionModelChange}
          selectionModel={selectedRows}
          editMode="row"
          experimentalFeatures={{ newEditingApi: true }}
          processRowUpdate={processRowUpdated}
          onProcessRowUpdateError={onRowUpdateError}
          rowModesModel={rowModesModel}
          onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
        />
      </Paper>
      <PopupAlert
        open={openSnackbar}
        severity={severity}
        message={message}
        setOpen={setOpenSnackbar}
      />
    </Box>
  );
}
