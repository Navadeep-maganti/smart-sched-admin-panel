import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { LoadingShell } from "../../components/ui/LoadingShell";
import { TimetableGrid } from "../../components/ui/TimetableGrid";
import {
  useDays,
  useTimetableEntries,
  useTimetables,
  useTimeslots,
} from "../../hooks/useResources";
import {
  buildDayLabels,
  buildSlotLabels,
  getTimetableTitle,
  normalizeEntriesForGrid,
  type RawDay,
  type RawTimetable,
  type RawTimetableEntry,
  type RawTimeslot,
} from "../../utils/timetable";

export const TimetableDetailPage = () => {
  const { timetableId } = useParams();
  const timetablesQuery = useTimetables();
  const entriesQuery = useTimetableEntries();
  const daysQuery = useDays();
  const timeslotsQuery = useTimeslots();

  if (
    timetablesQuery.isLoading ||
    entriesQuery.isLoading ||
    daysQuery.isLoading ||
    timeslotsQuery.isLoading
  ) {
    return <LoadingShell />;
  }

  const id = Number(timetableId);
  const timetables = (timetablesQuery.data ?? []) as RawTimetable[];
  const timetable = timetables.find((item) => item.timetable_id === id);
  const entries = ((entriesQuery.data ?? []) as RawTimetableEntry[]).filter(
    (entry) => entry.timetable === id,
  );
  const days = buildDayLabels(daysQuery.data as RawDay[] | undefined, entries);
  const slots = buildSlotLabels(
    timeslotsQuery.data as RawTimeslot[] | undefined,
    entries,
  );
  const gridEntries = normalizeEntriesForGrid(entries, slots);

  if (!timetable) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-slate-400">
        Timetable not found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Link
        to="/timetables/list"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
      >
        <ArrowLeft size={16} />
        Back to timetables
      </Link>
      <TimetableGrid
        title={getTimetableTitle(timetable)}
        subtitle={`${timetable.status ?? "Generated"} timetable`}
        entries={gridEntries}
        days={days}
        slots={slots.map((slot) => slot.label)}
      />
    </div>
  );
};
