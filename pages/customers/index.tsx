import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("https://dummyjson.com/users?limit=100");
  const data = await res.json();
  return {
    props: { data },
  };
};

export default function customers({ data }: any) {
  const columns: GridColDef[] = [
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      minWidth: 125,
      preProcessEditCellProps: validateString,
      renderEditCell: handleStringError,
      editable: true,
    },
    {
      field: "Email",
      headerName: "Email",
      flex: 1,
      minWidth: 125,
      preProcessEditCellProps: validateEmail,
      renderEditCell: handleEmailError,
      editable: true,
    },
    {
      field: "Orders",
      headerName: "Orders",
      type: "number",
      flex: 0.5,
      minWidth: 75,
      preProcessEditCellProps: validateNumber,
      renderEditCell: handleNumberError,
      editable: true,
    },
    {
      field: "Spent",
      headerName: "Spent",
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
      preProcessEditCellProps: validateString,
      renderEditCell: handleStringError,
      editable: true,
    },
  ];

  const mockRows: GridRowsProp = data.users.map((user: any) => ({
    id: user.id,
    Name: `${user.firstName} ${user.lastName}`,
    Email: user.email,
    Orders: Math.floor(Math.random() * 100),
    Spent: Math.random() * 1000,
    Location: `${user.address.city}, ${user.address.state}`,
  }));

  return <DataTable header="Customers" rowData={mockRows} columns={columns} />;
}
