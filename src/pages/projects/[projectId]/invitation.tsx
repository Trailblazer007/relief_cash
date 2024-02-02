import { ProjectLayout } from "@/features/projects/layout";
import { useFetchProject } from "@/hooks/useFetchProject";
import { useSignIn } from "@/hooks/useSignIn";
import Head from "next/head";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IoTrashOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { MoonLoader } from "react-spinners";
import { useDeleteInvite } from "@/hooks/useDeleteInvite";
import Image from "next/image";

export default function Invitation() {
  const params = useParams<{ projectId: string }>();
  const router = useRouter();

  const { isLoading, project } = useFetchProject(params?.projectId);

  const [isOpen, setIsOpen] = useState(false);

  useSignIn(params?.projectId);

  const { isLoading: isDeleteLoading, onDelete } = useDeleteInvite(
    params?.projectId
  );

  return (
    <Fragment>
      <Head>
        <title>Project | Invitation {project && ` | ${project.name}`}</title>
      </Head>

      <ProjectLayout
        isData={!!project}
        isLoading={isLoading}
        members={project?.members ?? []}
        projectId={params?.projectId}
      >
        <h1 className="text-3xl font-bold ">Invitations</h1>

        {project?.invitations && project.invitations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {project?.invitations.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2 border-[1.5px] border-slate-100 p-2 rounded-md hover:bg-slate-100 hover:border-slate-200 transition-all duration-300 cursor-pointer"
              >
                <div className="">
                  <p className="text-sm">{member.email}</p>
                  <p className="text-xs text-gray-600">{member.role}</p>
                </div>

                <AlertDialog
                  open={isOpen}
                  onOpenChange={(value) => !isLoading && setIsOpen(value)}
                >
                  <AlertDialogTrigger>
                    <button
                      type="button"
                      className="h-[35px] w-[35px] bg-red-500/10 rounded-full flex items-center justify-center"
                    >
                      <IoTrashOutline className="text-red-500" size={20} />
                    </button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the invitation and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isDeleteLoading}>
                        Cancel
                      </AlertDialogCancel>
                      <Button onClick={() => onDelete(member.email)}>
                        Delete{" "}
                        <MoonLoader
                          size={20}
                          color="white"
                          className="ml-2 text-white"
                          loading={isLoading}
                        />
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
          </div>
        ) : (
          <section className="grid place-items-center h-[calc(100vh-100px)] w-full">
            <div className="text-center">
              <Image src="/empty.svg" alt="" width={200} height={200} />
              <p className="">No invitation yet</p>
            </div>
          </section>
        )}
      </ProjectLayout>
    </Fragment>
  );
}
