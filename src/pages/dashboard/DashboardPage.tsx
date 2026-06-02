import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, Pie, PieChart } from 'recharts';
import { Clock3, LayoutGrid, School, Users, Warehouse } from 'lucide-react';
import { useDashboardActivity, useDashboardSummary, useDashboardStatus, useFacultyAllocation, useRoomUtilization } from '../../hooks/useDashboard';
import { LoadingShell } from '../../components/ui/LoadingShell';

const metricCards = [
  { key: 'totalDepartments', label: 'Departments', icon: School },
  { key: 'totalFaculty', label: 'Faculty', icon: Users },
  { key: 'totalSections', label: 'Sections', icon: LayoutGrid },
  { key: 'totalRooms', label: 'Rooms', icon: Warehouse },
  { key: 'totalSubjects', label: 'Subjects', icon: Clock3 },
  { key: 'activeTimetables', label: 'Active Timetables', icon: Clock3 },
] as const;

export const DashboardPage = () => {
  const summaryQuery = useDashboardSummary();
  const statusQuery = useDashboardStatus();
  const activityQuery = useDashboardActivity();
  const roomsQuery = useRoomUtilization();
  const facultyQuery = useFacultyAllocation();

  if (summaryQuery.isLoading || statusQuery.isLoading || activityQuery.isLoading || roomsQuery.isLoading || facultyQuery.isLoading) {
    return <LoadingShell />;
  }

  const summary = summaryQuery.data ?? {
    totalDepartments: 0,
    totalFaculty: 0,
    totalSections: 0,
    totalRooms: 0,
    totalSubjects: 0,
    activeTimetables: 0,
  };

  const statusData = statusQuery.data ?? [];
  const roomData = roomsQuery.data ?? [];
  const facultyData = facultyQuery.data ?? [];
  const activityData = activityQuery.data ?? [];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-soft">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Executive summary</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">University operations dashboard</h2>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-5 py-3 text-slate-300">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Last refresh</p>
            <p className="mt-1 font-semibold text-white">Real-time analytics</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {metricCards.map(({ key, label, icon: Icon }) => (
            <div key={key} className="rounded-3xl border border-slate-800 bg-slate-950 p-6 shadow-soft">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">{label}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{summary[key]}</p>
                </div>
                <div className="rounded-2xl bg-slate-900 p-3 text-brand-500">
                  <Icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Utilization</p>
              <h3 className="text-xl font-semibold text-white">Room utilization</h3>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roomData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
                <YAxis tick={{ fill: '#94a3b8' }} />
                <Tooltip wrapperClassName="bg-slate-900 border border-slate-800 text-slate-100" />
                <Bar dataKey="value" fill="#38bdf8" radius={[12, 12, 0, 0]}>
                  {roomData.map((entry, index) => (
                    <Cell key={entry.name} fill={index % 2 === 0 ? '#38bdf8' : '#818cf8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Allocation</p>
              <h3 className="text-xl font-semibold text-white">Faculty distribution</h3>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={facultyData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={110} paddingAngle={3}>
                  {facultyData.map((entry, index) => (
                    <Cell key={entry.name} fill={index % 2 === 0 ? '#22c55e' : '#38bdf8'} />
                  ))}
                </Pie>
                <Tooltip wrapperClassName="bg-slate-900 border border-slate-800 text-slate-100" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Timetable insights</p>
              <h3 className="text-xl font-semibold text-white">Status distribution</h3>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} />
                <YAxis tick={{ fill: '#94a3b8' }} />
                <Tooltip wrapperClassName="bg-slate-900 border border-slate-800 text-slate-100" />
                <Bar dataKey="value" fill="#f97316" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
          <div className="mb-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Activity feed</p>
            <h3 className="text-xl font-semibold text-white">Recent system events</h3>
          </div>
          <div className="space-y-4">
            {activityData.length === 0 ? (
              <div className="rounded-3xl bg-slate-950 p-6 text-slate-500">No recent activity available.</div>
            ) : (
              activityData.map((activity) => (
                <div key={activity.id} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-white">{activity.message}</p>
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                      {activity.type}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{new Date(activity.timestamp).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
