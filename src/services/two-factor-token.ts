import crypto from "node:crypto"
import { prisma } from "@/src/lib/prisma"
import { setTokenExpiration } from "@/src/lib/utils"

export const generateTwoFactorToken = async (email: string) => {
  const existingToken = await getTwoFactorTokenByEmail(email)
  if (existingToken) {
    await deleteTwoFactorTokenById(existingToken.id)
  }

  const token = String(crypto.randomInt(100000, 1000000))
  const expires = setTokenExpiration(60 * 2) // 2 minutes

  const twoFactorToken = await prisma.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    },
  })

  return twoFactorToken
}

export const getTwoFactorToken = async (token: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findUnique({
      where: { token },
    })

    return twoFactorToken
  } catch {
    return null
  }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { email },
    })

    return twoFactorToken
  } catch {
    return null
  }
}

export const deleteTwoFactorTokenById = async (id: string) => {
  try {
    return await prisma.twoFactorToken.delete({
      where: { id },
    })
  } catch {
    return null
  }
}
