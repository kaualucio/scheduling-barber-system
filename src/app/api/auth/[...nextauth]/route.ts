import { db } from "@/lib/db"
import { compare } from "bcryptjs"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          type: 'email',
          label: "Email",
        },
        password: {
          type: 'password',
          label: "Senha",
        },
      },
      authorize: async (credentials, req) => {
        try {
          
          const { email, password } = credentials!
          if(!email || !password) {
            throw new Error('Campos vázios não são permtidos!')  
          }
          
          const userExists = await db.barber.findUnique({
            where: {
              email,
            }
          })

          
          if(!userExists) {
            throw new Error('Usuário não encontrado.')  
          }
          
          const passwordsMatch = await compare(password, userExists.password)
          
          if(!passwordsMatch) {
            throw new Error('Usuário não encontrado.')  
          }
          userExists.password = undefined as any

          //TODO (se der tempo): implementar is_active

          // if(!userExists.is_active) {
          //   throw new Error('Usuário não encontrado.')  
          // }
          

          return {
            name: userExists.name,
            role: userExists.role,
            picture: userExists.picture,
            id: userExists.id,
            phone: userExists.phone,
            email: userExists.email,
          }

        } catch (error) {
          console.log(error)
          return null
        }
      },
    })
  ],
  pages: {
    signIn: '/login/dashboard',
  },
  callbacks: {
    async jwt({ session, token, user, trigger }) {
      if(trigger === 'update') {
        console.log(session)
        return {
          ...session.user,
        }
      }

      if(user) {
        return {
          ...token,
          ...user
        }
      }

      return token
    }, 
    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token
        }
      }
    }
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }