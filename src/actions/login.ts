"use server"

import { cookies } from "next/headers"
import { signIn } from "@/src/auth"
import { isExpired, response, signJwt } from "@/src/lib/utils"
import { loginSchema } from "@/src/schemas"
import { sendTwoFactorEmail } from "@/src/services/mail"
import {
  deleteTwoFactorConfirmationById,
  getTwoFactorConfirmationByUserId,
} from "@/src/services/two-factor-confirmation"
import { generateTwoFactorToken } from "@/src/services/two-factor-token"
import { getUserByEmail } from "@/src/services/user"
import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"
import { z } from "zod"

import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes"

export const login = async (payload: z.infer<typeof loginSchema>) => {
  // Vérifier si les champs saisis ne sont pas valides, retourner une erreur.
  const validatedFields = loginSchema.safeParse(payload)
  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Champs invalides.",
      },
    })
  }

  const { email, password } = validatedFields.data

  // Vérifier si l'utilisateur, l'email ou le mot de passe n'existe pas, retourner une erreur.
  const existingUser = await getUserByEmail(email)
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Identifiants invalides.",
      },
    })
  }

  // Vérifier si les mots de passe ne correspondent pas, retourner une erreur.
  const isPasswordMatch = await bcrypt.compare(password, existingUser.password)
  if (!isPasswordMatch) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Identifiants invalides.",
      },
    })
  }

  // Vérifier si l'email de l'utilisateur n'est pas encore vérifié, retourner une erreur.
  // if (!existingUser.emailVerified) {
  //   return response({
  //     success: false,
  //     error: {
  //       code: 401,
  //       message:
  //         "Votre adresse email n'est pas encore vérifiée. Veuillez vérifier vos emails.",
  //     },
  //   })
  // }

  // Vérifier si l'utilisateur a activé l'authentification à deux facteurs.
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    const existingTwoFactorConfirmation =
      await getTwoFactorConfirmationByUserId(existingUser.id)
    const hasExpired = isExpired(existingTwoFactorConfirmation?.expires!)

    // Si la confirmation à deux facteurs existe mais est expirée, la supprimer.
    if (existingTwoFactorConfirmation && hasExpired) {
      await deleteTwoFactorConfirmationById(existingTwoFactorConfirmation.id)
    }

    // Si la confirmation à deux facteurs n'existe pas ou est expirée, gérer l'envoi du code.
    if (!existingTwoFactorConfirmation || hasExpired) {
      const cookieStore = cookies()
      const token = signJwt(validatedFields.data)
      cookieStore.set("credentials-session", token)

      const twoFactorToken = await generateTwoFactorToken(existingUser.email)
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token)

      return response({
        success: true,
        code: 200,
        message:
          "Veuillez confirmer votre code d'authentification à deux facteurs.",
      })
    }
  }

  // Essayer de se connecter avec les identifiants.
  return await signInCredentials(email, password)
}

// Connexion avec les identifiants via next-auth
export const signInCredentials = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return response({
            success: false,
            error: {
              code: 401,
              type: "REQUIRED",
              message: "Identifiants invalides.",
            },
          })

        case "OAuthAccountNotLinked":
          return response({
            success: false,
            error: {
              code: 403,
              type: "NOT_AVAILABLE",
              message:
                "Un autre compte est déjà enregistré avec cette adresse email. Veuillez vous connecter avec un compte différent.",
            },
          })

        case "Verification":
          return response({
            success: false,
            error: {
              code: 422,
              type: "EXPIRED",
              message: "Échec de la vérification. Veuillez réessayer.",
            },
          })

        case "InvalidCallbackUrl":
          return response({
            success: false,
            error: {
              code: 422,
              type: "AUTHORIZED_CALLBACK_ERROR",
              message: "Erreur de rappel d'autorisation. Veuillez réessayer.",
            },
          })

        case "OAuthCallbackError":
          return response({
            success: false,
            error: {
              code: 422,
              type: "AUTHORIZED_CALLBACK_ERROR",
              message: "Erreur de rappel d'autorisation. Veuillez réessayer.",
            },
          })

        case "CallbackRouteError":
          return response({
            success: false,
            error: {
              code: 422,
              type: "AUTHORIZED_CALLBACK_ERROR",
              message: "Erreur de rappel d'autorisation. Veuillez réessayer.",
            },
          })

        default:
          console.log(error)
          return response({
            success: false,
            error: {
              code: 500,
              type: "NOT_AVAILABLE",
              message: "Une erreur est survenue.",
            },
          })
      }
    }

    throw error
  }
}
