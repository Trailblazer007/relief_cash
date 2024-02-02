import { ProjectLayout } from "@/features/projects/layout";
import { useFetchProject } from "@/hooks/useFetchProject";
import { useSignIn } from "@/hooks/useSignIn";
import Head from "next/head";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { Fragment } from "react";

export default function Project() {
  const params = useParams<{ projectId: string }>();

  const { isLoading, project } = useFetchProject(params?.projectId);

  useSignIn(params?.projectId);

  return (
    <Fragment>
      <Head>
        <title>Project {project && ` | ${project.name}`}</title>
      </Head>

      <ProjectLayout
        isData={!!project}
        isLoading={isLoading}
        members={project?.members ?? []}
        projectId={params?.projectId}
      >
        <section className="grid place-items-center h-[calc(100vh-100px)] w-full">
          <div className="text-center">
            <Image src="/empty.svg" alt="" width={200} height={200} />
            <p className="">No tasks yet</p>
          </div>
        </section>
      </ProjectLayout>
    </Fragment>
  );
}
