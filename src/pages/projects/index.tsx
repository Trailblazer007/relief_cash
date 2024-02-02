import React, { Fragment, useCallback, useEffect, useState } from "react";
import { CreateProjectModel, Navbar, ProjectCard } from "@/features/projects";
import { Button } from "@/components/ui/button";
import { IoAdd } from "react-icons/io5";
import Head from "next/head";
import { useSession } from "next-auth/react";
import LoadingScreen from "@/features/projects/loading-screen";
import Image from "next/image";
import { fetchProjects } from "@/services/fetch-projects";

const Projects = () => {
  const { data: sessionData } = useSession();

  const [data, setData] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleFetch = useCallback(async () => {
    if (!sessionData) return;

    setIsLoading(true);

    await fetchProjects({ token: sessionData?.user.accessToken })
      .then((results) => {
        setData(results);
      })
      .finally(() => setIsLoading(false));
  }, [sessionData]);

  useEffect(() => {
    if (sessionData) {
      handleFetch();
    }
  }, [handleFetch, sessionData]);

  return (
    <Fragment>
      <Head>
        <title>Projects</title>
      </Head>
      <main>
        <Navbar />

        <section className="p-5 lg:p-10">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Projects</h1>

            <Button onClick={() => setIsOpen(true)}>
              <IoAdd className="mr-2 shrink-0" size={25} />
              Create
            </Button>
          </div>

          {isLoading ? (
            <LoadingScreen />
          ) : data && data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {data.map((item, index) => (
                <ProjectCard key={index} {...item} />
              ))}
            </div>
          ) : (
            <div className="grid place-items-center mt-20">
              <div className="text-center">
                <Image src="/empty.svg" alt="" width={200} height={200} />
                <p className="">No projects yet</p>
              </div>
            </div>
          )}
        </section>
      </main>

      <CreateProjectModel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Fragment>
  );
};

export default Projects;
