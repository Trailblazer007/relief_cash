import { getTokenPayload } from "@/lib/auth/get-token-payload";
import { connectMongoDB } from "@/lib/mongoConnect.ts";
import { Project } from "@/models/projects.model";
import { User } from "@/models/user.model";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type DataType = ProjectType | null | { success: boolean };

const handler: NextApiHandler<DataType> = async (
  req: NextApiRequest,
  res: NextApiResponse<DataType>
) => {
  try {
    if (req.method === "GET") {
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

      res.status(200).json(project);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
export default handler;
