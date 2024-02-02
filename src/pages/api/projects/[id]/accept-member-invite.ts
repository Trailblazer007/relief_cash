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
    if (req.method === "POST") {
      await connectMongoDB();

      const projectId = req.query.id;

      const { code } = req.body;

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
        (invitation) => invitation.email === user.email
      );

      if (!savedToken) throw new Error("TOKEN_NOT_FOUND");

      const isTokenAMatch = await bcrypt.compare(code, savedToken.token);

      if (!isTokenAMatch) throw new Error("Can't validate token");

      const invitations = project.invitations.filter(
        (invitation) => invitation.email !== savedToken.email
      );

      const members: MemberType[] = [
        ...project.members,
        {
          uid: user.uid,
          role: savedToken.role,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          signInHistory: [],
          salary: "",
          payrollHistory: [],
        },
      ];

      await Project.updateOne({ projectId }, { invitations, members });

      res.status(200).json({ message: "Invitation accepted successfull" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
export default handler;
