import { getTokenPayload } from "@/lib/auth/get-token-payload";
import { connectMongoDB } from "@/lib/mongoConnect.ts";
import { Project } from "@/models/projects.model";
import { User } from "@/models/user.model";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";

type DataType = { message: string } | { success: boolean };

const handler: NextApiHandler<DataType> = async (
  req: NextApiRequest,
  res: NextApiResponse<DataType>
) => {
  try {
    if (req.method === "DELETE") {
      await connectMongoDB();

      const projectId = req.query.id;

      const { email } = req.body;

      const { sub } = getTokenPayload(req.headers, "x-access-token");

      const user = await User.findOne<UserType>({
        uid: sub,
      }).exec();

      // if user does not exists then throw an error
      if (!user) throw new Error("Invalid credentials");

      const project = await Project.findOne<ProjectType>({
        projectId,
      });

      if (!project) throw new Error(`Project with id ${projectId} not found`);

      const savedToken = project.invitations.find(
        (invitation) => invitation.email === email
      );

      if (!savedToken) throw new Error("Invitation not found");

      const invitations = project.invitations.filter(
        (invitation) => invitation.email !== email
      );

      await Project.updateOne({ projectId }, { invitations });

      res
        .status(200)
        .json({ success: false, message: "Invitation accepted successfull" });
    }
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
export default handler;
