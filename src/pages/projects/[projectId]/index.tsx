import { MobileWrapper, Navbar, Sidebar } from "@/features/projects";
import { fetchProject } from "@/services/fetch-project";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

export default function Project() {
  const params = useParams();

  const { data: sessionData } = useSession();

  const [data, setData] = useState<ProjectType | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleFetch = useCallback(async () => {
    if (!sessionData || !params?.projectId) return;

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
        <Navbar canShowMenu isOpen={isOpen} setIsOpen={setIsOpen} />

        {isLoading ? (
          <section className="grid h-[calc(100vh-100px)] place-items-center">
            <MoonLoader color="#07D46F" className="ml-2 text-white" />
          </section>
        ) : data ? (
          <>
            <section className="flex h-[calc(100vh-60px)] ">
              <Sidebar members={data.members} projectId={data.projectId} />

              <div className="w-full"></div>
            </section>
            <MobileWrapper
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              members={data.members}
              projectId={data.projectId}
            />
          </>
        ) : (
          <section className="grid place-items-center h-[calc(100vh-100px)]">
            <div className="text-center">
              <Image src="/empty.svg" alt="" width={200} height={200} />
              <p className="">Project not found yet</p>
            </div>
          </section>
        )}
      </main>
    </Fragment>
  );
}
