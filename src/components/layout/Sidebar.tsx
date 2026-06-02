import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { navItems } from '../../navigation';
import { Menu, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { getStoredProfile } from '../../hooks/useAuth';

interface SidebarProps {
  onLogout: () => void;
}

export const Sidebar = ({ onLogout }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const profile = getStoredProfile();

  const grouped = useMemo(() => {
    return navItems.reduce<Record<string, typeof navItems>>((acc, item) => {
      const section = item.section || 'General';
      if (!acc[section]) acc[section] = [];
      acc[section].push(item);
      return acc;
    }, {});
  }, []);

  return (
    <aside className="flex h-full min-h-screen flex-col border-r border-slate-800 bg-slate-950 text-slate-100 shadow-soft transition-all duration-300">
      <div className="flex items-center justify-between gap-3 px-4 py-5">
        <div className="space-y-1">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Smart Scheduler</p>
          <p className="text-lg font-semibold">Admin Portal</p>
        </div>
        <button
          onClick={() => setCollapsed((value) => !value)}
          className="rounded-2xl p-2 text-slate-300 hover:bg-slate-800 hover:text-white"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 pb-6">
        {Object.entries(grouped).map(([section, items]) => (
          <div key={section} className="mb-6">
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              {collapsed ? section.charAt(0) : section}
            </p>
            <div className="space-y-1">
              {items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition-colors duration-200 ${
                      isActive ? 'bg-slate-800 text-white shadow-soft' : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`
                  }
                >
                  <item.icon size={18} />
                  {!collapsed && item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="space-y-3 border-t border-slate-800 px-4 py-4">
        <div className="rounded-3xl bg-slate-900 px-4 py-4 text-sm text-slate-300">
          <p className="font-medium text-slate-100">{profile?.name ?? 'Administrator'}</p>
          <p className="text-slate-500">{profile?.role ?? 'ADMIN'}</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-200 hover:border-rose-400 hover:text-white"
        >
          <LogOut size={16} />
          {!collapsed && 'Sign Out'}
        </button>
      </div>
    </aside>
  );
};
