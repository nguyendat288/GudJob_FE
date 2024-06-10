import { useRoutes } from "react-router-dom";

import {FREELANCER_PATH, PUBLIC_PATH, RECRUITER_PATH } from "../constaints/path";
import Register from "../pages/Public/Register";

import Login from "../pages/Public/Login";
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
import TopBarRecruiter from "../pages/Recruiter/LayOutRecruiter/TopBarRecruiter";
import UpdateProject from "../pages/Recruiter/UpdateProject/UpdateProject";
import ListProject from "../pages/Common/ListProject/ListProject";



export default function Router() {
    let router = useRoutes([
        {
            path: PUBLIC_PATH.LOGIN,
            element: <Login />
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
                    path: PUBLIC_PATH.LIST_PROJECT,
                    element: (
                      <Suspense fallback={<>Loading...</>}>
                        <ListProject />
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
                  // {
                  //   path: PUBLIC_PATH.DETAIL,
                  //   element: (
                  //     <Suspense fallback={<>Loading...</>}>
                  //       <L />
                  //     </Suspense>
                  //   )
                  // },
                ]
              }
            ]
          },
        // {
        //     path: PUBLIC_PATH.LIST_PROJECT,
        //     element: <Post />
        // },
        // {
        //     path: PUBLIC_PATH.DETAIL,
        //     element: <Detail />
        // },
        {
            path: '/unauthorized',
            element: <UnAuthorized />
          },
          {
            path: PUBLIC_PATH.NOT_FOUND,
            element: <NotFoundPage />
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
            element: <TopBarRecruiter />,
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
        //   {
        //     path: FREELANCER_PATH.LAYOUT,
        //     element: <LayOutFreelancer />,
        //     children: [
        //       {
        //         element: <RequireAuth allowedRoles={ROLES.FREELANCER} />,
        //         children: [
        //           {
        //             path: FREELANCER_PATH.HOME_FREELANCER,
        //             element: (
        //               <Suspense fallback={<>Loading...</>}>
        //                 <HomeFreelancer />
        //               </Suspense>
        //             )
        //           },
                 
        //         ]
        //       }
        //     ]
        //   },
    ])
    return router

}
