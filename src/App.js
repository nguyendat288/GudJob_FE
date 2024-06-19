import { BrowserRouter } from "react-router-dom";
import Router from "./routers/routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { gapi } from "gapi-script";
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
      <BrowserRouter>
        <Router />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
