import type { TimetableGridEntry } from "../../utils/timetable";

interface TimetableGridProps {
  title: string;
  subtitle: string;
  entries: TimetableGridEntry[];
  days: string[];
  slots: string[];
}

const typeStyles: Record<TimetableGridEntry["type"], string> = {
  Theory: "bg-sky-500/15 border-sky-400/30 text-sky-100",
  Lab: "bg-emerald-500/15 border-emerald-400/30 text-emerald-100",
  Seminar: "bg-violet-500/15 border-violet-400/30 text-violet-100",
};

export const TimetableGrid = ({
  title,
  subtitle,
  entries,
  days,
  slots,
}: TimetableGridProps) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
            {subtitle}
          </p>
          <h2 className="text-3xl font-semibold text-white">{title}</h2>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[820px]">
          <div
            className="grid gap-px rounded-t-3xl bg-slate-800 text-slate-400"
            style={{
              gridTemplateColumns: `140px repeat(${days.length}, minmax(140px, 1fr))`,
            }}
          >
            <div className="bg-slate-950 p-3 text-sm font-semibold">Time</div>
            {days.map((day) => (
              <div
                key={day}
                className="bg-slate-950 p-3 text-sm font-semibold text-slate-300"
              >
                {day}
              </div>
            ))}
          </div>
          <div className="grid gap-px rounded-b-3xl bg-slate-800 text-slate-400">
            {slots.map((slot) => (
              <div
                key={slot}
                className="grid gap-px"
                style={{
                  gridTemplateColumns: `140px repeat(${days.length}, minmax(140px, 1fr))`,
                }}
              >
                <div className="bg-slate-950 p-3 text-sm text-slate-300">
                  {slot}
                </div>
                {days.map((day) => {
                  const cells = entries.filter(
                    (entry) => entry.day === day && entry.slot === slot,
                  );
                  return (
                    <div
                      key={`${day}-${slot}`}
                      className="min-h-28 bg-slate-950 p-3"
                    >
                      {cells.length ? (
                        <div className="space-y-2">
                          {cells.map((cell) => (
                            <div
                              key={cell.id}
                              className={`rounded-2xl border p-3 text-sm ${typeStyles[cell.type]}`}
                            >
                              <p className="font-semibold">{cell.label}</p>
                              {cell.meta && (
                                <p className="mt-1 text-xs text-slate-300">
                                  {cell.meta}
                                </p>
                              )}
                              <p className="mt-1 text-xs text-slate-300">
                                {cell.room}
                              </p>
                              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                                {cell.type}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-full rounded-2xl bg-slate-950/80" />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
