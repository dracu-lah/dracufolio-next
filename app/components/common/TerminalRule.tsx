const TerminalRule = ({ path }: { path: string }) => (
  <div aria-hidden className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14">
    <span className="block h-px w-full bg-border" data-section={path} />
  </div>
);

export default TerminalRule;
