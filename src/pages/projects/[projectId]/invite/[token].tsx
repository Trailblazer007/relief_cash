import { Button } from "@/components/ui/button";
import { Navbar } from "@/features/projects";
import { acceptMemberInvite } from "@/services/accept-member-invite";
import { fetchProjectByInvitation } from "@/services/fetch-project-by-invitation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { toast } from "sonner";

type Params = {
  projectId: string;
  token: string;
};

export default function Verify() {
  const params = useParams<Params>();
  const router = useRouter();
  const { data: sessionData } = useSession();

  const [isAcceptLoading, setIsAcceptLoading] = useState(false);
  const [data, setData] = useState<ProjectType | null>();
  const [isLoading, setIsLoading] = useState(true);

  const handleAccept = async () => {
    if (!sessionData) return;
    setIsAcceptLoading(true);

    await acceptMemberInvite({
      token: sessionData?.user.accessToken,
      projectId: params.projectId,
      code: params.token,
    })
      .then(async (result) => {
        toast.success("Invitation accepted successfully");

        router.replace(`/projects/${params.projectId}`);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setIsAcceptLoading(false));
  };

  const handleFetch = useCallback(async () => {
    if (!sessionData || !params?.projectId) return;

    setIsLoading(true);

    await fetchProjectByInvitation({
      token: sessionData?.user.accessToken,
      projectId: params.projectId as string,
    })
      .then((results) => {
        setData(results);
      })
      .finally(() => setIsLoading(false));
  }, [sessionData, params?.projectId]);

  useEffect(() => {
    if (sessionData) {
      handleFetch();
    }
  }, [handleFetch, sessionData]);

  return (
    <main>
      <Navbar />

      {isLoading ? (
        <div className="grid h-[calc(100vh-100px)] place-items-center">
          <MoonLoader color="#07D46F" className="ml-2 text-white" />
        </div>
      ) : data ? (
        <div className="flex justify-center">
          <div className="border-[1.5px] border-slate-200 dark:border-neutral-800 rounded-lg my-20 w-[90%] lg:w-[500px] p-10 flex flex-col">
            <p className="text-3xl text-black dark:text-white font-medium text-center">
              Accept invitation?
            </p>

            <p className="text-gray-dark dark:text-gray-light text-center pt-5">
              You are invited to join the project <strong>{data.name}</strong>
            </p>

            <Button
              className="rounded-md mt-10"
              size="lg"
              onClick={handleAccept}
              disabled={isAcceptLoading}
              type="button"
            >
              Accept invitation
              <MoonLoader
                size={20}
                color="white"
                className="ml-2 text-white"
                loading={isAcceptLoading}
              />
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center h-[calc(100vh-100px)]">
          <div className="text-center">
            <Image src="/empty.svg" alt="" width={200} height={200} />
            <p className="">Project not found yet</p>
          </div>
        </div>
      )}
    </main>
  );
}
