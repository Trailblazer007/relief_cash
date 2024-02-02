import { getToken } from "@/lib/auth/get-token";
import { signToken } from "@/lib/auth/sign-tokens";
import { connectMongoDB } from "@/lib/mongoConnect.ts";
import { User } from "@/models/user.model";
import { verify } from "jsonwebtoken";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type DataType = UserType | { success: boolean };

const handler: NextApiHandler<DataType> = async (
  req: NextApiRequest,
  res: NextApiResponse<DataType>
) => {
  try {
    if (req.method === "GET") {
      await connectMongoDB();

      const token = getToken(req.headers, "x-access-token");

      if (!token) throw new Error("Please login");

      const payload = verify(token, process.env.JWT_ACCESS_SECRET!);

      const user = await User.findOne<UserType>({
        uid: (payload as any).sub,
      }).exec();

      // if user does not exists then throw an error
      if (!user) throw new Error("Invalid credentials");

      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
export default handler;
