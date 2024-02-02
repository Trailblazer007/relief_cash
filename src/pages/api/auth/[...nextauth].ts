import { nextAuthOptions } from "@/lib/auth/next-auth-options";
import nextAuth from "next-auth";

const handler = nextAuth(nextAuthOptions);

export default handler;
