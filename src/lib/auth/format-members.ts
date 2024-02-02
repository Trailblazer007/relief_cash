import { customAlphabet } from "../nanoid";
import * as bcrypt from "bcrypt";

type Member = {
  email: string;
  role: string;
};
export const formatMembers = async (members: Member[]) => {
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
