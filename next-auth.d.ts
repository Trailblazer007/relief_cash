declare global {
  declare module "next-auth" {
    interface Session {
      user: NextAuthUserType;
    }

    interface JWT {
      uid: string;
    }
  }
}

type NextAuthUserType = UserType & {
  accessToken: string;
  refreshToken: string;
};
