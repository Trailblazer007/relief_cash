import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { IoCalendar, IoTrashOutline } from "react-icons/io5";
import TimeAgo from "react-timeago";
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
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MoonLoader } from "react-spinners";
import { useDeleteProject } from "@/hooks/useDeleteProject";

type Props = ProjectType;

export const ProjectCard = (props: Props) => {
  const { name, createdAt, members, projectId } = props;

  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const { isLoading, onDelete } = useDeleteProject(projectId);
  return (
    <div className="h-[180px] border-[1.5px] border-slate-200/80 rounded-md py-3 px-4 flex flex-col">
      <div className="flex items-center justify-between">
        <h1
          onClick={() => router.push(`/projects/${projectId}`)}
          className="font-medium text-lg hover:underline cursor-pointer"
        >
          {name}
        </h1>

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
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="h-[35px] w-[35px] bg-green-500/10 rounded-full flex items-center justify-center"
          >
            <IoCalendar className="text-green-500" />
          </button>

          <p className="text-sm">
            <TimeAgo date={new Date(createdAt)} />
          </p>
        </div>

        <div className="flex items-center -space-x-5">
          {members.map((member, index) => (
            <Avatar
              key={index}
              fallback={member.lastName.charAt(0) + member.firstName.charAt(0)}
              className="h-[40px] w-[40px] border-2 border-slate-200 dark:border-neutral-800"
            >
              <AvatarImage
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${member.firstName}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                alt=""
              />
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  );
};
