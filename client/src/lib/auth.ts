import UserModel from "@/models/user";
import { connect } from "@/utils/db";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: any = {
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
              console.log(user);
              return {
                ...user,
                name: user.name,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
              };
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
    async jwt({ token, account, user }: any) {
      if (user) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token, user }: any) {
      if (session?.user) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
};
