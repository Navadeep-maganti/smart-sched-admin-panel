import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area } from 'recharts';
import { CheckCircle2 } from 'lucide-react';
import { LoadingShell } from '../../components/ui/LoadingShell';
import { axiosInstance } from '../../api/axios';

const fetchPerformance = async () => {
  const response = await axiosInstance.get('/performance/summary');
  return response.data;
};

export const PerformancePage = () => {
  const { data, isLoading } = useQuery({ queryKey: ['performance', 'summary'], queryFn: fetchPerformance });

  if (isLoading) return <LoadingShell />;

  const summary = data?.summary ?? {
    avg: 0,
    fastest: 0,
    slowest: 0,
    total_runs: 0,
    success_rate: 0,
  };

  const trend = data?.trend ?? [];
  const room = data?.room_utilization ?? [];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-soft">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Performance</p>
            <h2 className="text-3xl font-semibold text-white">Scheduler health metrics</h2>
          </div>
          <div className="rounded-3xl bg-slate-950 px-4 py-3 text-slate-300">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Data source</p>
            <p className="text-sm font-semibold text-white">Live backend</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Average Generation Time</p>
            <p className="mt-3 text-3xl font-semibold text-white">{summary.avg}s</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Fastest Generation</p>
            <p className="mt-3 text-3xl font-semibold text-white">{summary.fastest}s</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Slowest Generation</p>
            <p className="mt-3 text-3xl font-semibold text-white">{summary.slowest}s</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Trend</p>
              <h3 className="text-xl font-semibold text-white">Generation time trend</h3>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fill: '#94a3b8' }} />
                <YAxis tick={{ fill: '#94a3b8' }} />
                <Tooltip wrapperClassName="bg-slate-950 border border-slate-800 text-slate-100" />
                <Area type="monotone" dataKey="value" stroke="#38bdf8" fillOpacity={1} fill="url(#colorTime)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Success rate</p>
              <h3 className="text-xl font-semibold text-white">Allocation success</h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm text-slate-300">
              <CheckCircle2 size={16} /> {summary.success_rate}%
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={room} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
                <YAxis tick={{ fill: '#94a3b8' }} />
                <Tooltip wrapperClassName="bg-slate-950 border border-slate-800 text-slate-100" />
                <Bar dataKey="value" fill="#f97316" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
};