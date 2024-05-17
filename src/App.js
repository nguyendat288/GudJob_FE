import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Test from "./components/Test";
import Router from "./routers/routes";

function App() {
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
