export enum Role {
  USERS = "users",
  ARTIST = "artist",
  STUDIO = "studio_manager",
  REGULAR = "regular",
  ADMIN = "admin",
}

// any route in this list is considered as unauthenticated routes,
// outside this list, app will redirect user to register page if user has not logged in yet
export const unauthRoutes = [];

// Outside this list, route will be remember if they access to page without login,
// after login, they will be redirected to previous page
export const nonRememberRoutes = ["/login", "/register", "/register-selection"];

// Only these routes can access to dashboard side bar
export const dashboardRoutes = [];

// Route to Admin component
export const adminRoutes = [];

export const PasswordValidationRegex = /(?=.*[a-zA-Z])(?=.*[0-9]).{6,10}/;

export const googleAppId = "";
