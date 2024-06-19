import { BrowserRouter } from "react-router-dom";
import Router from "./routers/routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { gapi } from "gapi-script";

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
      <BrowserRouter>
        <Router />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
