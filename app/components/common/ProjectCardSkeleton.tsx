import Skeleton from "./Skeleton";

const ProjectCardSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-xl squircle border border-border bg-card">
    <Skeleton className="aspect-video w-full rounded-none" />
    <div className="flex flex-col gap-3 border-t border-border p-6">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
    <div className="flex flex-wrap gap-2 px-6 pb-6">
      {["w-16", "w-20", "w-14"].map((w) => (
        <Skeleton key={w} className={`h-7 ${w}`} />
      ))}
    </div>
  </div>
);

export default ProjectCardSkeleton;
