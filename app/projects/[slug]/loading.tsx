import Skeleton from "@/components/common/Skeleton";

const Loading = () => (
  <main className="mx-auto max-w-5xl px-6 pt-24 pb-16 md:pt-32 md:pb-20">
    <div className="flex flex-col gap-5">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-12 w-3/4 md:h-16" />
      <Skeleton className="h-5 w-full max-w-2xl" />
      <div className="flex gap-4 pt-2">
        <Skeleton className="h-13 w-40" />
        <Skeleton className="h-13 w-40" />
      </div>
    </div>
    <Skeleton className="mt-9 aspect-video w-full rounded-2xl" />
  </main>
);

export default Loading;
