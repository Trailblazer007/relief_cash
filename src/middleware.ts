import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import auth from "@/data/auth.json";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token || !token.accessToken) {
    // redirect if user is not authenticated and is in a protected route
    if (auth.protectedRoutes.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL(`/auth/signin`, request.url));
    }
  }

  if (token) {
    // redirect if user is authenticated
    if (auth.unauthenticatedRoutes.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL("/projects", request.url));
    }
  }
  // return NextResponse.redirect(new URL("/", request.url));
}
