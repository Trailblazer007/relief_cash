import { getTokenPayload } from "@/lib/auth/get-token-payload";
import { connectMongoDB } from "@/lib/mongoConnect.ts";
import { customAlphabet, nanoid } from "@/lib/nanoid";
import { Project } from "@/models/projects.model";
import { User } from "@/models/user.model";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from "bcrypt";
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
    if (req.method === "POST") {
      await connectMongoDB();

      const { name, members } = req.body;

      const { sub } = getTokenPayload(req.headers, "x-access-token");

      const user = await User.findOne<UserType>({
        uid: sub,
      }).exec();

      if (!user) throw new Error("Invalid credentials");

      const projectId = name.toLowerCase() + "-" + nanoid(5).toLowerCase();

      const formattedMembers = await formatMembers(members);

      const userName = user.lastName + " " + user.firstName;

      for (let i = 0; i < formattedMembers.length; i++) {
        const formattedMember = formattedMembers[i];

        await transporter.sendMail({
          from: '"Relief" <nakelnoreply@gmail.com>',
          to: formattedMember.email,
          subject: `${userName} has invited you to ${name} on Relief`,
          html: projectMemberInvite({
            name: userName,
            projectName: name,
            link:
              process.env.BASE_URL +
              `/projects/${projectId}/invite/${formattedMember.code}`,
          }),
        });
      }

      await Project.create({
        name,
        projectId,
        tasks: [],
        members: [
          {
            uid: sub,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: "employer",
          },
        ],
        invitations: [
          ...formattedMembers.map((formattedMember) =>
            clean({ ...formattedMember, code: null })
          ),
        ],
      });

      res.status(200).json({ message: "Project created successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false });
  }
};
export default handler;

type Member = {
  email: string;
  role: string;
};
const formatMembers = async (members: Member[]) => {
  const results: {
    email: string;
    role: string;
    token: string;
    code: string;
  }[] = [];

  for (let i = 0; i < members.length; i++) {
    const member = members[i];
    const nanoid = customAlphabet(
      "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      40
    );

    const code = nanoid();

    const salt = await bcrypt.genSalt();

    const token = await bcrypt.hash(code, salt);

    results.push({
      email: member.email,
      role: member.role,
      token,
      code,
    });
  }

  return results;
};
