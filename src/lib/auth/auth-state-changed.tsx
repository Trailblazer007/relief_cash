import { useSession } from "next-auth/react";
import { Fragment, PropsWithChildren, useCallback, useEffect } from "react";
import auth from "@/data/auth.json";
import { useRouter } from "next/router";

export const AuthStateChanged = ({ children }: PropsWithChildren) => {
  const { status } = useSession();
  const router = useRouter();
  const pathname = router.pathname;

  const handleChange = useCallback(() => {
    if (status === "loading") return;

    const isProtectedRoute = auth.protectedRoutes.some((path) =>
      pathname.startsWith(path)
    );
    const isUnauthenticatedRoutes = auth.unauthenticatedRoutes.some((path) =>
      pathname.startsWith(path)
    );

    if (status === "unauthenticated" && isProtectedRoute) {
      router.replace(`/auth/signin`);
    }

    if (status === "authenticated" && isUnauthenticatedRoutes) {
      router.replace("/dashboard");
    }
  }, [pathname, router, status]);

  useEffect(() => {
    handleChange();
  }, [handleChange]);
  return <Fragment>{children}</Fragment>;
};
