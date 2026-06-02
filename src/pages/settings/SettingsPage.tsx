import { Settings, SlidersHorizontal } from 'lucide-react';

export const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-soft">
        <div className="flex items-center gap-4">
          <div className="rounded-3xl bg-brand-500/15 p-4 text-brand-300">
            <Settings size={28} />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Settings</p>
            <h2 className="text-3xl font-semibold text-white">Workspace configuration</h2>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-3xl bg-slate-950 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-white">Scheduler preferences</p>
                <p className="mt-1 text-sm text-slate-400">Manage generation defaults and automation controls.</p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-slate-800">
                <SlidersHorizontal size={16} /> Configure
              </button>
            </div>
          </div>
          <div className="rounded-3xl bg-slate-950 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">Theme</p>
                <p className="mt-2 text-lg font-semibold text-white">Dark mode</p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-sm text-slate-400">Notifications</p>
                <p className="mt-2 text-lg font-semibold text-white">Alerts enabled</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};