import DataTable from "@/components/DataTable";
import {
  GridRowsProp,
  GridColDef,
  GridActionsCellItem,
  GridRowId,
  GridSelectionModel,
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
  const [selectedRows, setSelectedRows] = useState<GridSelectionModel>([]);

  const { user } = useAuth();

  const columns = useMemo<GridColDef[]>(
    () => [
      { field: "name", headerName: "Name", flex: 1, minWidth: 125 },
      { field: "price", flex: 0.75, minWidth: 75 },
      { field: "cost", flex: 0.75, minWidth: 75 },
      { field: "stock", flex: 0.75, minWidth: 75 },
      { field: "category", flex: 1, minWidth: 125 },
      { field: "supplier", flex: 1, minWidth: 125 },
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

  const mockRows: GridRowsProp = data.map((product: any, index: number) => ({
    id: index,
    name: product.title,
    price: currencyFormatter(product.price),
    cost: currencyFormatter(
      product.price * ((100 - product.discountPercentage) * 0.01)
    ),
    stock: product.stock,
    category: product.category,
    supplier: product.brand,
  }));

  function handleDelete(id: any) {
    setRows((rows: any) => rows.filter((row: any) => row.id !== id));
    // deleteDoc(doc(db, "products", id));
  }

  function handleDeleteMultiple() {
    // rows.forEach((row: any) => {
    //   if (selectedRows.includes(row.id)) {
    //     console.log("delete " + row.name);
    //     deleteDoc(doc(db, "products", row.id));
    //   }
    // });

    setRows((rows: any) =>
      rows.filter((row: any) => {
        if (!selectedRows.includes(row.id)) {
          return true;
        }
        // selectedRows.includes(row.id);
      })
    );
  }

  function onRowSelectionModelChange(newRowSelectionModel: any) {
    setSelectedRows(newRowSelectionModel);
    console.log(selectedRows);
  }

  useEffect(() => {
    const getData = async () => {
      const col = collection(db, "products");
      const data = await getDocs(col);
      // const q = await query(col, where("userId", "==", user?.uid));
      // const data = await getDocs(q);
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
    setRows(mockRows);
  }, []);

  return (
    <DataTable
      header="Products"
      rows={rows}
      columns={columns}
      onSelectionModelChange={onRowSelectionModelChange}
      selectionModel={selectedRows}
      handleDeleteMultiple={handleDeleteMultiple}
    />
  );
}
