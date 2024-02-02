import { deleteProject } from "@/services/delete-project";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

export const useDeleteProject = (projectId: string) => {
  const { data: sessionData } = useSession();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const onDelete = async () => {
    if (!sessionData) return;
    setIsLoading(true);
    await deleteProject({ projectId, token: sessionData.user.accessToken })
      .then((results) => {
        toast.success(results.message);

        if (router.pathname === "/projects") {
          router.reload();
        } else {
          router.push("/projects");
        }
      })
      .catch((err) => {
        toast.error(err.message ?? "Uh oh! Something went wrong.");
      })
      .finally(() => setIsLoading(false));
  };

  return { isLoading, onDelete };
};
