export const publicRoutes: string[] = ["/verify", "/", "/connexion"]

export const authRoutes: string[] = [
  "/login",
  "/register",
  "/error",
  "/resend",
  "/reset",
  "/new-password",
  "/two-factor",
  "/testemail",
]

export const apiAuthPrefix: string = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT: string = "/profile"
export const DEFAULT_LOGOUT_REDIRECT: string = "/logout"
