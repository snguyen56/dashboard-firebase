import DataTable from "@/components/DataTable";
import {
  GridRowsProp,
  GridColDef,
  GridRowId,
  GridActionsCellItem,
  GridPreProcessEditCellProps,
  GridColumns,
  GridRenderEditCellParams,
  GridEditInputCell,
} from "@mui/x-data-grid";
import { GetServerSideProps } from "next";
import { currencyFormatter } from "@/lib/numberFormatter";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  validateString,
  validateCurrency,
  validateNumber,
} from "@/lib/rowValidation";
import Tooltip from "@mui/material/Tooltip";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://dummyjson.com/products?limit=100");
  const data = await res.json();
  return {
    props: { data: data.products },
  };
};

type Props = {
  data: Array<Object>;
};

export default function products({ data }: Props) {
  const [rows, setRows] = useState<any>([]);

  const { user } = useAuth();
  const col = collection(db, "products");
  const q = query(col, where("userId", "==", user?.uid));

  type Row = typeof mockRows[number];

  function handleEditError(props: GridRenderEditCellParams) {
    console.log(props);
    return (
      <Tooltip title="field cannot be empty" open={props.error}>
        <GridEditInputCell {...props} />
      </Tooltip>
    );
  }

  const testcolumns: GridColumns<Row> = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 125,
      preProcessEditCellProps: validateString,
      renderEditCell: handleEditError,
      editable: true,
    },
    {
      field: "price",
      type: "number",
      flex: 0.75,
      minWidth: 75,
      valueParser: (value: any) => {
        return value.trim();
      },
      valueFormatter: (params) => {
        return currencyFormatter(params.value);
      },
      preProcessEditCellProps: validateCurrency,
      editable: true,
    },
    {
      field: "cost",
      type: "number",
      flex: 0.75,
      minWidth: 75,
      valueFormatter: (params) => {
        return currencyFormatter(params.value);
      },
      preProcessEditCellProps: validateCurrency,
      editable: true,
    },
    {
      field: "stock",
      type: "number",
      flex: 0.75,
      minWidth: 75,
      preProcessEditCellProps: validateNumber,
      editable: true,
    },
    {
      field: "category",
      flex: 1,
      minWidth: 125,
      preProcessEditCellProps: validateString,
      editable: true,
    },
    {
      field: "supplier",
      flex: 1,
      minWidth: 125,
      preProcessEditCellProps: validateString,
      editable: true,
    },
  ];

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "name",
        headerName: "Name",
        flex: 1,
        minWidth: 125,
        preProcessEditCellProps: validateString,
        editable: true,
      },
      {
        field: "price",
        type: "number",
        flex: 0.75,
        minWidth: 75,
        valueParser: (value: any) => {
          return value.trim();
        },
        valueFormatter: (params) => {
          return currencyFormatter(params.value);
        },
        preProcessEditCellProps: validateCurrency,
        editable: true,
      },
      {
        field: "cost",
        type: "number",
        flex: 0.75,
        minWidth: 75,
        valueFormatter: (params) => {
          return currencyFormatter(params.value);
        },
        preProcessEditCellProps: validateCurrency,
        editable: true,
      },
      {
        field: "stock",
        type: "number",
        flex: 0.75,
        minWidth: 75,
        preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
          const hasError = params.props.value < 0;
          return { ...params.props, error: hasError };
        },
        editable: true,
      },
      {
        field: "category",
        flex: 1,
        minWidth: 125,
        preProcessEditCellProps: validateString,
        editable: true,
      },
      {
        field: "supplier",
        flex: 1,
        minWidth: 125,
        preProcessEditCellProps: validateString,
        editable: true,
      },
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
    ],
    [handleDelete]
  );

  const mockRows: GridRowsProp = data.map((product: any, index: GridRowId) => ({
    id: index,
    name: product.title,
    price: product.price,
    cost: product.price * ((100 - product.discountPercentage) * 0.01),
    stock: product.stock,
    category: product.category,
    supplier: product.brand,
  }));

  function handleDelete(id: any) {}

  useEffect(() => {
    // const unsubscribe = onSnapshot(q, (snapshot) => {
    //   setRows(
    //     snapshot.docs.map((doc) => {
    //       return {
    //         ...doc.data(),
    //         price: doc.data().price,
    //         cost: doc.data().cost,
    //         id: doc.id,
    //       };
    //     })
    //   );
    // });

    // return unsubscribe;
    setRows(mockRows);
  }, []);

  return <DataTable header="Products" rowData={rows} columns={testcolumns} />;
}
