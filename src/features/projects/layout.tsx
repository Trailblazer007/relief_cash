import { PropsWithChildren, useState } from "react";
import { MobileWrapper, Navbar, Sidebar } from ".";
import { MoonLoader } from "react-spinners";
import Image from "next/image";

type Props = {
  isLoading: boolean;
  members: MemberType[];
  projectId: string;

  isData: boolean;
};
export const ProjectLayout = (props: PropsWithChildren<Props>) => {
  const { isLoading, isData, members, projectId, children } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="">
      <Navbar canShowMenu isOpen={isOpen} setIsOpen={setIsOpen} />

      {isLoading ? (
        <section className="grid h-[calc(100vh-100px)] place-items-center">
          <MoonLoader color="#07D46F" className="ml-2 text-white" />
        </section>
      ) : isData ? (
        <>
          <section className="flex h-[calc(100vh-60px)] ">
            <Sidebar members={members} projectId={projectId} />

            <div className="w-full p-5 lg:p-10">{children}</div>
          </section>
          <MobileWrapper
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            members={members}
            projectId={projectId}
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
  );
};
