import type { LucideIcon } from 'lucide-react';
import {
  CalendarDays,
  ClipboardList,
  Clock3,
  Database,
  Home,
  Layers,
  LayoutGrid,
  Settings,
  ShieldCheck,
  TrendingUp,
  Users,
  Building2,
} from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  section?: string;
  roles?: Array<'ADMIN' | 'HOD'>;
}

export const navItems: NavItem[] = [
  { label: 'Dashboard', path: '/', icon: Home },
  { label: 'Departments', path: '/academics/departments', icon: Users, section: 'Academics' },
  { label: 'Academic Terms', path: '/academics/terms', icon: CalendarDays, section: 'Academics' },
  { label: 'Sections', path: '/academics/sections', icon: LayoutGrid, section: 'Academics' },
  { label: 'Subjects', path: '/academics/subjects', icon: ClipboardList, section: 'Academics' },
  { label: 'Buildings', path: '/infrastructure/buildings', icon: Database, section: 'Infrastructure' },
  { label: 'Rooms', path: '/infrastructure/rooms', icon: ShieldCheck, section: 'Infrastructure' },
  { label: 'Days', path: '/infrastructure/days', icon: Clock3, section: 'Infrastructure' },
  { label: 'Timeslots', path: '/infrastructure/timeslots', icon: Clock3, section: 'Infrastructure' },
  { label: 'Faculty', path: '/users/faculty', icon: Users, section: 'Users' },
  { label: 'Students', path: '/users/students', icon: Users, section: 'Users' },
  { label: 'Constraint Types', path: '/constraints/types', icon: ShieldCheck, section: 'Constraints' },
  { label: 'Faculty Constraints', path: '/constraints/faculty', icon: ShieldCheck, section: 'Constraints' },
  { label: 'Teaching Assignments', path: '/timetables/assignments', icon: ClipboardList, section: 'Timetables' },
  { label: 'Session Groups', path: '/timetables/session-groups', icon: Layers, section: 'Timetables' },
  { label: 'Timetables', path: '/timetables/list', icon: CalendarDays, section: 'Timetables' },
  { label: 'Entries', path: '/timetables/entries', icon: LayoutGrid, section: 'Timetables' },
  { label: 'Section Timetable', path: '/visualization/section', icon: CalendarDays, section: 'Timetable Visualization' },
  { label: 'Faculty Timetable', path: '/visualization/faculty', icon: Users, section: 'Timetable Visualization' },
  { label: 'Room Timetable', path: '/visualization/room', icon: Building2, section: 'Timetable Visualization' },
  { label: 'Scheduler Lab', path: '/scheduler', icon: TrendingUp, section: 'Scheduler Lab' },
  { label: 'Performance', path: '/performance', icon: TrendingUp, section: 'Performance' },
  { label: 'Settings', path: '/settings', icon: Settings },
];
