import { Bell, Moon, SunMedium } from 'lucide-react';
import { useMemo, useState } from 'react';
import { getStoredProfile } from '../../hooks/useAuth';

export const TopNav = () => {
  const [darkMode, setDarkMode] = useState(true);
  const profile = useMemo(() => getStoredProfile(), []);

  const toggleMode = () => {
    setDarkMode((value) => !value);
    document.documentElement.classList.toggle('light');
  };

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/95 px-6 py-4 backdrop-blur">
      <div>
        <p className="text-sm font-medium text-slate-400">Welcome back,</p>
        <h1 className="text-2xl font-semibold text-slate-100">{profile?.name ?? 'Admin'}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleMode}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-2 text-slate-300 hover:bg-slate-800"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <SunMedium size={18} /> : <Moon size={18} />}
        </button>
        <button className="rounded-2xl border border-slate-800 bg-slate-900 p-2 text-slate-300 hover:bg-slate-800" aria-label="Notifications">
          <Bell size={18} />
        </button>
      </div>
    </header>
  );
};
