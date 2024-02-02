import { IncomingHttpHeaders } from "http";

export const getToken = (
  headers: IncomingHttpHeaders,
  name: "x-refresh-token" | "x-access-token"
) => {
  const [type, token] = (headers[name] as string)?.split(" ") ?? [];

  return type === "Bearer" ? token : undefined;
};
