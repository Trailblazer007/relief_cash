import { customAlphabet } from "../nanoid";
import * as bcrypt from "bcrypt";

export const filteredMemberInvite = async (
  prev: InvitationType[],
  next: { email: string; role: "employee" | "employer" }[],
  members: MemberType[],
) => {
  const arr: (InvitationType & { code: string })[] = [];

  for (const user of next) {
    // Check if the user is already in the 'prev' array
    const userExists = prev.some((prevUser) => prevUser.email === user.email);
    const memberExists = members.some(
      (prevUser) => prevUser.email === user.email
    );

    if (userExists) continue;
    if (memberExists) continue;

    // If the user does not exist in the 'prev' array, add it

    const nanoid = customAlphabet(
      "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      40
    );

    const code = nanoid();

    const salt = await bcrypt.genSalt();

    const token = await bcrypt.hash(code, salt);
    arr.push({
      email: user.email,
      role: user.role,
      token,
      code,
    });
  }

  return arr;
};
