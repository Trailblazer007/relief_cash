import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectLayout } from "@/features/projects/layout";
import { useFetchProject } from "@/hooks/useFetchProject";
import { useSignIn } from "@/hooks/useSignIn";
import { format } from "date-fns";
import Head from "next/head";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { Fragment } from "react";

export default function Member() {
  const params = useParams<{ projectId: string; uid: string }>();

  const { isLoading, project } = useFetchProject(params?.projectId);

  const member = project?.members.find((member) => member.uid === params?.uid);
  useSignIn(params?.projectId);
  return (
    <Fragment>
      <Head>
        <title>Project | Member {project && ` | ${project.name}`}</title>
      </Head>

      <ProjectLayout
        isData={!!project}
        isLoading={isLoading}
        members={project?.members ?? []}
        projectId={params?.projectId}
      >
        {member ? (
          <Fragment>
            <h1 className="text-3xl font-bold ">
              {member.lastName + " " + member.firstName}
            </h1>
            <div className="flex items-center gap-2 p-2 pl-0 mt-5 rounded-md">
              <Avatar
                fallback={
                  member.lastName.charAt(0) + member.firstName.charAt(0)
                }
                className="h-[80px] w-[80px] "
              >
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${member.firstName}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                  alt=""
                />
              </Avatar>

              <div className="">
                <p className="text-xl">{member.email}</p>
                <p className="text-base text-gray-600">{member.role}</p>
              </div>
            </div>

            <h1 className="text-3xl font-bold my-5 mt-10">Sign in history</h1>

            {member.signInHistory.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className=""></TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {member.signInHistory.map((history, index) => (
                    <TableRow key={index}>
                      <TableCell className="">
                        {format(history, "iiii")}
                      </TableCell>
                      <TableCell className="">
                        {format(history, "PPP")}
                      </TableCell>
                      <TableCell className="">
                        {format(history, "pp")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="grid place-items-center mt-5">
                <div className="text-center">
                  <Image src="/empty.svg" alt="" width={200} height={200} />
                  <p className="">Member has not signed in yet</p>
                </div>
              </div>
            )}
          </Fragment>
        ) : (
          <section className="grid place-items-center h-[calc(100vh-100px)]">
            <div className="text-center">
              <Image src="/empty.svg" alt="" width={200} height={200} />
              <p className="">Member to found</p>
            </div>
          </section>
        )}
      </ProjectLayout>
    </Fragment>
  );
}
