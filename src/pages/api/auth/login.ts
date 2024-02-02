import { comparePassword } from "@/lib/auth/compare-password";
import { signTokens } from "@/lib/auth/sign-tokens";
import { connectMongoDB } from "@/lib/mongoConnect.ts";
import { User } from "@/models/user.model";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type DataType =
  | {
      accessToken: string;
      refreshToken: string;
    }
  | { success: boolean };

const handler: NextApiHandler<DataType> = async (
  req: NextApiRequest,
  res: NextApiResponse<DataType>
) => {
  try {
    if (req.method === "POST") {
      await connectMongoDB();

      const { email, password } = req.body;

      const user = await User.findOne<UserType>({
        email,
      }).exec();

      // if user does not exists then throw an error
      if (!user) throw new Error("Invalid credentials");

      // if user exists then compare if stored password matches with input password
      await comparePassword(password, user.password);

      // if password match create an access token and refresh token
      const tokens = signTokens(user.uid, user.email);

      res.status(200).json(tokens);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
export default handler;
