import { IncomingHttpHeaders } from "http";
import { verify } from "jsonwebtoken";

export const getTokenPayload = (
  headers: IncomingHttpHeaders,
  name: "x-refresh-token" | "x-access-token"
) => {
  const [type, token] = (headers[name] as string)?.split(" ") ?? [];

  const newToken = type === "Bearer" ? token : undefined;

  if (!newToken) throw new Error("Please login");

  const payload = verify(token, process.env.JWT_ACCESS_SECRET!);

  return payload as { sub: string; email: string };
};
