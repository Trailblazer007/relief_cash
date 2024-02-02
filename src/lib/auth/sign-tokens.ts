import { sign } from "jsonwebtoken";

export function signTokens(sub: string, email: string) {
  const accessToken = signToken({
    sub,
    email,
    secret: process.env.JWT_ACCESS_SECRET!,
    expiresIn: process.env.ACCESS_EXPIRES_IN!,
  });
  const refreshToken = signToken({
    sub,
    email,
    secret: process.env.JWT_REFRESH_SECRET!,
    expiresIn: process.env.REFRESH_EXPIRES_IN!,
  });

  return { accessToken, refreshToken };
}

export function signToken(args: SignTokenType) {
  const { sub, email, secret, expiresIn } = args;
  const token = sign({ sub, email }, secret, { expiresIn });

  return token;
}

type SignTokenType = {
  sub: string;
  email: string;
  secret: string;
  expiresIn: string | number;
};
