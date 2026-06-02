import { ColumnDef } from '@tanstack/react-table';
import { Search, Clock3 } from 'lucide-react';
import { DataTable } from '../../components/ui/DataTable';
import { LoadingShell } from '../../components/ui/LoadingShell';
import { useTimeslots } from '../../hooks/useResources';

export const TimeslotsPage = () => {
    const query = useTimeslots();
    const data = query.data ?? [];
    // "slot_id":1,"slot_number":1,"start_time":"08:30:00","end_time":"09:30:00","is_break":false
    const columns: ColumnDef<any>[] = [
        { header: 'Slot Number', accessorKey: 'slot_number' },
        { header: 'Start', accessorKey: 'start_time' },
        { header: 'End', accessorKey: 'end_time' },
        { header: 'Break', accessorKey: 'is_break' },
    ];

    if (query.isLoading) return <LoadingShell />;

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Infrastructure</p>
                        <h2 className="text-3xl font-semibold text-white">Timeslots</h2>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="search"
                                placeholder="Search timeslots"
                                className="w-full rounded-3xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-brand-500"
                            />
                        </div>
                    </div>
                </div>
                <DataTable columns={columns} data={data} emptyText="No timeslots found." />
            </div>
        </div>
    );
};