import { ProjectLayout } from "@/features/projects/layout";
import { useFetchProject } from "@/hooks/useFetchProject";
import { useSignIn } from "@/hooks/useSignIn";
import Head from "next/head";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { Fragment } from "react";
import { useLocalStorage } from "usehooks-ts";
import Countdown from "react-countdown";
import { Button } from "@/components/ui/button";
import { IoTrashOutline } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ReactTimeago from "react-timeago";
import { format } from "date-fns";

export default function Project() {
  const params = useParams<{ projectId: string }>();

  const [items, setItems] = useLocalStorage<
    {
      id: string;
      name: string;
      content: string;
      users: string[];
      dueDate: Date;
    }[]
  >(`tasks-${params?.projectId}`, []);

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
        {items?.length > 0 ? (
          <div className="mt-10 space-y-6">
            {items.map((item, index) => (
              <div
                key={index}
                className="border-[1.5px] border-slate-200 rounded-md min-h-[100px] p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium">{item.name}</p>

                  <div className="flex items-center gap-2">
                    <p className="">{format(item.dueDate, "PPPP")}</p>
                    <div className="bg-green-500/10 rounded-full font-bold text-green-500 p-2">
                      <Countdown date={new Date(item.dueDate)} />
                    </div>
                  </div>
                </div>

                <p className="py-3">{item.content}</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center -space-x-5">
                    {item.users.map((user, index) => (
                      <Avatar
                        key={index}
                        className="h-[40px] w-[40px] border-2 border-slate-200 dark:border-neutral-800"
                      >
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                          alt=""
                        />
                      </Avatar>
                    ))}
                  </div>
                  <Button
                    onClick={() =>
                      setItems(items.filter((itm) => itm.id !== item.id))
                    }
                    className="gap-2 bg-red-500 hover:bg-red-500/90"
                  >
                    <IoTrashOutline />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <section className="grid place-items-center h-[calc(100vh-100px)] w-full">
            <div className="text-center">
              <Image src="/empty.svg" alt="" width={200} height={200} />
              <p className="">No tasks yet</p>
            </div>
          </section>
        )}
      </ProjectLayout>
    </Fragment>
  );
}
