import * as bcrypt from "bcrypt";

export async function comparePassword(
  password: string,
  encryptedPassword: string
) {
  // if user exists then compare if stored password matches with input password
  const isPassword = await bcrypt.compare(password, encryptedPassword);

  // if passwords does not match throw an error
  if (!isPassword) throw new Error("Invalid credentials");

  return true;
}
