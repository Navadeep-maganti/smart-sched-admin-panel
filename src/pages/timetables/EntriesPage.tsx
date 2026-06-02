import { ColumnDef } from '@tanstack/react-table';
import { Search } from 'lucide-react';
import { DataTable } from '../../components/ui/DataTable';
import { LoadingShell } from '../../components/ui/LoadingShell';
import { useTimetableEntries } from '../../hooks/useResources';

export const EntriesPage = () => {
    const query = useTimetableEntries();
    const data = query.data ?? [];
    // "entry_id":1,"timetable":1,"assignment":40,"subject_code":"PERFCSEL2","faculty_name":"PERF-CSE LABB Faculty 1","day":1,"day_name":"Monday","starting_slot":1,"starting_slot_number":1,"duration":3,"room":19,"room_name":"PERF-CSE-COMPUTE-LAB-1","entry_type":"REGULAR","status":"SCHEDULED","created_at":"2026-06-01T20:06:23.242237+05:30"}
    const columns: ColumnDef<any>[] = [
        {header:'ID', accessorKey: 'entry_id'},
        { header: 'assignment_id', accessorKey: 'assignment' },
        { header: 'Subject', accessorKey: 'subject_code' },
        { header: 'Faculty', accessorKey: 'faculty_name' },
        { header: 'Day', accessorKey: 'day_name' },
        { header: 'Slot', accessorKey: 'starting_slot_numbere' },
        { header: 'Duration', accessorKey: 'duration' },
        { header: 'Room', accessorKey: 'room' },
    ];

    if (query.isLoading) return <LoadingShell />;

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Timetables</p>
                        <h2 className="text-3xl font-semibold text-white">Timetable Entries</h2>
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                        <input
                            type="search"
                            placeholder="Search entries"
                            className="w-full rounded-3xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-brand-500"
                        />
                    </div>
                </div>
                <DataTable columns={columns} data={data} emptyText="No timetable entries found." />
            </div>
        </div>
    );
};