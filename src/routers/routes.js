import { Navigate, useRoutes } from "react-router-dom";
import { FREELANCER_PATH, PUBLIC_PATH, RECRUITER_PATH } from "../constaints/path";
import Register from "../pages/Public/Register";
import Login from "../pages/Public/Login";
import Profile from "../pages/Common/Profile";
import Setting from "../pages/Common/Profile/Setting";
import ChangePassword from "../pages/Common/Profile/ChangePassword";
import ExperienceEducation from "../pages/Common/Profile/ExperienceEducation";
import ProfileSetting from "../pages/Common/Profile/ProfileSetting";
import ResetPasswordPage from "../pages/Public/ResetPassword";
import NotFoundPage from "../components/NotFoundPage";
import UnAuthorized from "../components/UnAuthorized";
import { ROLES } from "../constaints/role";
import RequireAuth from "../components/RequireAuth";
import { Suspense } from "react";
import HomeRecruiter from "../pages/Recruiter/Home/HomeRecruiter";
import LayOutRecruiter from "../pages/Recruiter/LayOutRecruiter/LayOutRecruiter";
import Home from "../pages/Freelancer/Home/Home";
import LayOutFreelancer from "../pages/Freelancer/LayOut/LayOutFreelancer";
import ListProjectRecruiter from "../pages/Recruiter/ListProjectRecruiter/ListProjectRecruiter";
import CreateProject from "../pages/Recruiter/CreateProject/CreateProject";
import Detail from "../pages/Common/Detail/Detail";
import UpdateProject from "../pages/Recruiter/UpdateProject/UpdateProject";
import Search from "../pages/Common/ListProject/Search";
import Filter from "../pages/Common/ListProject/Filter";
import SideBar from "../pages/Common/Profile/component/SideBar";
import TopBarFreelancer from "../pages/Freelancer/LayOut/TopBarFreelancer";
import Chat from "../pages/Common/Chat/Chat";

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
      path: PUBLIC_PATH.REGISTER,
      element: <Register />
    },
    {
      path: PUBLIC_PATH.LAYOUT,
      element: <LayOutFreelancer />,
      children: [
        {
          children: [
            {
              path: PUBLIC_PATH.HOME,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <Home />
                </Suspense>
              )
            },
            {
              path: PUBLIC_PATH.SEARCH_PROJECT,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <Search />
                </Suspense>
              )
            },
            {
              path: PUBLIC_PATH.SEARCH_CATEGORY_PROJECT,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <Filter />
                </Suspense>
              )
            },
            {
              path: PUBLIC_PATH.DETAIL,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <Detail />
                </Suspense>
              )
            },
          ]
        }
      ]
    },
    {
      path: '/unauthorized',
      element: <UnAuthorized />
    },
    {
      path: PUBLIC_PATH.NOT_FOUND,
      element: <NotFoundPage />
    },
    {
      path: FREELANCER_PATH.LAYOUT,
      element: <LayOutFreelancer />,
      children: [
        {
          element: <RequireAuth allowedRoles={ROLES.FREELANCER} />,
          children: [
            {
              path: FREELANCER_PATH.PROFILE,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <Profile />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: FREELANCER_PATH.LAYOUT,
      element: <TopBarFreelancer />,
      children: [
        {
          element: <RequireAuth allowedRoles={[ROLES.FREELANCER,ROLES.RECRUITER,ROLES.ADMIN]} />,
          children: [
            {
              path: FREELANCER_PATH.CHAT,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <Chat />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    {
      path: FREELANCER_PATH.LAYOUT,
      element: <Setting />,
      children: [
        {
          element: <RequireAuth allowedRoles={ROLES.FREELANCER} />,
          children: [
            {
              path: FREELANCER_PATH.PROFILE_SETTING,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ProfileSetting />
                </Suspense>
              )
            },
            {
              path: FREELANCER_PATH.CHANGE_PASSWORD,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: FREELANCER_PATH.EXPERIENCE_EDUCATION,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ExperienceEducation />
                </Suspense>
              )
            },
          ]
        }
      ]
    },
    {
      path: RECRUITER_PATH.LAYOUT,
      element: <LayOutRecruiter />,
      children: [
        {
          element: <RequireAuth allowedRoles={ROLES.RECRUITER} />,
          children: [
            {
              path: RECRUITER_PATH.HOME_RECRUITER,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <HomeRecruiter />
                </Suspense>
              )
            },
            {
              path: RECRUITER_PATH.LIST_PROJECT_RECRUITER,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <ListProjectRecruiter />
                </Suspense>
              )
            },
          ]
        }
      ]
    },
    {
      path: RECRUITER_PATH.LAYOUT,
      children: [
        {
          element: <RequireAuth allowedRoles={ROLES.RECRUITER} />,
          children: [
            {
              path: RECRUITER_PATH.DETAIL_PROJECT,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <Detail />
                </Suspense>
              )
            },
            {
              path: RECRUITER_PATH.UPDATE_PROJECT,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <UpdateProject />
                </Suspense>
              )
            },
          ]
        }
      ]
    },
    {
      path: RECRUITER_PATH.LAYOUT,
      children: [
        {
          element: <RequireAuth allowedRoles={ROLES.RECRUITER} />,
          children: [
            {
              path: RECRUITER_PATH.CREATE_NEW_PROJECT,
              element: (
                <Suspense fallback={<>Loading...</>}>
                  <CreateProject />
                </Suspense>
              )
            },
          ]
        }
      ]
    },
  ])
  return router

}
