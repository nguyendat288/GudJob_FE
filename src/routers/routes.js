import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { PUBLIC_PATH } from "../path";
import CreatePost from "../pages/CreatePost";
import Detail from "../pages/Detail";
import Post from "../pages/Post";

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
            path: PUBLIC_PATH.VIEW_POST,
            element: <Post />
        },
        {
            path: PUBLIC_PATH.DETAIL,
            element: <Detail />
        },
    ])
    return router

}
