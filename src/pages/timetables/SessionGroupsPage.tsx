import { ColumnDef } from '@tanstack/react-table';
import { Search, Layers } from 'lucide-react';
import { DataTable } from '../../components/ui/DataTable';
import { LoadingShell } from '../../components/ui/LoadingShell';
import { useSessionGroups } from '../../hooks/useResources';

export const SessionGroupsPage = () => {
    const query = useSessionGroups();
    const data = query.data ?? [];
    // "group_id":1,"group_name":"PERF-CSE Performance Hardware Parallel Lab","group_category":"PARALLEL_LAB","same_time_required":true,"same_building_required":true,"preferred_building":4,"preferred_building_name":"PERF-CSE Lab Complex","priority_level":1,"members":[{"group_member_id":1,"assignment":39,"assignment_subject_code":"PERFCSEL1"}]
    const columns: ColumnDef<any>[] = [
        {header: 'ID', accessorKey: 'group_id'},
        { header: 'Group Name', accessorKey: 'group_name' },
        { header: 'Category', accessorKey: 'group_category' },
        { header: 'Same Time Required', accessorKey: 'same_time_required' },
        { header: 'Same Building Required', accessorKey: 'same_building_required' },
        // { header:'Members', accessorKey:'members', cell: (props) => props.getValue().length},
    ];

    if (query.isLoading) return <LoadingShell />;

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Timetables</p>
                        <h2 className="text-3xl font-semibold text-white">Session Groups</h2>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="search"
                                placeholder="Search session groups"
                                className="w-full rounded-3xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-brand-500"
                            />
                        </div>
                    </div>
                </div>
                <DataTable columns={columns} data={data} emptyText="No session groups found." />
            </div>
        </div>
    );
};