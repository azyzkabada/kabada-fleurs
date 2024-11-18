export const publicRoutes: string[] = [
  "/",
  "/resend-email",
  "/verify",
  "/error",
  "/testemail",
]

export const authRoutes: string[] = [
  "/login",
  "/register",
  "/email-sent",
  "/reset",
  "/new-password",
  "/two-factor",
]

export const apiAuthPrefix: string = "/api/auth"

export const DEFAULT_LOGIN_REDIRECT: string = "/profile"
export const DEFAULT_LOGOUT_REDIRECT: string = "/"
