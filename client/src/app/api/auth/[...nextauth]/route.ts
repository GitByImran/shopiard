import UserModel from "@/models/user";
import { connect } from "@/utils/db";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: any = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        await connect();
        const { email, password }: any = credentials;
        try {
          const user = await UserModel.findOne({ email });
          if (!!user) {
            const matchPassword = await bcrypt.compare(
              password,
              user?.password
            );
            if (matchPassword) {
              return user;
            }
          }
          return null;
        } catch (error) {
          throw new Error("user not found");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
