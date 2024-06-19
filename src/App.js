import { BrowserRouter } from "react-router-dom";
import Router from "./routers/routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material'
import { theme } from './themes/theme'
import { Helmet } from "react-helmet";

function App() {
  return (
    <>
    <Helmet>
        <title>Good Job</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
