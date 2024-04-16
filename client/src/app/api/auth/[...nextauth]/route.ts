import UserModel from "@/models/user";
import { connect } from "@/utils/db";
import bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextApiRequest, NextApiResponse } from "next";

const handler: any = NextAuth({
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
});

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};

export type NextAuthRequest = NextApiRequest & { query: any };
export type NextAuthResponse = NextApiResponse;

export const GET = async (
  req: NextAuthRequest,
  res: NextAuthResponse
): Promise<void> => {
  await handler(req, res);
};

export const POST = async (
  req: NextAuthRequest,
  res: NextAuthResponse
): Promise<void> => {
  await handler(req, res);
};
