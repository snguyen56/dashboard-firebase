import { GridPreProcessEditCellProps } from "@mui/x-data-grid";

export const validateString = (params: GridPreProcessEditCellProps) => {
  const hasError = params.props.value === "";
  return { ...params.props, error: hasError };
};

export const validateCurrency = (params: GridPreProcessEditCellProps) => {
  const hasError = params.props.value <= 0;
  return { ...params.props, error: hasError };
};

export const validateNumber = (params: GridPreProcessEditCellProps) => {
  const hasError = params.props.value < 0;
  return { ...params.props, error: hasError };
};
