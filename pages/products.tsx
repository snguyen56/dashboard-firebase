import DataTable from "@/components/DataTable";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { GetServerSideProps } from "next";
import { currencyFormatter } from "@/lib/numberFormatter";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

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

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 125 },
    { field: "price", flex: 0.75, minWidth: 75 },
    { field: "cost", flex: 0.75, minWidth: 75 },
    { field: "stock", flex: 0.75, minWidth: 75 },
    { field: "category", flex: 1, minWidth: 125 },
    { field: "supplier", flex: 1, minWidth: 125 },
  ];

  const mockRows: GridRowsProp = data.map((product: any, index: number) => ({
    id: index,
    Name: product.title,
    Price: currencyFormatter(product.price),
    Cost: currencyFormatter(
      product.price * ((100 - product.discountPercentage) * 0.01)
    ),
    Stock: product.stock,
    Category: product.category,
    Supplier: product.brand,
  }));

  useEffect(() => {
    const getData = async () => {
      const col = collection(db, "products");
      // const data = await getDocs(col);
      const q = await query(col, where("userId", "==", user?.uid));
      const data = await getDocs(q);
      setRows(
        data.docs.map((doc) => {
          return {
            ...doc.data(),
            price: currencyFormatter(doc.data().price),
            cost: currencyFormatter(doc.data().cost),
            id: doc.id,
          };
        })
      );
    };

    // getData();
  }, []);

  return <DataTable header="Products" rows={rows} columns={columns} />;
}
