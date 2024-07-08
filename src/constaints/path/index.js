export const PUBLIC_PATH = {
    LAYOUT: "/",
    LOGIN: "/login",
    HOME:'/home',
    REGISTER: "/register",
    SEARCH_PROJECT: "/search/:searchKey",
    SEARCH_CATEGORY_PROJECT: "/category/:idCate",
    DETAIL: "/detail/:projectId",
    RESET: "/reset-password",
    USER_PROFILE: "/profile/:userId",
    NOT_FOUND: '*',
}

export const FREELANCER_PATH = {
    LAYOUT: "/",
    PROFILE: "/profile",
    PROFILE_SETTING: "/profile-setting",
    CHANGE_PASSWORD: "/change-password",
    EXPERIENCE_EDUCATION: "/experience-education",
    SETTING: "/setting",
    CHAT :'/chat/:conversationId/:userId'
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
    HOME_ADMIN : "/admin",
    LIST_USERS: "/users-list",
    REPORT_LIST: "report-list",
    PROJECT_LIST: "project-list",
    ROLES: "/roles"
}