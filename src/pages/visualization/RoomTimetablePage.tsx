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

export const RoomTimetablePage = () => {
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
    (entry) => entry.room_name ?? "Unassigned room",
  );

  if (!entries.length) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-slate-400">
        No room timetable data available yet. Generate a schedule to visualize
        room allocations.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedEntries).map(([roomName, roomEntries]) => {
        const days = buildDayLabels(
          daysQuery.data as RawDay[] | undefined,
          roomEntries,
        );
        const slots = buildSlotLabels(
          timeslotsQuery.data as RawTimeslot[] | undefined,
          roomEntries,
        );

        return (
          <TimetableGrid
            key={roomName}
            title={roomName}
            subtitle="Room timetable"
            entries={normalizeEntriesForGrid(
              roomEntries,
              slots,
              (entry) => entry.faculty_name,
            )}
            days={days}
            slots={slots.map((slot) => slot.label)}
          />
        );
      })}
    </div>
  );
};
