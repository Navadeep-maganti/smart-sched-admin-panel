import { ColumnDef } from '@tanstack/react-table';
import { Search, Plus, Edit3, Trash2 } from 'lucide-react';
import { DataTable } from '../../components/ui/DataTable';
import { LoadingShell } from '../../components/ui/LoadingShell';
import { useTeachingAssignments } from '../../hooks/useResources';

export const AssignmentsPage = () => {
    const query = useTeachingAssignments();
    const data = query.data ?? [];
    // "assignment_id":1,"section":1,"section_name":"A","subject":"EC201","subject_title":"Signals and Systems","faculty":2,"faculty_name":"Prof. S. Ramanathan","required_room_type":"CLASSROOM","preferred_room":null,"priority_level":2
    const columns: ColumnDef<any>[] = [
        {header: 'ID', accessorKey: 'assignment_id'},
        { header: 'Section', accessorKey: 'section_name' },
        { header: 'Subject', accessorKey: 'subject_title' },
        { header: 'Faculty', accessorKey: 'faculty_name' },
        { header: 'Required Room Type', accessorKey: 'required_room_type' },
        { header: 'Preferred Room', accessorKey: 'preferred_room.room_name', cell: (props) => props.getValue() || 'None' },
        { header: 'Priority', accessorKey: 'priority_level' },
        {
            header: 'Actions',
            accessorKey: 'actions',
            cell: () => (
                <div className="flex items-center gap-2">
                    <button className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-300 hover:bg-slate-900">
                        <Edit3 size={16} />
                    </button>
                    <button className="rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-rose-300 hover:bg-rose-950">
                        <Trash2 size={16} />
                    </button>
                </div>
            ),
        },
    ];

    if (query.isLoading) return <LoadingShell />;

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Timetables</p>
                        <h2 className="text-3xl font-semibold text-white">Teaching Assignments</h2>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="search"
                                placeholder="Search assignments"
                                className="w-full rounded-3xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-brand-500"
                            />
                        </div>
                        <button className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-600">
                            <Plus size={16} /> Bulk create
                        </button>
                    </div>
                </div>
                <DataTable columns={columns} data={data} emptyText="No teaching assignments found." />
            </div>
        </div>
    );
};