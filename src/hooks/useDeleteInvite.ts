import { deleteInvite } from "@/services/delete-invite";
import { deleteProject } from "@/services/delete-project";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "sonner";

export const useDeleteInvite = (projectId: string) => {
  const { data: sessionData } = useSession();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const onDelete = async (email: string) => {
    if (!sessionData) return;
    setIsLoading(true);
    await deleteInvite({
      projectId,
      token: sessionData.user.accessToken,
      email,
    })
      .then((results) => {
        if (results.success) {
          toast.success(results.message);
        } else {
          toast.error(results.message ?? "Uh oh! Something went wrong.");
        }

        router.reload();
      })
      .catch((err) => {
        toast.error(err.message ?? "Uh oh! Something went wrong.");
      })
      .finally(() => setIsLoading(false));
  };

  return { isLoading, onDelete };
};
