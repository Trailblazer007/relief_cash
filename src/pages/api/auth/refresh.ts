import { getToken } from "@/lib/auth/get-token";
import { signToken } from "@/lib/auth/sign-tokens";
import { connectMongoDB } from "@/lib/mongoConnect.ts";
import { User } from "@/models/user.model";
import { verify } from "jsonwebtoken";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type DataType =
  | {
      accessToken: string;
    }
  | { success: boolean };

const handler: NextApiHandler<DataType> = async (
  req: NextApiRequest,
  res: NextApiResponse<DataType>
) => {
  try {
    if (req.method === "POST") {
      await connectMongoDB();

      const token = getToken(req.headers, "x-refresh-token");

      if (!token) throw new Error("Please login");

      const payload = verify(token, process.env.JWT_REFRESH_SECRET!);

      const user = await User.findOne<UserType>({
        uid: (payload as any).sub,
      }).exec();

      // if user does not exists then throw an error
      if (!user) throw new Error("Invalid credentials");

      // if password match create an access token and refresh token
      const accessToken = signToken({
        sub: user.uid,
        email: user.email,
        secret: process.env.JWT_ACCESS_SECRET!,
        expiresIn: process.env.ACCESS_EXPIRES_IN!,
      });

      res.status(200).json({ accessToken });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
export default handler;
