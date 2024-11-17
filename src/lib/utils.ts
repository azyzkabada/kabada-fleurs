import { Response, ResponseWithMessage } from "@/types"
import { Active, DataRef, Over } from "@dnd-kit/core"
import bcrypt from "bcryptjs"
import { sign, verify, type Secret, type SignOptions } from "jsonwebtoken"

import { ColumnDragData } from "@/app/dashboard/kanban/_components/board-column"
import { TaskDragData } from "@/app/dashboard/kanban/_components/task-card"

type DraggableData = ColumnDragData | TaskDragData

export function hasDraggableData<T extends Active | Over>(
  entry: T | null | undefined
): entry is T & {
  data: DataRef<DraggableData>
} {
  if (!entry) {
    return false
  }

  const data = entry.data.current

  if (data?.type === "Column" || data?.type === "Task") {
    return true
  }

  return false
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number
    sizeType?: "accurate" | "normal"
  } = {}
) {
  const { decimals = 0, sizeType = "normal" } = opts

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
  if (bytes === 0) return "0 Byte"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, await bcrypt.genSalt())
}

/**
 * Function to check whether the given value is expired or not.
 * @param expires The date that want to check
 * @return true if the value is expired, false otherwise
 */
export function isExpired(expires: Date): boolean {
  return new Date(expires) < new Date()
}

/**
 * Function to set token expiration.
 * @param exp Duration of token expiration, default is 3600 milliseconds or 1 hour
 * @return Generates datetime for the token expiration
 */
export function setTokenExpiration(exp: number = 60 * 60) {
  return new Date(new Date().getTime() + 1000 * exp)
}

/**
 * Function to generate jwt.
 * @param payload The payload want to generate
 * @param options The sign options
 * @return The token generated
 */

export function signJwt(
  payload: Record<string, unknown>,
  options?: SignOptions
) {
  return sign(payload, process.env.JWT_SECRET as Secret, {
    ...options,
    algorithm: "HS256",
  })
}

export const verifyJwtToken = <T extends object>(token: string) => {
  try {
    const decoded = verify(token, process.env.JWT_SECRET as Secret)
    return {
      valid: true,
      decoded: decoded as T,
    }
  } catch (error) {
    return {
      valid: false,
      decoded: null,
    }
  }
}

// Overload for response status in server action
export function response(response: ResponseWithMessage): Response
export function response<T extends Record<string, unknown>>(
  response: Response<T>
): Response<T>
export function response<T extends object>(response: T): T {
  return response
}
