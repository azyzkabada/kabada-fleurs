"use server"

import { signOut } from "@/src/auth/index"
import { response } from "@/src/lib/utils"

// Fonction de déconnexion avec gestion d'erreurs NextAuth.js
export const logout = async () => {
  try {
    await signOut({
      redirect: true,
    })

    return response({
      success: true,
      code: 200,
      message: "Déconnexion réussie.",
    })
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error)

    // Si l'erreur ne correspond pas à AuthError
    return response({
      success: false,
      error: {
        code: 500,
        type: "SIGNOUT_ERROR",
        message: "Une erreur est survenue lors de la déconnexion",
      },
    })
  }
}
