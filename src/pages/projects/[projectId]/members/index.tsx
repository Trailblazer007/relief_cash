import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ProjectLayout } from "@/features/projects/layout";
import { useFetchProject } from "@/hooks/useFetchProject";
import { useSignIn } from "@/hooks/useSignIn";
import Head from "next/head";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

export default function Members() {
  const params = useParams<{ projectId: string }>();
  const router = useRouter();

  const { isLoading, project } = useFetchProject(params?.projectId);

  useSignIn(params?.projectId);
  return (
    <Fragment>
      <Head>
        <title>Project | Members {project && ` | ${project.name}`}</title>
      </Head>
      <ProjectLayout
        isData={!!project}
        isLoading={isLoading}
        members={project?.members ?? []}
        projectId={params?.projectId}
      >
        <h1 className="text-3xl font-bold ">Members</h1>

        {project && (
          <>
            {project.members.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                {project?.members &&
                  project?.members.map((member, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        router.push(
                          `/projects/${params?.projectId}/members/${member.uid}`
                        )
                      }
                      className="flex items-center gap-2 border-[1.5px] border-slate-100 p-2 rounded-md hover:bg-slate-100 hover:border-slate-200 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
                    >
                      <Avatar
                        fallback={
                          member.lastName.charAt(0) + member.firstName.charAt(0)
                        }
                        className="h-[40px] w-[40px] "
                      >
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${member.firstName}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                          alt=""
                        />
                      </Avatar>

                      <div className="">
                        <p className="text-sm">
                          {member.lastName + " " + member.firstName}
                        </p>
                        <p className="text-xs text-gray-600">{member.role}</p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <section className="grid place-items-center h-[calc(100vh-100px)]">
                <div className="text-center">
                  <Image src="/empty.svg" alt="" width={200} height={200} />
                  <p className="">No members yet</p>
                </div>
              </section>
            )}
          </>
        )}
      </ProjectLayout>
    </Fragment>
  );
}
