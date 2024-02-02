import { Navbar } from "@/features/projects";
import { fetchProject } from "@/services/fetch-project";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useParams } from "next/navigation";
import React, { Fragment, useCallback, useEffect, useState } from "react";

export default function Project() {
  const params = useParams();

  const { data: sessionData } = useSession();

  const [data, setData] = useState<ProjectType | null>();
  const [isLoading, setIsLoading] = useState(true);

  const handleFetch = useCallback(async () => {
    if (!sessionData || !params.projectId) return;

    setIsLoading(true);

    await fetchProject({
      token: sessionData?.user.accessToken,
      projectId: params.projectId as string,
    })
      .then((results) => {
        setData(results);
      })
      .finally(() => setIsLoading(false));
  }, [sessionData, params?.projectId]);

  useEffect(() => {
    if (sessionData) {
      handleFetch();
    }
  }, [handleFetch, sessionData]);

  return (
    <Fragment>
      <Head>
        <title>Project {data && ` | ${data.name}`}</title>
      </Head>

      <main className="">
        <Navbar />

        {params?.projectId}
      </main>
    </Fragment>
  );
}
