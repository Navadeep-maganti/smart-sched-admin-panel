export type Role = 'ADMIN' | 'HOD';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
}

export interface ApiResponse<T> {
  data: T;
}
