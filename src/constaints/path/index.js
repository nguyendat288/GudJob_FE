export const PUBLIC_PATH = {
  LAYOUT: '/',
  LOGIN: '/login',
  HOME: '/home',
  REGISTER: '/register',
  BLOG: '/blog',
  BLOG_DETAIL: '/blog-detail/:blogId',
  SEARCH_PROJECT: '/search/:searchKey',
  LIST_PROJECT: '/search',
  SEARCH_CATEGORY_PROJECT: '/category/:idCate',
  DETAIL: '/detail/:projectId',
  RESET: '/reset-password',
  USER_PROFILE: '/profile/:userId',
  PAYMENT: '/payment',
  NOT_FOUND: '*',
};

export const FREELANCER_PATH = {
  LAYOUT: '/',
  PROFILE: '/profile',
  PROFILE_SETTING: '/profile-setting',
  CHANGE_PASSWORD: '/change-password',
  EXPERIENCE_EDUCATION: '/experience-education',
  CURRENT_PROJECT: 'current-project',
  SETTING: '/setting',
  CHAT: '/chat/:conversationId/:userId',
  FAVORITE_LIST: '/favorite-list',
};

export const RECRUITER_PATH = {
  LAYOUT: '/',
  HOME_RECRUITER: '/recruiter',
  LIST_PROJECT_RECRUITER: '/list-project-recruiter/:status',
  CREATE_NEW_PROJECT: '/create-new-project',
  UPDATE_PROJECT: '/update-project/:projectId',
};

export const ADMIN_PATH = {
  LAYOUT: '/',
  HOME_ADMIN: '/admin',
  LIST_USERS: '/users-list',
  REPORT_LIST: 'report-list',
  PROJECT_LIST: 'project-list',
  CREATE_BLOG: 'create-blog',
  UPDATE_BLOG: 'update-blog/:blogId',
  VIEW_BLOG: 'view-blog',
  CATEGORY_LIST: 'category-list',
  ROLES: '/roles',
  SKILL_LIST: '/skill-list',
};
