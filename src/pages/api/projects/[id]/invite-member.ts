import { getTokenPayload } from "@/lib/auth/get-token-payload";
import { connectMongoDB } from "@/lib/mongoConnect.ts";
import { Project } from "@/models/projects.model";
import { User } from "@/models/user.model";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
import { filteredMemberInvite } from "@/lib/auth/filtered-member-invite";
import { transporter } from "@/lib/email-sender";
import { projectMemberInvite } from "@/emails-template/project-member-invite";
import clean from "@/lib/clean";

type DataType = { message: string } | { success: boolean };

const handler: NextApiHandler<DataType> = async (
  req: NextApiRequest,
  res: NextApiResponse<DataType>
) => {
  try {
    if (req.method === "POST") {
      await connectMongoDB();

      const projectId = req.query.id;

      const { members } = req.body;

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

      const isUserEmployer = project.members.find(
        (member) => member.email === user.email && member.role === "employer"
      );

      if (!isUserEmployer) throw new Error("Perssion denial");

      const formattedMembers = await filteredMemberInvite(
        project.invitations,
        members,
        project.members
      );

      if (formattedMembers.length === 0)
        return res.status(200).json({ message: "Invitation sent successfull" });

      const userName = user.lastName + " " + user.firstName;

      for (let i = 0; i < formattedMembers.length; i++) {
        const formattedMember = formattedMembers[i];

        await transporter.sendMail({
          from: '"Relief" <nakelnoreply@gmail.com>',
          to: formattedMember.email,
          subject: `${userName} has invited you to ${project.name} on Relief`,
          html: projectMemberInvite({
            name: userName,
            projectName: project.name,
            link:
              process.env.BASE_URL +
              `/projects/${projectId}/invite/${formattedMember.code}`,
          }),
        });
      }

      await Project.updateOne(
        { projectId },
        {
          invitations: [
            ...project.invitations,
            ...formattedMembers.map((filteredUser) =>
              clean({ ...filteredUser, code: null })
            ),
          ],
        }
      );

      res.status(200).json({ message: "Invitation sent successfull" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
export default handler;
