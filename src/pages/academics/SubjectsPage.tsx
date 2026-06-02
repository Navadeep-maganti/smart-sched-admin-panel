import { ColumnDef } from '@tanstack/react-table';
import { Search, BookOpen, Layers } from 'lucide-react';
import { DataTable } from '../../components/ui/DataTable';
import { LoadingShell } from '../../components/ui/LoadingShell';
import { useSubjects } from '../../hooks/useResources';

export const SubjectsPage = () => {
    const query = useSubjects();
    const data = query.data ?? [];
    // "subject_code":"CS2041","subject_title":"ML","credits":3,"department":1,"department_code":"CSE","department_name":"Computer Science and Engineering","subject_type":"THEORY","sessions_per_week":3,"session_duration":1,"required_room_type":"CLASSROOM"
    const columns: ColumnDef<any>[] = [
        { header: 'Subject Code', accessorKey: 'subject_code' },
        { header: 'Subject Name', accessorKey: 'subject_title' },
        { header: 'Sessions / Week', accessorKey: 'sessions_per_week' },
        { header: 'Duration', accessorKey: 'session_duration' },
        { header: 'Subject Type', accessorKey: 'subject_type' },
        { header: 'Required Room Type', accessorKey: 'required_room_type' },
    ];

    if (query.isLoading) return <LoadingShell />;

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Academics</p>
                        <h2 className="text-3xl font-semibold text-white">Subjects</h2>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="search"
                                placeholder="Search subjects"
                                className="w-full rounded-3xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-brand-500"
                            />
                        </div>
                        <button className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-600">
                            <BookOpen size={16} /> Add subject
                        </button>
                    </div>
                </div>
                <DataTable columns={columns} data={data} emptyText="No subjects found." />
            </div>
        </div>
    );
};