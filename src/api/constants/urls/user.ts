// Define the base URL for the user account-related services
export const USER_BASE_URL = "/accounts/";

// Endpoints related to account actions
export const USER_LOGIN_URL = `${USER_BASE_URL}login/`;

export const USER_LOGOUT_URL = `${USER_BASE_URL}logout/`;

export const ADMIN_REGISTER_URL = `${USER_BASE_URL}register-admin/`;
export const USER_REGISTER_URL = `${USER_BASE_URL}register/`;
export const USERS_LIST_URL = `${USER_BASE_URL}users/`;

// Dynamic endpoints that require an ID
// Function to generate URL for user by ID
export const userURLWithId = (id: string | number) => `${USER_BASE_URL}${id}/`;

// Endpoints for specific user actions
export const USER_UPDATE_URL = (id: string | number) => `${userURLWithId(id)}`;
export const USER_PARTIAL_UPDATE_URL = (id: string | number) =>
  `${userURLWithId(id)}patch/`;
export const USER_DELETE_URL = (id: string | number) => `${userURLWithId(id)}`;
export const USER_DELETE_CUSTOM_URL = (id: string | number) =>
  `${userURLWithId(id)}delete/`;
export const USER_GENERATE_TOKEN_URL = (id: string | number) =>
  `${userURLWithId(id)}tokens/generate/`;
