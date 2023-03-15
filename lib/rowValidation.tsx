import { styled } from "@mui/material/styles";
import { Tooltip, tooltipClasses, TooltipProps } from "@mui/material";
import {
  GridEditInputCell,
  GridPreProcessEditCellProps,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";

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

const ErrorTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

function tooltipMessage(props: GridRenderEditCellParams, message: string) {
  return (
    <ErrorTooltip title={message} open={props.error}>
      <div>
        <GridEditInputCell {...props} />
      </div>
    </ErrorTooltip>
  );
}

export function handleStringError(props: GridRenderEditCellParams) {
  return tooltipMessage(props, "Field cannot be empty");
}

export function handleCurrencyError(props: GridRenderEditCellParams) {
  return tooltipMessage(props, "Input must be greater than 0");
}

export function handleNumberError(props: GridRenderEditCellParams) {
  return tooltipMessage(props, "Input must be a positive number");
}
