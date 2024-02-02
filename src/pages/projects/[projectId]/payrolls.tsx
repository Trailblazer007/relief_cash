import { Button } from "@/components/ui/button";
import { CreatePayrollModel } from "@/features/projects/create-payroll-model";
import { ProjectLayout } from "@/features/projects/layout";
import { useFetchProject } from "@/hooks/useFetchProject";
import Head from "next/head";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import { IoAdd } from "react-icons/io5";

export default function Payrolls() {
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams<{ projectId: string }>();

  const { isLoading, project } = useFetchProject(params?.projectId);

  return (
    <Fragment>
      <Head>
        <title>Project | Payroll {project && ` | ${project.name}`}</title>
      </Head>

      <ProjectLayout
        isData={!!project}
        isLoading={isLoading}
        members={project?.members ?? []}
        projectId={params?.projectId}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Payrolls</h1>

          <Button onClick={() => setIsOpen(true)}>
            <IoAdd className="mr-2 shrink-0" size={25} />
            Create payroll
          </Button>
        </div>

        <section className="grid place-items-center h-[calc(100vh-100px)] w-full">
          <div className="text-center">
            <Image src="/empty.svg" alt="" width={200} height={200} />
            <p className="">No payroll yet</p>
          </div>
        </section>
      </ProjectLayout>

      <CreatePayrollModel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        members={project?.members ?? []}
      />
    </Fragment>
  );
}
