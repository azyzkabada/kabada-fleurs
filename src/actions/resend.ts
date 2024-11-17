"use server"

import { response } from "@/src/lib/utils"
import { resendSchema } from "@/src/schemas"
import { sendVerificationEmail } from "@/src/services/mail"
import {
  generateVerificationToken,
  getVerificationTokenByEmail,
} from "@/src/services/verification-token"
import { z } from "zod"

export const resendToken = async (payload: z.infer<typeof resendSchema>) => {
  // Check if user input is not valid.
  const validatedFields = resendSchema.safeParse(payload)
  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Invalid fields.",
      },
    })
  }

  const { email } = validatedFields.data

  // Check if token doesn't exist, then return an error.
  const existingToken = await getVerificationTokenByEmail(email)
  if (!existingToken) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Failed to resend verification email.",
      },
    })
  }

  // Generate verification token and resend to the email.
  const verificationToken = await generateVerificationToken(existingToken.email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)

  // Return response success.
  return response({
    success: true,
    code: 201,
    message: "Confirmation email sent. Please check your email.",
  })
}
