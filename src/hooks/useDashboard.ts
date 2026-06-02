import { useQuery } from '@tanstack/react-query';
import { fetchDashboardActivity, fetchDashboardSummary, fetchDashboardStatus, fetchFacultyAllocation, fetchRoomUtilization } from '../api/dashboard';

export const useDashboardSummary = () => useQuery({ queryKey: ['dashboard', 'summary'], queryFn: fetchDashboardSummary });
export const useDashboardStatus = () => useQuery({ queryKey: ['dashboard', 'status'], queryFn: fetchDashboardStatus });
export const useDashboardActivity = () => useQuery({ queryKey: ['dashboard', 'activity'], queryFn: fetchDashboardActivity });
export const useRoomUtilization = () => useQuery({ queryKey: ['dashboard', 'roomUtilization'], queryFn: fetchRoomUtilization });
export const useFacultyAllocation = () => useQuery({ queryKey: ['dashboard', 'facultyAllocation'], queryFn: fetchFacultyAllocation });
