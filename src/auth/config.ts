import {
  CredentialsProvider,
  // GithubProvider,
  FacebookProvider,
  GoogleProvider,
} from "@/src/auth/providers"

// import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  providers: [
    CredentialsProvider,
    FacebookProvider,
    // , GithubProvider
    GoogleProvider,
  ],
}
