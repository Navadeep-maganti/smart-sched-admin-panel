import { useSections } from "../hooks/useResources";

export type RawTimetable = {
  timetable_id: number;
  section?: number;
  section_name?: string;
  term_label?: string;
  version_number?: number;
  status?: string;
  generated_at?: string;
};

export type RawTimetableEntry = {
  entry_id: number;
  timetable: number;
  subject_code?: string;
  subject_title?: string;
  faculty?: number;
  faculty_name?: string;
  day?: number;
  day_name?: string;
  starting_slot?: number;
  starting_slot_number?: number;
  duration?: number;
  room?: number;
  room_name?: string;
  entry_type?: string;
  status?: string;
};

export type RawDay = {
  day_id?: number;
  day_name: string;
};

export type RawTimeslot = {
  slot_id?: number;
  slot_number: number;
  start_time: string;
  end_time: string;
  is_break?: boolean;
};

export type TimetableGridEntry = {
  id: number;
  day: string;
  slot: string;
  label: string;
  room: string;
  meta?: string;
  type: "Theory" | "Lab" | "Seminar";
};

const fallbackDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const formatTime = (value?: string) => {
  if (!value) return "";
  const [hour, minute] = value.split(":");
  return hour && minute ? `${hour}:${minute}` : value;
};

// Department_name Year_number Section - Term - Version
export const getTimetableTitle = (timetable: RawTimetable) => {


  type Section = {
    section_id: number | string;
    section_name: string;
    department_name: string;
    year_number: number;
  };

  type EnrichedTimetable = RawTimetable & {
    department_name?: string;
    year_number?: number;
    generated_by_email?: string;
  };

  const enrichTimetables = (
    timetables: RawTimetable[],
    sections: Section[],
  ): EnrichedTimetable[] => {
    const sectionMap = new Map(
      sections.map((section) => [section.section_id, section])
    );
    return timetables.map((timetable) => {
      const section =
        timetable.section === undefined ? undefined : sectionMap.get(timetable.section);
      return {
        ...timetable,
        department_name: section?.department_name,
        year_number: section?.year_number,
        section_name: section?.section_name || timetable.section_name,
        term_label: timetable.term_label,
      };
    });
  };
  const sectionsQuery = useSections();
  const sections = sectionsQuery.data ?? [];

  const enrichedTimetables = enrichTimetables([timetable], sections);
  const enrichedTimetable = enrichedTimetables[0];



  const department = enrichedTimetable.department_name ?? "Department";
  const year = enrichedTimetable.year_number?.toString() ?? "Year";
  const section = enrichedTimetable.section_name
    ? `Section ${enrichedTimetable.section_name}`
    : "Timetable";
  const term = enrichedTimetable.term_label ? ` - ${enrichedTimetable.term_label}` : "";
  const version =
    enrichedTimetable.version_number !== undefined
      ? ` - Version ${enrichedTimetable.version_number}`
      : "";
  return `${department}, Year ${year}, ${section}${term}${version}`;
};

export const buildDayLabels = (
  days: RawDay[] = [],
  entries: RawTimetableEntry[] = [],
) => {
  const labels = days.map((day) => day.day_name).filter(Boolean);
  const entryLabels = entries
    .map((entry) => entry.day_name)
    .filter(Boolean) as string[];
  return Array.from(new Set([...labels, ...entryLabels, ...fallbackDays]));
};

export const buildSlotLabels = (
  timeslots: RawTimeslot[] = [],
  entries: RawTimetableEntry[] = [],
) => {
  const usableSlots = timeslots.filter((slot) => !slot.is_break);

  if (usableSlots.length) {
    return usableSlots
      .sort((a, b) => a.slot_number - b.slot_number)
      .map((slot) => ({
        number: slot.slot_number,
        label: `${formatTime(slot.start_time)} - ${formatTime(slot.end_time)}`,
      }));
  }

  const numbers = Array.from(
    new Set(
      entries
        .map((entry) => entry.starting_slot_number ?? entry.starting_slot)
        .filter(Boolean),
    ),
  ) as number[];

  return numbers
    .sort((a, b) => a - b)
    .map((number) => ({ number, label: `Slot ${number}` }));
};

const getEntryType = (entry: RawTimetableEntry): TimetableGridEntry["type"] => {
  const text = `${entry.entry_type ?? ""} ${entry.subject_title ?? ""} ${entry.subject_code ?? ""}`;
  if (/lab|practical/i.test(text)) return "Lab";
  if (/seminar/i.test(text)) return "Seminar";
  return "Theory";
};

export const normalizeEntriesForGrid = (
  entries: RawTimetableEntry[],
  slotLabels: ReturnType<typeof buildSlotLabels>,
  metaForEntry?: (entry: RawTimetableEntry) => string | undefined,
): TimetableGridEntry[] => {
  const slotLabelByNumber = new Map(
    slotLabels.map((slot) => [slot.number, slot.label]),
  );

  return entries.map((entry) => {
    const slotNumber = entry.starting_slot_number ?? entry.starting_slot;
    return {
      id: entry.entry_id,
      day: entry.day_name ?? `Day ${entry.day ?? ""}`.trim(),
      slot:
        slotLabelByNumber.get(slotNumber ?? -1) ??
        `Slot ${slotNumber ?? ""}`.trim(),
      label: entry.subject_title ?? entry.subject_code ?? "Scheduled class",
      room: entry.room_name ?? "Room not assigned",
      meta: metaForEntry?.(entry) ?? entry.faculty_name,
      type: getEntryType(entry),
    };
  });
};

export const groupEntriesBy = (
  entries: RawTimetableEntry[],
  getKey: (entry: RawTimetableEntry) => string,
) =>
  entries.reduce<Record<string, RawTimetableEntry[]>>((acc, entry) => {
    const key = getKey(entry) || "Unassigned";
    acc[key] = acc[key] ?? [];
    acc[key].push(entry);
    return acc;
  }, {});
