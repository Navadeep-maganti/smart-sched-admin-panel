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

export const SectionTimetablePage = () => {
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

  const timetables = (timetablesQuery.data ?? []) as RawTimetable[];
  const entries = (entriesQuery.data ?? []) as RawTimetableEntry[];

  if (!timetables.length || !entries.length) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-slate-400">
        No section timetable data available yet. Run a scheduler cycle to
        visualize it.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {timetables.map((timetable) => {
        const timetableEntries = entries.filter(
          (entry) => entry.timetable === timetable.timetable_id,
        );

        if (!timetableEntries.length) return null;

        const days = buildDayLabels(
          daysQuery.data as RawDay[] | undefined,
          timetableEntries,
        );
        const slots = buildSlotLabels(
          timeslotsQuery.data as RawTimeslot[] | undefined,
          timetableEntries,
        );

        return (
          <TimetableGrid
            key={timetable.timetable_id}
            title={getTimetableTitle(timetable)}
            subtitle="Section timetable"
            entries={normalizeEntriesForGrid(timetableEntries, slots)}
            days={days}
            slots={slots.map((slot) => slot.label)}
          />
        );
      })}
    </div>
  );
};
