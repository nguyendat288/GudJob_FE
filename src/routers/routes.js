import { Navigate, useRoutes } from "react-router-dom";
import { PUBLIC_PATH } from "../constaints/path";
import Register from "../pages/Public/Register";
import CreatePost from "../pages/Recruiter/CreatePost";
import Detail from "../pages/Common/Detail";
import Post from "../pages/Public/Post";
import Login from "../pages/Public/Login";
import Home from "../pages/Public/Home";
import Profile from "../pages/Common/Profile";
import Setting from "../pages/Common/Profile/Setting";
import ChangePassword from "../pages/Common/Profile/ChangePassword";
import ExperienceEducation from "../pages/Common/Profile/ExperienceEducation";
import ProfileSetting from "../pages/Common/Profile/ProfileSetting";
import ResetPasswordPage from "../pages/Public/ResetPassword";



export default function Router() {
    let router = useRoutes([
        {
            path: PUBLIC_PATH.LOGIN,
            element: <Login />
        },
        {
            path: PUBLIC_PATH.RESET,
            element: <ResetPasswordPage />
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
        {
            path: PUBLIC_PATH.PROFILE,
            element: <Profile />
        },
        {
            path: PUBLIC_PATH.SETTING,
            element: <Setting />,
            children: [
                {
                    index: true,
                    element: <Navigate to="profile-setting" replace />
                },
                {
                    path: "profile-setting",
                    element: <ProfileSetting />
                },
                {
                    path: "change-password",
                    element: <ChangePassword />
                },
                {
                    path: "experience-education",
                    element: <ExperienceEducation />
                }
            ]
        },
    ])
    return router

}
