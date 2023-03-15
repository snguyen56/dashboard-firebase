import DataTable from "@/components/DataTable";
import { GetServerSideProps } from "next";
import { currencyFormatter } from "@/lib/numberFormatter";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";

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
  const columns: GridColDef[] = [
    { field: "UserID", flex: 0.5 },
    { field: "Product", flex: 1 },
    { field: "Quantity", flex: 0.5 },
    { field: "Cost", flex: 0.5 },
    { field: "Date", flex: 1 },
  ];
  const mockRows: GridRowsProp = data.map((item: any) => ({
    id: item.id,
    UserID: item.userId,
    Quantity: item.totalQuantity,
    Product: item.products[0].title,
    Cost: currencyFormatter(item.total),
    Date: new Date().toLocaleString(),
  }));

  return (
    <DataTable header="Transactions" rowData={mockRows} columns={columns} />
  );
}
