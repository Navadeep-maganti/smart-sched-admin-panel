import { ColumnDef } from '@tanstack/react-table';
import { Search, Users } from 'lucide-react';
import { DataTable } from '../../components/ui/DataTable';
import { LoadingShell } from '../../components/ui/LoadingShell';
import { useSections } from '../../hooks/useResources';

export const SectionsPage = () => {
    const query = useSections();
    const data = query.data ?? [];
    // "section_id":1,"department":2,"department_code":"ECE","department_name":"Electronics and Communication Engineering","academic_term":1,"academic_year":"2026-2027","term_type":"ODD","year_number":2,"section_name":"A","student_strength":64
    const columns: ColumnDef<any>[] = [
        { header: 'ID', accessorKey: 'section_id' },
        { header: 'Department', accessorKey: 'department_name' },
        { header: 'Year', accessorKey: 'year_number' },
        { header: 'Section', accessorKey: 'section_name' },
        { header: 'Student Strength', accessorKey: 'student_strength' },
    ];

    if (query.isLoading) return <LoadingShell />;

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Academics</p>
                        <h2 className="text-3xl font-semibold text-white">Sections</h2>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="search"
                                placeholder="Search sections"
                                className="w-full rounded-3xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-brand-500"
                            />
                        </div>
                        <button className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-600">
                            <Users size={16} /> New section
                        </button>
                    </div>
                </div>
                <DataTable columns={columns} data={data} emptyText="No sections found." />
            </div>
        </div>
    );
};