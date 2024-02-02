import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import {
  IoLogOutOutline,
  IoMail,
  IoMailOutline,
  IoNotifications,
  IoNotificationsOutline,
  IoSearch,
} from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Hamburger } from "@/components/hamburger";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  canShowMenu?: boolean;
  isOpen?: boolean;
  setIsOpen?: (value: boolean) => void;
};
export const Navbar = (props: Props) => {
  const { canShowMenu = false, setIsOpen, isOpen } = props;
  const { data } = useSession();
  const [input, setInput] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <nav className="flex items-center justify-between h-[60px] px-5 lg:px-10 border-b-[1.5px] border-slate-100">
      {/* logo */}

      <div className="flex items-center justify-center gap-2">
        {canShowMenu && (
          <Hamburger
            className="lg:hidden text-black"
            onToggle={setIsOpen}
            toggled={isOpen}
            size={20}
          />
        )}
        <Link href="/projects">
          <div className="flex items-center cursor-pointer">
            <Image
              src="/logo.png"
              width={32}
              height={32}
              alt="Dashify logo"
              className="h-8 w-auto"
            />
            <p className="text-black dark:text-white text-xl ml-2 font-bold">
              Relief
            </p>
          </div>
        </Link>
      </div>

      {/* searchbar */}

      <form
        onSubmit={handleSubmit}
        className="rounded-full bg-slate-100 border-[1.5px] border-slate-200 p-2 py-1.5 hidden lg:flex gap-2 items-center flex-[0.4]"
      >
        <IoSearch className="text-gray-500 h-5 w-5 shrink-0" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent outline-none bordero-0 w-full"
          placeholder="Search for projects"
        />

        <button type="submit" className="hidden"></button>
      </form>

      {/* user */}

      <div className="flex items-center gap-5">
        <button
          type="button"
          className="h-[35px] w-[35px] hidden lg:flex items-center justify-center"
        >
          <IoMailOutline size={25} />
        </button>
        <button
          type="button"
          className="h-[35px] w-[35px] hidden lg:flex items-center justify-center"
        >
          <IoNotificationsOutline size={25} />
        </button>

        <Popover>
          <PopoverTrigger>
            <Avatar>
              <AvatarImage
                src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${data?.user.firstName}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PopoverTrigger>

          <PopoverContent>
            <button
              type="button"
              onClick={() => signOut({ redirect: true })}
              className="px-2 py-4 w-full text-start font-medium text-red-500  bg-red-500/10 h-[35px] border  rounded-md hover:scale-105 active:scale-95 transition-all duration-300 text-sm flex items-center border-red-500/30 gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <IoLogOutOutline size={20} />
              Sign out
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};
