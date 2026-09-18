import Skeleton from "@/components/common/Skeleton";
import ProjectCardSkeleton from "@/components/common/ProjectCardSkeleton";

const Loading = () => (
  <main className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14 pt-24 pb-16 md:pt-28 md:pb-20">
    <div className="flex flex-col gap-10 md:gap-12">
      <div className="flex flex-col gap-5">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-64" />
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </main>
);

export default Loading;
