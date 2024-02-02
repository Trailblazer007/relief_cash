import { getTokenPayload } from "@/lib/auth/get-token-payload";
import { connectMongoDB } from "@/lib/mongoConnect.ts";
import { Project } from "@/models/projects.model";
import { User } from "@/models/user.model";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { isSameDay } from "date-fns";

type DataType = { message: string } | { success: boolean };

const handler: NextApiHandler<DataType> = async (
  req: NextApiRequest,
  res: NextApiResponse<DataType>
) => {
  try {
    if (req.method === "POST") {
      await connectMongoDB();

      const projectId = req.query.id;

      const { sub } = getTokenPayload(req.headers, "x-access-token");

      const user = await User.findOne<UserType>({
        uid: sub,
      }).exec();

      // if user does not exists then throw an error
      if (!user) throw new Error("Invalid credentials");

      const project = await Project.findOne<ProjectType>({
        projectId,
        members: { $elemMatch: { uid: sub } },
      });

      if (!project) throw new Error(`Project with id ${projectId} not found`);

      const member = project.members.find((member) => member.uid === sub);

      if (!member) throw new Error(`Member with id ${sub} not found`);

      const sameDate = !!member.signInHistory.find((history) =>
        isSameDay(new Date(), new Date(history))
      );

      if (sameDate)
        return res.status(200).json({ message: "You already sign in today" });

      const members = project.members.map((member) =>
        member.uid === sub
          ? {
              uid: member.uid,
              firstName: member.firstName,
              lastName: member.lastName,
              email: member.email,
              role: member.role,
              _id: (member as any)._id,
              signInHistory: [...member.signInHistory, new Date()],
            }
          : member
      );
      console.log(members);

      await Project.updateOne({ projectId }, { members });

      res.status(200).json({ message: "Invitation accepted successfull" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
export default handler;
