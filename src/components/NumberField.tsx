import { Grid, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";
import { NumericFormat } from "react-number-format";

interface NumberFieldProps {
  dataTestId: string;
  error: boolean;
  decimalScale?: number;
  endAdornment?: string;
  id: string;
  label: string;
  name: string;
  value: number | "";
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
}

function NumberField(props: NumberFieldProps): JSX.Element {
  return (
    <Grid item xs={12} style={{ margin: "20px 10px" }}>
      <NumericFormat
        id={props.id}
        customInput={TextField}
        label={props.label}
        value={props.value}
        allowLeadingZeros={false}
        decimalSeparator=","
        margin="none"
        decimalScale={props.decimalScale ? props.decimalScale : undefined}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {" "}
              {props.endAdornment || ""}
            </InputAdornment>
          ),
          inputProps: {
            min: 0,
            "data-test-id": props.dataTestId,
            name: props.name,
            notched: "true",
          },
        }}
        onChange={(e) => props.handleChange(e)}
        fullWidth
        required
        error={props.error}
        helperText={props.error && "This field must contain a valid number"}
        FormHelperTextProps={{
          sx: {
            backgroundColor: "primary.main",
            padding: 0,
            margin: 0,
          },
        }}
      />
    </Grid>
  );
}

export default NumberField;
