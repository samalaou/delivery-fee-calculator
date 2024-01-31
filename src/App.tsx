
import { Container, Paper, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;