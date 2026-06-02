import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/auth';
import type { UserProfile } from '../types';

const PROFILE_KEY = ['auth', 'profile'];

export const useAuthProfile = () => {
  return useQuery<UserProfile>({
    queryKey: PROFILE_KEY,
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const getStoredProfile = (): UserProfile | null => {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
};
