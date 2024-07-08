import { BrowserRouter } from "react-router-dom";
import Router from "./routers/routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@mui/material'
import { theme } from './themes/theme'
import { Helmet } from "react-helmet";
import { GoogleOAuthProvider } from "@react-oauth/google";
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <BrowserRouter>
            <Helmet>
              <title>Good Job</title>
            </Helmet>
            <Router />
            <ToastContainer />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
