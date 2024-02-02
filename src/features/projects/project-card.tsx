import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  IoCalendar,
  IoEllipsisVertical,
  IoTrash,
  IoTrashOutline,
} from "react-icons/io5";
import TimeAgo from "react-timeago";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  name: string;
  users: { firstName: string; lastName: string }[];
  createdAt: Date;
};
export const ProjectCard = (props: Props) => {
  const { name, createdAt, users } = props;
  return (
    <div className="h-[200px] border-[1.5px] border-slate-200/80 rounded-md py-3 px-4 flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">{name}</h1>

        <AlertDialog>
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
              <AlertDialogTitle >Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                project and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Continue</AlertDialogAction>
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
            <TimeAgo date="Feb 1, 2023" />
          </p>
        </div>

        <div className="flex items-center -space-x-5">
          {users.map((user, index) => (
            <Avatar
              key={index}
              fallback={user.lastName.charAt(0) + user.firstName.charAt(0)}
              className="h-[40px] w-[40px] border-2 border-slate-200 dark:border-neutral-800"
            >
              <AvatarImage
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.firstName}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                alt="@shadcn"
              />
            </Avatar>
          ))}
        </div>
      </div>
    </div>
  );
};
