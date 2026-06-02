import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

interface DashboardShellProps {
  children: ReactNode;
  onLogout: () => void;
}

export const DashboardShell = ({ children, onLogout }: DashboardShellProps) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen overflow-hidden">
        <Sidebar onLogout={onLogout} />
        <div className="flex-1 overflow-hidden">
          <TopNav />
          <main className="h-full overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  );
};
