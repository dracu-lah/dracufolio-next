const TerminalRule = ({ path }: { path: string }) => (
  <div
    aria-hidden
    className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-4"
  >
    <span className="h-px flex-1 bg-border" />
    <span className="font-mono text-sm uppercase tracking-[0.3em] text-muted-foreground">
      {path}
    </span>
    <span className="h-px flex-1 bg-border" />
  </div>
);

export default TerminalRule;
