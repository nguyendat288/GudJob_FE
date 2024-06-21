import { BrowserRouter } from "react-router-dom";
import Router from "./routers/routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material'
import { theme } from './themes/theme'
import { Helmet } from "react-helmet";
import { CLIENT_ID } from "./services";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {

  return (
    <>
      <Helmet>
          <title>Good Job</title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <BrowserRouter>
            <Router />
            <ToastContainer />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
