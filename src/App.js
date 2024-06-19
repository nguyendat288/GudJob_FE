import { BrowserRouter } from "react-router-dom";
import Router from "./routers/routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { gapi } from "gapi-script";
import { ThemeProvider } from '@mui/material'
import { theme } from './themes/theme'
import { Helmet } from "react-helmet";
import { CLIENT_ID } from "./services";

function App() {

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: ""
      })
    };
    gapi.load('client:auth2', start);
  })
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
