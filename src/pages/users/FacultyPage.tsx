import { ColumnDef } from '@tanstack/react-table';
import { Search, Users } from 'lucide-react';
import { DataTable } from '../../components/ui/DataTable';
import { LoadingShell } from '../../components/ui/LoadingShell';
import { useFaculty } from '../../hooks/useResources';

export const FacultyPage = () => {
    const query = useFaculty();
    const data = query.data ?? [];
    // "faculty_id":27,"faculty_name":"PERF-CSE LABB Faculty 2","email":"perf-cse.labB2@perf.example.edu","role":"FACULTY","department_id":3,"department_code":"PERF-CSE","department_name":"Performance Computer Science"
    const columns: ColumnDef<any>[] = [
        {header: 'ID', accessorKey: 'faculty_id'},
        { header: 'Faculty Name', accessorKey: 'faculty_name' },
        { header: 'Department', accessorKey: 'department_name' },
        { header: 'Email', accessorKey: 'email' },
    ];

    if (query.isLoading) return <LoadingShell />;

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Users</p>
                        <h2 className="text-3xl font-semibold text-white">Faculty</h2>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="search"
                                placeholder="Search faculty"
                                className="w-full rounded-3xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-brand-500"
                            />
                        </div>
                    </div>
                </div>
                <DataTable columns={columns} data={data} emptyText="No faculty records found." />
            </div>
        </div>
    );
};