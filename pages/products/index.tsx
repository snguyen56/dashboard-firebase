import DataTable from "@/components/DataTable";
import { GridColumns } from "@mui/x-data-grid";
import { currencyFormatter } from "@/lib/numberFormatter";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  validateString,
  validateCurrency,
  validateNumber,
  handleStringError,
  handleCurrencyError,
  handleNumberError,
} from "@/lib/rowValidation";

export default function products() {
  const [rows, setRows] = useState<any>([]);

  const { user } = useAuth();
  const col = collection(db, "products");
  const q = query(col, where("userId", "==", user?.uid));

  type Row = typeof rows[number];

  const columns: GridColumns<Row> = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 125,
      preProcessEditCellProps: validateString,
      renderEditCell: handleStringError,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      flex: 0.75,
      minWidth: 75,
      valueFormatter: (params) => {
        return currencyFormatter(params.value);
      },
      preProcessEditCellProps: validateCurrency,
      renderEditCell: handleCurrencyError,
      editable: true,
    },
    {
      field: "cost",
      headerName: "Cost",
      type: "number",
      flex: 0.75,
      minWidth: 75,
      valueFormatter: (params) => {
        return currencyFormatter(params.value);
      },
      preProcessEditCellProps: validateCurrency,
      renderEditCell: handleCurrencyError,
      editable: true,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      flex: 0.75,
      minWidth: 75,
      preProcessEditCellProps: validateNumber,
      renderEditCell: handleNumberError,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      minWidth: 125,
      preProcessEditCellProps: validateString,
      renderEditCell: handleStringError,
      editable: true,
    },
    {
      field: "supplier",
      headerName: "Supplier",
      flex: 1,
      minWidth: 125,
      preProcessEditCellProps: validateString,
      renderEditCell: handleStringError,
      editable: true,
    },
  ];

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRows(
        snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            price: doc.data().price,
            cost: doc.data().cost,
            id: doc.id,
          };
        })
      );
    });

    return unsubscribe;
  }, []);

  return <DataTable header="Products" rowData={rows} columns={columns} />;
}
