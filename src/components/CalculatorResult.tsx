import { Grid, Typography } from "@mui/material";

interface CalculatorResultProps {
  deliveryFee: number | null;
}

function CalculatorResult({ deliveryFee }: CalculatorResultProps): JSX.Element {
  return (
    <Grid container item xs={12} style={{ margin: "20px 10px" }}>
      <Grid item xs={6}>
        <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "left" }}>
          Delivery Fee:
        </Typography>
      </Grid>
      {deliveryFee !== null && (
        <Grid item xs={5}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", textAlign: "right" }}
            data-test-id="fee"
          >
            {deliveryFee} euros
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}

export default CalculatorResult;
