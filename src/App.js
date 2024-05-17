import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Test from "./components/Test";

function App() {
  return (
    <>
      <BrowserRouter>
        <Test />
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
