import { DefaultSession, DefaultUser } from "next-auth"
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      tenantId: string
      role: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    tenantId: string
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    tenantId: string
    role: string
  }
}
