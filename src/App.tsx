import { Container, Paper, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import CalculatorForm from "./components/CalculatorForm";
import CalculatorResult from "./components/CalculatorResult";
import { calculateDeliveryFee } from "./utils/calculations";

const theme = createTheme({
  typography: {
    fontFamily: "Omnes, sans-serif",
  },
  palette: {
    primary: {
      main: "#f2f3f5", // grey
    },
    secondary: {
      main: "#009de0", // blue
    },
  },
  components: {
    MuiInputLabel: {
      defaultProps: {
        sx: {
          color: "white",
          fontSize: "large",
          backgroundColor: "#009de0",
          paddingX: "10px",
          borderRadius: "4px",
        },
        shrink: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          backgroundColor: "white",
        },
      },
    },
  },
});

function App() {
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);

  const handleCalculateDeliveryFee = (
    cartValue: number,
    distance: number,
    numOfItems: number,
    orderTime: Dayjs,
  ) => {
    const calculatedFee = calculateDeliveryFee(
      cartValue,
      distance,
      numOfItems,
      orderTime,
    );
    setDeliveryFee(calculatedFee);
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "primary.main",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }} gutterBottom>
              Delivery Fee Calculator
            </Typography>

            <CalculatorForm calculateDeliveryFee={handleCalculateDeliveryFee} />
            <CalculatorResult deliveryFee={deliveryFee} />
          </Paper>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
