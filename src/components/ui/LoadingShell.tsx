export const LoadingShell = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-32 rounded-2xl bg-slate-800" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-32 rounded-3xl bg-slate-800" />
        <div className="h-32 rounded-3xl bg-slate-800" />
      </div>
      <div className="h-72 rounded-3xl bg-slate-800" />
    </div>
  );
};
