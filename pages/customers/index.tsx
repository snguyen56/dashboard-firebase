import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { GetServerSideProps } from "next";
import { currencyFormatter } from "@/lib/numberFormatter";
import DataTable from "@/components/DataTable";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://dummyjson.com/users?limit=100");
  const data = await res.json();
  return {
    props: { data },
  };
};

export default function customers({ data }: any) {
  const columns: GridColDef[] = [
    { field: "Name", flex: 1 },
    { field: "Email", flex: 1 },
    { field: "Orders", flex: 0.5 },
    { field: "Spent", flex: 0.5 },
    { field: "Location", flex: 1 },
  ];

  const mockRows: GridRowsProp = data.users.map((user: any) => ({
    id: user.id,
    Name: `${user.firstName} ${user.lastName}`,
    Email: user.email,
    Orders: Math.floor(Math.random() * 100),
    Spent: currencyFormatter(Math.random() * 1000),
    Location: `${user.address.city}, ${user.address.state}`,
  }));

  return <DataTable header="Customers" rowData={mockRows} columns={columns} />;
}
