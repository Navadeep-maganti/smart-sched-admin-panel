import { useQuery } from '@tanstack/react-query';
import {
  fetchDepartments,
  fetchTerms,
  fetchSections,
  fetchSubjects,
  fetchBuildings,
  fetchRooms,
  fetchDays,
  fetchTimeslots,
  fetchFaculty,
  fetchStudents,
  fetchConstraintTypes,
  fetchFacultyConstraints,
  fetchTeachingAssignments,
  fetchSessionGroups,
  fetchTimetables,
  fetchTimetableEntries,
} from '../api/resources';

export const useDepartments = () => useQuery({ queryKey: ['resources', 'departments'], queryFn: fetchDepartments });
export const useTerms = () => useQuery({ queryKey: ['resources', 'terms'], queryFn: fetchTerms });
export const useSections = () => useQuery({ queryKey: ['resources', 'sections'], queryFn: fetchSections });
export const useSubjects = () => useQuery({ queryKey: ['resources', 'subjects'], queryFn: fetchSubjects });
export const useBuildings = () => useQuery({ queryKey: ['resources', 'buildings'], queryFn: fetchBuildings });
export const useRooms = () => useQuery({ queryKey: ['resources', 'rooms'], queryFn: fetchRooms });
export const useDays = () => useQuery({ queryKey: ['resources', 'days'], queryFn: fetchDays });
export const useTimeslots = () => useQuery({ queryKey: ['resources', 'timeslots'], queryFn: fetchTimeslots });
export const useFaculty = () => useQuery({ queryKey: ['resources', 'faculty'], queryFn: fetchFaculty });
export const useStudents = () => useQuery({ queryKey: ['resources', 'students'], queryFn: fetchStudents });
export const useConstraintTypes = () => useQuery({ queryKey: ['resources', 'constraintTypes'], queryFn: fetchConstraintTypes });
export const useFacultyConstraints = () => useQuery({ queryKey: ['resources', 'facultyConstraints'], queryFn: fetchFacultyConstraints });
export const useTeachingAssignments = () => useQuery({ queryKey: ['resources', 'assignments'], queryFn: fetchTeachingAssignments });
export const useSessionGroups = () => useQuery({ queryKey: ['resources', 'sessionGroups'], queryFn: fetchSessionGroups });
export const useTimetables = () => useQuery({ queryKey: ['resources', 'timetables'], queryFn: fetchTimetables });
export const useTimetableEntries = () => useQuery({ queryKey: ['resources', 'timetableEntries'], queryFn: fetchTimetableEntries });
