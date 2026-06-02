import { axiosInstance } from './axios';

export interface DashboardSummary {
  totalDepartments: number;
  totalFaculty: number;
  totalSections: number;
  totalRooms: number;
  totalSubjects: number;
  activeTimetables: number;
}

export interface DashboardStatusCount {
  name: string;
  value: number;
}

export interface DashboardActivity {
  id: string;
  message: string;
  timestamp: string;
  type: 'success' | 'warning' | 'info';
}

interface TimetableListItem {
  timetable_id: number;
  section_name: string;
  term_label: string;
  status: string;
  generated_at: string;
}

interface AssignmentItem {
  faculty: number;
  faculty_name: string;
}

interface RoomItem {
  room_id: number;
  room_name: string;
  room_type: string;
  building_name: string;
}

const fetchList = async <T>(path: string): Promise<T[]> => {
  const response = await axiosInstance.get<T[]>(path);
  return response.data;
};

export const fetchDashboardSummary = async (): Promise<DashboardSummary> => {
  const [departments, sections, subjects, rooms, timetables, assignments] = await Promise.all([
    fetchList('/academics/departments/'),
    fetchList('/academics/sections/'),
    fetchList('/academics/subjects/'),
    fetchList('/infrastructure/rooms/'),
    fetchList<TimetableListItem>('/timetables/timetables/'),
    fetchList<AssignmentItem>('/timetables/assignments/'),
  ]);

  const facultyIds = new Set(assignments.map((assignment) => assignment.faculty));
  const activeTimetables = timetables.filter((item) => item.status !== 'ARCHIVED').length;

  return {
    totalDepartments: departments.length,
    totalFaculty: facultyIds.size,
    totalSections: sections.length,
    totalRooms: rooms.length,
    totalSubjects: subjects.length,
    activeTimetables,
  };
};

export const fetchDashboardStatus = async (): Promise<DashboardStatusCount[]> => {
  const timetables = await fetchList<TimetableListItem>('/timetables/timetables/');
  const statusMap = timetables.reduce<Record<string, number>>((acc, timetable) => {
    acc[timetable.status] = (acc[timetable.status] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(statusMap).map(([name, value]) => ({ name, value }));
};

export const fetchDashboardActivity = async (): Promise<DashboardActivity[]> => {
  const timetables = await fetchList<TimetableListItem>('/timetables/timetables/?ordering=-generated_at');
  return timetables.slice(0, 5).map((timetable) => ({
    id: timetable.timetable_id.toString(),
    message: `${timetable.section_name} timetable ${timetable.status.toLowerCase()}`,
    timestamp: timetable.generated_at,
    type: timetable.status === 'PUBLISHED' ? 'success' : timetable.status === 'ARCHIVED' ? 'warning' : 'info',
  }));
};

export const fetchRoomUtilization = async (): Promise<DashboardStatusCount[]> => {
  const rooms = await fetchList<RoomItem>('/infrastructure/rooms/');
  const roomTypeMap = rooms.reduce<Record<string, number>>((acc, room) => {
    const name = room.room_type || 'Unknown';
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(roomTypeMap).map(([name, value]) => ({ name, value }));
};

export const fetchFacultyAllocation = async (): Promise<DashboardStatusCount[]> => {
  const assignments = await fetchList<AssignmentItem>('/timetables/assignments/');
  const facultyMap = assignments.reduce<Record<string, number>>((acc, assignment) => {
    const name = assignment.faculty_name || `Faculty ${assignment.faculty}`;
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(facultyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, value]) => ({ name, value }));
};
