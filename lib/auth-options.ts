import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcryptjs";

import db from "./db";

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error("NEXTAUTH_SECRET not found");
}

if (!process.env.GOOGLE_CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID not found");
}

if (!process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error("GOOGLE_CLIENT_SECRET not found");
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }
        // try {
        //   const response = await fetch(
        //     `${process.env.NEXTAUTH_URL}/api/auth/sign-in`,
        //     {
        //       method: "POST",
        //       body: JSON.stringify(credentials),
        //     }
        //   );
        //   if (response.ok) {
        //     const { user } = await response.json();
        //     return user;
        //   } else {
        //     return null;
        //   }
        // } catch (error) {
        //   console.log(error);
        //   return null;
        // }

        try {
          const user = await db.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          // if (!user) {
          //   return null;
          // }

          // if (!user.status) {
          //   return null;
          // }

          // const comparedPassword = await bcrypt.compare(
          //   credentials.password,
          //   user.password as string
          // );

          // if (!comparedPassword) {
          //   return null;
          // }

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/masuk",
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/auth/google`,
          {
            method: "POST",
            body: JSON.stringify(user),
          }
        );
        if (response.ok) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },
    async jwt({ token }) {
      const user = await db.user.findUnique({
        where: {
          email: token.email,
        },
      });
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.image,
          referralCode: user.referralCode,
          provider: user.provider,
          role: user.role,
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            id: token.id,
            name: token.name,
            email: token.email,
            image: token.picture,
            referralCode: token.referralCode,
            provider: token.provider,
            role: token.role,
          },
        };
      }
      return session;
    },
  },
};

export default authOptions;
