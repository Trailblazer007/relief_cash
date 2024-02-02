import { fetchProject } from "@/services/fetch-project";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export const useFetchProject = (projectId: string) => {
  const { data: sessionData } = useSession();

  const [data, setData] = useState<ProjectType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleFetch = useCallback(async () => {

    setIsLoading(true);

    await fetchProject({
      token: sessionData?.user.accessToken!,
      projectId: projectId as string,
    })
      .then((results) => {
        console.log(results);
        setData(results);
      })
      .finally(() => setIsLoading(false));
  }, [sessionData, projectId]);

  useEffect(() => {
    if (sessionData && projectId) {
      handleFetch();
    }
  }, [handleFetch, sessionData, projectId]);

  return { project: data, isLoading };
};
