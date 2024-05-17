import { useRoutes } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import { PUBLIC_PATH } from "../path";

export default function Router() {
    let router = useRoutes([
        {
            path: PUBLIC_PATH.LOGIN,
            element: <Login />
        },
        {
            path: PUBLIC_PATH.HOME,
            element: <Home />
        },
        {
            path: PUBLIC_PATH.REGISTER,
            element: <Register />
        },
    ])
    return router

}
