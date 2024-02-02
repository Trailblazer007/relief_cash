import { getTokenPayload } from "@/lib/auth/get-token-payload";
import { connectMongoDB } from "@/lib/mongoConnect.ts";
import { customAlphabet, nanoid } from "@/lib/nanoid";
import { Project } from "@/models/projects.model";
import { User } from "@/models/user.model";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import { v4 } from "uuid";
import { transporter } from "../../../lib/email-sender";
import { projectMemberInvite } from "@/emails-template/project-member-invite";
import clean from "@/lib/clean";

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
    if (req.method === "DELETE") {
      await connectMongoDB();

      const { projectId } = req.body;

      const { sub } = getTokenPayload(req.headers, "x-access-token");

      const user = await User.findOne<UserType>({
        uid: sub,
      }).exec();

      if (!user) throw new Error("Invalid credentials");

      const project = await Project.findOne<ProjectType>({
        members: { $elemMatch: { uid: sub, role: "employer" } },
      });

      if (!project) throw new Error("Permission denial");

      await Project.deleteOne({ projectId });

      res.status(200).json({ message: "Project deleted successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
export default handler;
