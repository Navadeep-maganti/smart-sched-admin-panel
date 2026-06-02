import { LoadingShell } from "../../components/ui/LoadingShell";
import { TimetableGrid } from "../../components/ui/TimetableGrid";
import {
  useDays,
  useTimetableEntries,
  useTimeslots,
} from "../../hooks/useResources";
import {
  buildDayLabels,
  buildSlotLabels,
  groupEntriesBy,
  normalizeEntriesForGrid,
  type RawDay,
  type RawTimetableEntry,
  type RawTimeslot,
} from "../../utils/timetable";

export const FacultyTimetablePage = () => {
  const entriesQuery = useTimetableEntries();
  const daysQuery = useDays();
  const timeslotsQuery = useTimeslots();

  if (
    entriesQuery.isLoading ||
    daysQuery.isLoading ||
    timeslotsQuery.isLoading
  ) {
    return <LoadingShell />;
  }

  const entries = (entriesQuery.data ?? []) as RawTimetableEntry[];
  const groupedEntries = groupEntriesBy(
    entries,
    (entry) => entry.faculty_name ?? "Unassigned faculty",
  );

  if (!entries.length) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-slate-400">
        No faculty timetable data available yet. Generate a timetable to view
        faculty schedules.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedEntries).map(([facultyName, facultyEntries]) => {
        const days = buildDayLabels(
          daysQuery.data as RawDay[] | undefined,
          facultyEntries,
        );
        const slots = buildSlotLabels(
          timeslotsQuery.data as RawTimeslot[] | undefined,
          facultyEntries,
        );

        return (
          <TimetableGrid
            key={facultyName}
            title={facultyName}
            subtitle="Faculty timetable"
            entries={normalizeEntriesForGrid(
              facultyEntries,
              slots,
              (entry) => entry.room_name ?? "Room not assigned",
            )}
            days={days}
            slots={slots.map((slot) => slot.label)}
          />
        );
      })}
    </div>
  );
};
