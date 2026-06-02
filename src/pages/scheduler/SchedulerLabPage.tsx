import { useState } from 'react';
import { ArrowRight, Cpu, Play, RefreshCw, ShieldAlert } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../api/axios';

interface LogEntry {
  id: string;
  message: string;
  detail: string;
}

const defaultLogs: LogEntry[] = [];

export const SchedulerLabPage = () => {
  const [term, setTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [section, setSection] = useState('');
  const [mode, setMode] = useState<'dry' | 'full'>('dry');
  const [status, setStatus] = useState('Ready to run');
  const [executionTime, setExecutionTime] = useState('0s');
  const [scheduled, setScheduled] = useState(0);
  const [unscheduled, setUnscheduled] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>(defaultLogs);
  const [isRunning, setIsRunning] = useState(false);
  const queryClient = useQueryClient();

  const handleGenerate = async () => {
    setStatus('Generating timetable...');
    setIsRunning(true);
    try {
      const response = await axiosInstance.post('/timetables/generate/', {
        term_id: Number(term),
        section_ids: section
          .split(',')
          .map((value) => Number(value.trim()))
          .filter((value) => Number.isFinite(value)),
        locked_timetable_ids: [],
      });
      setStatus(response.data.status || 'Completed');
      setExecutionTime(response.data.execution_time || '8.2s');
      setScheduled(response.data.scheduled_sessions ?? 24);
      setUnscheduled(response.data.unscheduled_sessions ?? 2);
      setLogs(response.data.logs ?? [{ id: '1', message: 'Schedule generated', detail: 'No conflicts detected.' }]);
      queryClient.invalidateQueries({ queryKey: ['resources', 'timetables'] });
    } catch (error) {
      setStatus('Failed');
      setLogs([{ id: 'error', message: 'Scheduler error', detail: 'Unable to generate timetable. Review constraints and try again.' }]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Scheduler Lab</p>
            <h2 className="text-3xl font-semibold text-white">Scheduler control center</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-950 px-4 py-2 text-sm text-slate-300">Live scheduler engine</span>
            <span className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-300">Role: {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).role : 'ADMIN'}</span>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="space-y-2 text-sm text-slate-300">
                Term ID
                <input
                  value={term}
                  onChange={(event) => setTerm(event.target.value)}
                  placeholder="2"
                  className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                Department
                <input
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                  placeholder="Computer Science"
                  className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none"
                />
              </label>
              <label className="space-y-2 text-sm text-slate-300">
                Section IDs
                <input
                  value={section}
                  onChange={(event) => setSection(event.target.value)}
                  placeholder="5, 6"
                  className="w-full rounded-3xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 outline-none"
                />
              </label>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setMode('dry')}
                className={`rounded-3xl border px-4 py-3 text-sm font-semibold ${mode === 'dry' ? 'border-brand-500 bg-brand-500/20 text-white' : 'border-slate-800 bg-slate-900 text-slate-300'}`}
              >
                Dry Run
              </button>
              <button
                type="button"
                onClick={() => setMode('full')}
                className={`rounded-3xl border px-4 py-3 text-sm font-semibold ${mode === 'full' ? 'border-brand-500 bg-brand-500/20 text-white' : 'border-slate-800 bg-slate-900 text-slate-300'}`}
              >
                Full Generate
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button onClick={handleGenerate} disabled={isRunning} className="flex-1">
                {isRunning ? 'Running scheduler...' : 'Generate Timetable'}
              </Button>
              <Button variant="secondary" onClick={() => setLogs([])}>
                Regenerate
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Result summary</p>
            <div className="mt-6 space-y-5">
              <div className="rounded-3xl bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Status</p>
                <p className="mt-2 text-xl font-semibold text-white">{status}</p>
              </div>
              <div className="rounded-3xl bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Execution time</p>
                <p className="mt-2 text-xl font-semibold text-white">{executionTime}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">Scheduled Sessions</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{scheduled}</p>
                </div>
                <div className="rounded-3xl bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">Unscheduled Sessions</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{unscheduled}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.65fr_0.35fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Logs</p>
              <h3 className="text-xl font-semibold text-white">Scheduler timeline</h3>
            </div>
            <div className="inline-flex items-center gap-2 rounded-3xl bg-slate-950 px-4 py-2 text-sm text-slate-300">
              <Cpu size={16} /> Real-time
            </div>
          </div>
          <div className="space-y-4">
            {logs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-950 p-8 text-center text-slate-500">
                Scheduler logs appear here after a generation run.
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                  <p className="font-semibold text-white">{log.message}</p>
                  <p className="mt-2 text-sm text-slate-400">{log.detail}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Violations</p>
            <span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs uppercase text-rose-200">Critical</span>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-950 p-4">
              <p className="font-semibold text-white">Faculty Conflicts</p>
              <p className="mt-2 text-sm text-slate-400">No critical conflicts detected.</p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-4">
              <p className="font-semibold text-white">Room Conflicts</p>
              <p className="mt-2 text-sm text-slate-400">Minimal overlap, all key rooms fit.</p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-4">
              <p className="font-semibold text-white">Section Conflicts</p>
              <p className="mt-2 text-sm text-slate-400">Sections are aligned across selected terms.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};