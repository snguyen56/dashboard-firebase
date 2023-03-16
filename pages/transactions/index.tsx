import DataTable from "@/components/DataTable";
import { GetServerSideProps } from "next";
import { currencyFormatter } from "@/lib/numberFormatter";
import { GridRowsProp, GridColDef } from "@mui/x-data-grid";
import {
  handleCurrencyError,
  handleNumberError,
  handleStringError,
  validateCurrency,
  validateNumber,
  validateString,
} from "@/lib/rowValidation";

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
    {
      field: "UserID",
      flex: 0.5,
      minWidth: 75,
      preProcessEditCellProps: validateString,
      renderEditCell: handleStringError,
      editable: true,
    },
    {
      field: "Product",
      flex: 1,
      minWidth: 125,
      preProcessEditCellProps: validateString,
      renderEditCell: handleStringError,
      editable: true,
    },
    {
      field: "Quantity",
      type: "number",
      flex: 0.5,
      minWidth: 125,
      preProcessEditCellProps: validateNumber,
      renderEditCell: handleNumberError,
      editable: true,
    },
    {
      field: "Cost",
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
    { field: "Date", type: "dateTime", flex: 1, editable: true },
  ];

  const mockRows: GridRowsProp = data.map((item: any) => ({
    id: item.id,
    UserID: item.userId,
    Quantity: item.totalQuantity,
    Product: item.products[0].title,
    Cost: item.total,
    Date: new Date(),
  }));

  return (
    <DataTable header="Transactions" rowData={mockRows} columns={columns} />
  );
}
