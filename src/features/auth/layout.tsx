import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

type Props = {};
export const AuthLayout = (props: PropsWithChildren<Props>) => {
  const router = useRouter();
  return (
    <main className="flex h-screen">
      <div className="w-full lg:w-[50%] 2xl:mx-auto h-full bg-white pt-10 flex flex-col items-center">
        {/* logo */}
        <div className="flex items-center cursor-pointer p-5">
          <Image
            src="/logo.png"
            width={32}
            height={32}
            alt="Dashify logo"
            className="h-9 w-auto"
          />
          <p className="text-black dark:text-white text-xl ml-2 font-bold">
            Relief
          </p>
        </div>

        {/* tabbar */}

        <div className="flex space-x-10 mt-2">
          {tabs.map(({ href, name }, index) => (
            <div key={index} className="flex flex-col items-center">
              <p
                className={cn(
                  "text-lg font-semibold",
                  router.pathname.startsWith(href)
                    ? "text-black"
                    : "text-neutral-400"
                )}
              >
                {name}
              </p>

              <div
                className={cn(
                  "h-[2.5px] w-[30px] rounded-full  mt-1",
                  router.pathname.startsWith(href)
                    ? "bg-primary"
                    : "bg-tranparent"
                )}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-[50%] hidden lg:grid 2xl:hidden place-items-center h-full relative">
        <Image
          src="/images/top-view-ring-binder.webp"
          alt=""
          className="h-full w-full object-cover relative"
          width={1000}
          height={500}
        />

        <div className="absolute top-0 left-0 w-full h-full grid place-items-center">
          <div className="bg-primary rounded-2xl bg-clip-padding backdrop-filter backdrop-blur-[1px] bg-opacity-10 border border-slate-100/50 w-[90%] h-[90%]"></div>
        </div>
      </div>
    </main>
  );
};

const tabs = [
  {
    name: "Log In",
    href: "/auth/signin",
  },
  {
    name: "Register",
    href: "/auth/register",
  },
];
