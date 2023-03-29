import DataTable from "@/components/DataTable";
import { GetServerSideProps } from "next";
import { currencyFormatter } from "@/lib/numberFormatter";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import {
  handleCurrencyError,
  handleDateError,
  handleNumberError,
  handleStringError,
  validateCurrency,
  validateDate,
  validateNumber,
  validateString,
} from "@/lib/rowValidation";
import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebaseConfig";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://dummyjson.com/carts?limit=20");
  const data = await res.json();
  return {
    props: { data: data.carts },
  };
};
type Props = {
  data: Array<Object>;
};

export default function transactions({ data }: Props) {
  const [rows, setRows] = useState<any[]>([]);

  const { user } = useAuth();
  const col = collection(db, "transactions");
  const q = query(col, where("userId", "==", user?.uid));

  const columns: GridColDef[] = [
    {
      field: "customer",
      flex: 0.5,
      minWidth: 75,
      valueParser: (value: any) => {
        return value.trim();
      },
      valueGetter: (params) => {
        return params.row.customer.label;
      },
      valueSetter: (params) => {
        return {
          ...params.row,
          customer: { ...params.row.customer, label: params.value },
        };
      },
      preProcessEditCellProps: validateString,
      renderEditCell: handleStringError,
      editable: true,
    },
    {
      field: "product",
      flex: 1,
      minWidth: 125,
      valueParser: (value: any) => {
        return value.trim();
      },
      valueGetter: (params) => {
        return params.row.product.label;
      },
      valueSetter: (params) => {
        return {
          ...params.row,
          product: { ...params.row.product, label: params.value },
        };
      },
      preProcessEditCellProps: validateString,
      renderEditCell: handleStringError,
      editable: true,
    },
    {
      field: "quantity",
      type: "number",
      flex: 0.5,
      minWidth: 125,
      preProcessEditCellProps: validateNumber,
      renderEditCell: handleNumberError,
      editable: true,
    },
    {
      field: "cost",
      type: "number",
      flex: 0.5,
      minWidth: 75,
      valueParser: (value: any) => {
        return value.trim();
      },
      valueFormatter: (params) => {
        return currencyFormatter(params.value);
      },
      preProcessEditCellProps: validateCurrency,
      renderEditCell: handleCurrencyError,
      editable: true,
    },
    {
      field: "date",
      type: "dateTime",
      flex: 1,
      preProcessEditCellProps: validateDate,
      renderEditCell: handleDateError,
      editable: true,
    },
  ];

  const mockRows: GridRowsProp = data.map((item: any) => ({
    id: item.id,
    UserID: item.userId,
    Quantity: item.totalQuantity,
    Product: item.products[0].title,
    Cost: item.total,
    Date: Timestamp.fromDate(new Date()).toDate(),
  }));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRows(
        snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            date: doc.data().date.toDate(),
            id: doc.id,
          };
        })
      );
    });

    return unsubscribe;
  }, []);

  return <DataTable header="Transactions" rowData={rows} columns={columns} />;
}
