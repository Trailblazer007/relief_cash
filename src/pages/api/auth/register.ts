import { hashPassword } from "@/lib/auth/hash-password";
import { connectMongoDB } from "@/lib/mongoConnect.ts";
import { User } from "@/models/user.model";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { v4 } from "uuid";

type DataType =
  | {
      message: string;
    }
  | { success: boolean };

const handler: NextApiHandler<DataType> = async (
  req: NextApiRequest,
  res: NextApiResponse<DataType>
) => {
  try {
    if (req.method === "POST") {
      await connectMongoDB();

      const { email, firstName, lastName, password } = req.body;

      const user = await User.findOne<UserType>({ email }).exec();

      // if user does not exists then throw an error
      if (user) throw new Error("Account already exists, please login");

      // hashing user password
      const hash = await hashPassword(password);

      // generating user id
      const uid = v4();

      console.log(uid);

      // creating new account for the user
      const newUser = await User.create({
        uid,
        email,
        firstName,
        lastName,
        password: hash,
      });

      // checking if there was an error creating user if there was throw an error
      if (!newUser)
        throw new Error("A server error has occured, please try again");

      res.status(200).json({ message: "Registration successfull" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
export default handler;
