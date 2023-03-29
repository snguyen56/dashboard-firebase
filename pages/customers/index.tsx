import {
  GridRowsProp,
  GridColDef,
  GridValueGetterParams,
  GridValueSetterParams,
} from "@mui/x-data-grid";
import { GetServerSideProps } from "next";
import { currencyFormatter } from "@/lib/numberFormatter";
import DataTable from "@/components/DataTable";
import {
  handleCurrencyError,
  handleEmailError,
  handleNumberError,
  handleStringError,
  validateCurrency,
  validateEmail,
  validateNumber,
  validateString,
} from "@/lib/rowValidation";
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://dummyjson.com/users?limit=100");
  const data = await res.json();
  return {
    props: { data },
  };
};

export default function customers({ data }: any) {
  const [rows, setRows] = useState<any>([]);

  const { user } = useAuth();
  const col = collection(db, "customers");
  const q = query(col, where("userId", "==", user?.uid));

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Name",
      flex: 1,
      minWidth: 125,
      preProcessEditCellProps: validateString,
      renderEditCell: handleStringError,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 125,
      preProcessEditCellProps: validateEmail,
      renderEditCell: handleEmailError,
      editable: true,
    },
    {
      field: "orders",
      headerName: "Orders",
      type: "number",
      flex: 0.5,
      minWidth: 75,
      preProcessEditCellProps: validateNumber,
      renderEditCell: handleNumberError,
      editable: true,
    },
    {
      field: "spent",
      headerName: "Spent",
      type: "number",
      flex: 0.5,
      minWidth: 75,
      valueFormatter: (params) => {
        return currencyFormatter(params.value);
      },
      preProcessEditCellProps: validateCurrency,
      renderEditCell: handleCurrencyError,
      editable: true,
    },
    {
      field: "Location",
      headerName: "Location",
      flex: 1,
      minWidth: 125,
      valueGetter: getLocation,
      valueSetter: setLocation,
      preProcessEditCellProps: validateString,
      renderEditCell: handleStringError,
      editable: true,
    },
  ];

  function getLocation(params: GridValueGetterParams) {
    return `${params.row.city || ""}, ${params.row.state || ""}`;
  }

  function setLocation(params: GridValueSetterParams) {
    const address = params.value.split(",");
    return {
      ...params.row,
      city: address[0].trim(),
      state: address[1].trim(),
    };
  }

  const mockRows: GridRowsProp = data.users.map((user: any) => ({
    id: user.id,
    Name: `${user.firstName} ${user.lastName}`,
    Email: user.email,
    Orders: Math.floor(Math.random() * 100),
    Spent: Math.random() * 1000,
    Location: `${user.address.city}, ${user.address.state}`,
  }));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRows(
        snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
      );
    });

    return unsubscribe;
  }, []);

  return <DataTable header="Customers" rowData={rows} columns={columns} />;
}
