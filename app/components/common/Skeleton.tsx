const Skeleton = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden
    className={`animate-pulse rounded-md squircle bg-muted-foreground/15 ${className}`}
  />
);

export default Skeleton;
