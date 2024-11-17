import { Icons } from "@/src/components/icons copy"

export interface NavItem {
  title: string
  url: string
  disabled?: boolean
  external?: boolean
  shortcut?: [string, string]
  icon?: keyof typeof Icons
  label?: string
  description?: string
  isActive?: boolean
  items?: NavItem[]
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[]
}

export interface FooterItem {
  title: string
  items: {
    title: string
    href: string
    external?: boolean
  }[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

const responseStatus = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  408: "Request Timeout",
  410: "Gone",
  422: "Unprocessable Entity",
  429: "Too Many Requests",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
} as const

const reason = {
  REQUIRED: "The requested resource is required",
  NOT_AVAILABLE: "The requested resource is not available",
  EXPIRED: "The requested resource is expired",
  AUTHORIZED_CALLBACK_ERROR: "Authorization callback error",
  SIGNOUT_ERROR: "An error occurred during the sign-out process",
} as const

type ResponseStatus = typeof responseStatus
type ResponseCode = keyof ResponseStatus

type ErrorType = keyof typeof reason

type ResponseError = {
  success: false
  error: {
    code: ResponseCode
    type?: ErrorType
    message: string
  }
}

export type ResponseWithMessage =
  | {
      success: true
      code: ResponseCode
      message: string
    }
  | ResponseError

export type ResponseSuccess<T> =
  | {
      success: true
      code: ResponseCode
      message?: string
      data: T
    }
  | ResponseError

export type Response<T = boolean> = T extends object
  ? ResponseSuccess<T>
  : ResponseWithMessage
