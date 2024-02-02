import * as bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  // generating password hash salt
  const salt = await bcrypt.genSalt();

  // hashing user password
  const hash = await bcrypt.hash(password, salt);

  return hash;
}
