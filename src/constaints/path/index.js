export const PUBLIC_PATH = {
    LAYOUT: "/",
    LOGIN: "/login",
    HOME:'/home',
    REGISTER: "/register",
    LIST_PROJECT: "/list-project/:search",
    DETAIL: "/detail/:projectId",
    NOT_FOUND: '*',
}

export const FREELANCER_PATH = {
    LAYOUT: "/",
}

export const RECRUITER_PATH = {
    LAYOUT: "/",
    DETAIL_PROJECT :"/details/:projectId",
    HOME_RECRUITER: "/recruiter",
    LIST_PROJECT_RECRUITER: "/list-project-recruiter",
    CREATE_NEW_PROJECT: "/create-new-project",
    UPDATE_PROJECT: "/update-project/:projectId",
}

export const ADMIN_PATH = {
    LAYOUT: "/",
    HOME_ADMIN :"/admin"
}