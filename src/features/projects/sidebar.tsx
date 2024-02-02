import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoRefresh, IoTrashOutline } from "react-icons/io5";
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
import { Button } from "@/components/ui/button";
import { MoonLoader } from "react-spinners";
import { useSession } from "next-auth/react";
import { useDeleteProject } from "@/hooks/useDeleteProject";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";

type Props = {
  members: MemberType[];
  projectId: string;
};
export const Sidebar = (props: Props) => {
  return (
    <div className="hidden lg:block">
      <SidebarContent {...props} />
    </div>
  );
};

const SidebarContent = (props: Props) => {
  const { members, projectId } = props;

  const { data: sessionData } = useSession();

  const { isLoading, onDelete } = useDeleteProject(projectId);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const canCreateTask = !!members.find(
    (member) =>
      member.email === sessionData?.user.email && member.role === "employer"
  );
  return (
    <div className="shrink-0 w-full lg:w-[280px] h-full border-r-[1.5px] border-slate-100 py-10 pl-10 pr-5 flex flex-col">
      <div className="flex items-center space-x-2">
        <button
          type="button"
          disabled={!canCreateTask}
          className="px-2 py-1 w-full text-start font-medium  bg-slate-100 h-[32px] border border-slate-200 rounded-md hover:scale-105 active:scale-95 transition-all duration-300 text-sm disabled:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {" "}
          Create Task
        </button>
        <button
          type="button"
          className="flex items-center justify-center w-[32px] shrink-0 bg-slate-100 border border-slate-200 rounded-md h-[32px] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <IoRefresh />
        </button>
      </div>

      <div className="my-10 space-y-3">
        <div className="">
          <p className="font-medium text-sm pl-1">Members</p>
        </div>
        {members.slice(0, 6).map((member, index) => (
          <div
            key={index}
            className="flex items-center gap-2 hover:bg-slate-100 transition-all duration-300 p-1 rounded-md border border-transparent hover:border-slate-200 cursor-pointer"
          >
            <Avatar
              fallback={member.lastName.charAt(0) + member.firstName.charAt(0)}
              className="h-[30px] w-[30px]"
            >
              <AvatarImage
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${member.firstName}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                alt=""
              />
            </Avatar>

            <p className="text-sm">
              {member.lastName + " " + member.firstName}
            </p>
          </div>
        ))}

        {members.length > 6 && (
          <div className="pl-2">
            <Link
              href={`/projects/${projectId}/members`}
              className="text-sm hover:underline"
            >
              See more
            </Link>
          </div>
        )}
      </div>

      <AlertDialog
        open={isDeleteOpen}
        onOpenChange={(value) => !isLoading && setIsDeleteOpen(value)}
      >
        <AlertDialogTrigger className="w-full mt-auto">
          <button
            type="button"
            className="px-2 py-1 w-full text-start font-medium text-red-500  bg-red-500/10 h-[32px] border  rounded-md hover:scale-105 active:scale-95 transition-all duration-300 text-sm flex items-center border-red-500/30 gap-2"
          >
            <IoTrashOutline size={20} />
            Delete project
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              project and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <Button onClick={onDelete}>
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
  );
};

type MobileWrapperProps = Props & {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export const MobileWrapper = (props: MobileWrapperProps) => {
  const { members, projectId, isOpen, setIsOpen } = props;
  const ref = useRef<HTMLDivElement>(null);

  const screen = useWindowSize();

  useOnClickOutside(ref, () => {
    if (screen && screen?.width < 1024 && isOpen) {
      setIsOpen(false);
    }
  });

  useEffect(() => {
    if (screen && screen?.width > 1024) {
      setIsOpen(false);
    }
  }, [screen, setIsOpen]);
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed top-0 left-0 z-50 w-full h-full bg-black/40 "
        >
          <motion.div
            ref={ref}
            className="w-[70%] h-screen overflow-y-scroll bg-[#F7F7F7] "
            initial={{ marginLeft: "-70%" }}
            animate={{ marginLeft: "0%" }}
            exit={{ marginLeft: "-70%" }}
          >
            <SidebarContent members={members} projectId={projectId} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
