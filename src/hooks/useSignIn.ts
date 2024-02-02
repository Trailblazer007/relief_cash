import { updateSignIn } from "@/services/update-signin";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

export const useSignIn = (projectId: string) => {
  const { data } = useSession();

  const handleSignIn = useCallback(async () => {
    updateSignIn({ token: data?.user.accessToken!, projectId });
  }, [projectId, data?.user.accessToken]);
  useEffect(() => {
    if (data && projectId) {
      handleSignIn();
    }
  }, [data, projectId, handleSignIn]);
};
