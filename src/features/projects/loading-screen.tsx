import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingScreen() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
      {[0, 1, 2, 3, 4].map((_, i) => (
        <div
          key={i}
          className="cursor-pointer border-[1.5px] rounded-lg h-[180px] bg-white dark:bg-dark border-slate-200 dark:border-neutral-800 py-3 px-3 flex flex-col hover:scale-[1.02] active:scale-[0.99] transition-transform duration-300"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-[200px]" />

            <Skeleton className="h-10 w-10 rounded-full" />
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex space-x-2 items-center">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-[100px]" />
            </div>

            <div className="flex items-center -space-x-5">
              {[0, 1, 2].map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white dark:border-dark"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
