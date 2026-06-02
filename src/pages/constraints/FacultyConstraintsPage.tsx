import { ColumnDef } from '@tanstack/react-table';
import { Search, CalendarCheck, UserCheck, Users } from 'lucide-react';
import { DataTable } from '../../components/ui/DataTable';
import { LoadingShell } from '../../components/ui/LoadingShell';
import { useFacultyConstraints } from '../../hooks/useResources';

export const FacultyConstraintsPage = () => {
    const query = useFacultyConstraints();
    const data = query.data ?? [];
    // "constraint_id":1,"faculty":18,"faculty_name":"Core Systems Faculty 1","faculty_department_id":3,"day":1,"day_name":"Monday","slot":1,"slot_number":1,"constraint_type":2,"constraint_type_name":"PREFERRED","remarks":"Prefers early week teaching."}
    const columns: ColumnDef<any>[] = [
        {header: 'ID', accessorKey: 'constraint_id'},
        { header: 'Faculty', accessorKey: 'faculty_name' },
        { header: 'Day', accessorKey: 'day_name' },
        { header: 'Slot', accessorKey: 'slot_number' },
        { header: 'Constraint Type', accessorKey: 'constraint_type_name' },
    ];

    if (query.isLoading) return <LoadingShell />;

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Constraints</p>
                        <h2 className="text-3xl font-semibold text-white">Faculty Constraints</h2>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="search"
                                placeholder="Filter by faculty"
                                className="w-full rounded-3xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-brand-500"
                            />
                        </div>
                        <div className="relative">
                            <CalendarCheck className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="search"
                                placeholder="Filter by day"
                                className="w-full rounded-3xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-brand-500"
                            />
                        </div>
                        <div className="relative">
                            <Users className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="search"
                                placeholder="Filter by department"
                                className="w-full rounded-3xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-brand-500"
                            />
                        </div>
                    </div>
                </div>
                <DataTable columns={columns} data={data} emptyText="No faculty constraints found." />
            </div>
        </div>
    );
};