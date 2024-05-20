import { useRoutes } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import { PUBLIC_PATH } from "../path";
import CreatePost from "../components/CreatePost";
import Detail from "../components/Detail";

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
        {
            path: PUBLIC_PATH.CREATE_POST,
            element: <CreatePost />
        },
        {
            path: PUBLIC_PATH.DETAIL,
            element: <Detail />
        },
    ])
    return router

}
