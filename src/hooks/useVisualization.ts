import { useQuery } from '@tanstack/react-query';
import { fetchFacultyTimetable, fetchRoomTimetable, fetchSectionTimetable } from '../api/visualization';

export const useSectionTimetable = () => useQuery({ queryKey: ['visualization', 'section'], queryFn: fetchSectionTimetable });
export const useFacultyTimetable = () => useQuery({ queryKey: ['visualization', 'faculty'], queryFn: fetchFacultyTimetable });
export const useRoomTimetable = () => useQuery({ queryKey: ['visualization', 'room'], queryFn: fetchRoomTimetable });
