import {
  CredentialsProvider,
  GithubProvider,
  GoogleProvider,
} from "@/src/auth/providers"

// import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  providers: [CredentialsProvider, GithubProvider, GoogleProvider],
}
