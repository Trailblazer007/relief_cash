import { comparePassword } from "@/lib/auth/compare-password";
import { signTokens } from "@/lib/auth/sign-tokens";
import { connectMongoDB } from "@/lib/mongoConnect.ts";
import { Project } from "@/models/projects.model";
import { User } from "@/models/user.model";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

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

      const { name, members } = req.body;

      await Project.create({
        name,
        invitations: members,
      });

      res.status(200).json({ message: "Project created successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
export default handler;
