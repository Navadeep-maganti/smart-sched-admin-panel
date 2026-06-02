import { axiosInstance } from './axios';

export const fetchResource = async (path: string) => {
  const response = await axiosInstance.get(path);
  return response.data;
};

export const fetchDepartments = async () => fetchResource('/academics/departments/');
export const fetchTerms = async () => fetchResource('/academics/terms/');
export const fetchSections = async () => fetchResource('/academics/sections/');
export const fetchSubjects = async () => fetchResource('/academics/subjects/');
export const fetchBuildings = async () => fetchResource('/infrastructure/buildings/');
export const fetchRooms = async () => fetchResource('/infrastructure/rooms/');
export const fetchDays = async () => fetchResource('/infrastructure/days/');
export const fetchTimeslots = async () => fetchResource('/infrastructure/timeslots/');
export const fetchFaculty = async () => fetchResource('/auth/faculties/');
export const fetchStudents = async () => fetchResource('/auth/students/');
export const fetchConstraintTypes = async () => fetchResource('/constraints/types/');
export const fetchFacultyConstraints = async () => fetchResource('/constraints/faculty/');
export const fetchTeachingAssignments = async () => fetchResource('/timetables/assignments/');
export const fetchSessionGroups = async () => fetchResource('/timetables/session-groups/');
export const fetchTimetables = async () => fetchResource('/timetables/timetables/');
export const fetchTimetableEntries = async () => fetchResource('/timetables/entries/');
