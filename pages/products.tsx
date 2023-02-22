import DataTable from "@/components/DataTable";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { GetServerSideProps } from "next";
import { currencyFormatter } from "@/lib/numberFormatter";

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
  console.log(data);
  const columns: GridColDef[] = [
    { field: "Name", flex: 1 },
    { field: "Price", flex: 0.75 },
    { field: "Cost", flex: 0.75 },
    { field: "Stock", flex: 0.75 },
    { field: "Category", flex: 1 },
    { field: "Supplier", flex: 1 },
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

  return <DataTable header="Products" rows={mockRows} columns={columns} />;
}
