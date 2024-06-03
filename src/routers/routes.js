import { useRoutes } from "react-router-dom";

import { PUBLIC_PATH } from "../constaints/path";
import Register from "../pages/Public/Register";
import CreatePost from "../pages/Recruiter/CreatePost";
import Detail from "../pages/Common/Detail";
import Post from "../pages/Public/Post";
import Login from "../pages/Public/Login";
import Home from "../pages/Public/Home";



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
