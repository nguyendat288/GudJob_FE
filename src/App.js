import { BrowserRouter } from "react-router-dom";
import Router from "./routers/routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { gapi } from "gapi-script";
import { ThemeProvider } from '@mui/material'
import { theme } from './themes/theme'
import { Helmet } from "react-helmet";

const clientId = "450961354950-5c0u9lcvgcrvbgk3u0l7j3c0m0046bkk.apps.googleusercontent.com"
function App() {

  useEffect(()=>{
    function start(){
      gapi.client.init({
        clientId: clientId,
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
