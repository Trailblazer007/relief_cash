import { Button } from "@/components/ui/button";
import { CreatePayrollModel } from "@/features/projects/create-payroll-model";
import { ProjectLayout } from "@/features/projects/layout";
import { useFetchProject } from "@/hooks/useFetchProject";
import Head from "next/head";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import { IoAdd, IoTrashOutline } from "react-icons/io5";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLocalStorage } from "usehooks-ts";

export default function Payrolls() {
  const params = useParams<{ projectId: string }>();

  const [items, setItems] = useLocalStorage<
    {
      email: string;
      salary: string;
    }[]
  >(`payroll-${params?.projectId}`, []);
  // const [items, setItems] = useState<
  //   {
  //     email: string;
  //     salary: string;
  //   }[]
  // >([]);

  const [isOpen, setIsOpen] = useState(false);

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
        <div className="flex items-center justify-between ">
          <h1 className="text-3xl font-bold">Payrolls</h1>

          <Button onClick={() => setIsOpen(true)}>
            <IoAdd className="mr-2 shrink-0" size={25} />
            Create payroll
          </Button>
        </div>

        {items?.length > 0 ? (
          <Table className="mt-10">
            <TableHeader>
              <TableRow>
                <TableHead className="">Email</TableHead>
                <TableHead>Salary</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="">{item.email}</TableCell>
                  <TableCell className="">{item.salary}</TableCell>
                  <TableCell className="">
                    <button
                      type="button"
                      onClick={() =>
                        setItems([
                          ...items.filter((ite) => ite.email !== item.email),
                        ])
                      }
                      className="h-[35px] w-[35px] bg-red-500/10 rounded-full flex items-center justify-center"
                    >
                      <IoTrashOutline className="text-red-500" size={20} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <section className="grid place-items-center h-[calc(100vh-100px)] w-full">
            <div className="text-center">
              <Image src="/empty.svg" alt="" width={200} height={200} />
              <p className="">No payroll yet</p>
            </div>
          </section>
        )}
      </ProjectLayout>

      <CreatePayrollModel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        members={project?.members ?? []}
        onSave={(value) => setItems([...items, ...value])}
      />
    </Fragment>
  );
}
