import DataTable from "@/components/DataTable";
import {
  GridRowsProp,
  GridColDef,
  GridRowId,
  GridActionsCellItem,
  GridPreProcessEditCellProps,
  GridColumns,
} from "@mui/x-data-grid";
import { GetServerSideProps } from "next";
import { currencyFormatter } from "@/lib/numberFormatter";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";
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

  const mockRows: GridRowsProp = data.map((product: any, index: GridRowId) => ({
    id: index,
    name: product.title,
    price: product.price,
    cost: product.price * ((100 - product.discountPercentage) * 0.01),
    stock: product.stock,
    category: product.category,
    supplier: product.brand,
  }));

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

  return <DataTable header="Products" rowData={rows} columns={columns} />;
}
