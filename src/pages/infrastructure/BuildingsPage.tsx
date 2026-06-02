import { ColumnDef } from '@tanstack/react-table';
import { Search, Building2 } from 'lucide-react';
import { DataTable } from '../../components/ui/DataTable';
import { LoadingShell } from '../../components/ui/LoadingShell';
import { useBuildings } from '../../hooks/useResources';

export const BuildingsPage = () => {
    const query = useBuildings();
    const data = query.data ?? [];
    // "building_id":1,"building_name":"ECE Academic Tower"}
    const columns: ColumnDef<any>[] = [
        { header: 'ID', accessorKey: 'building_id' },
        { header: 'Building Name', accessorKey: 'building_name' },
    ];

    if (query.isLoading) return <LoadingShell />;

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Infrastructure</p>
                        <h2 className="text-3xl font-semibold text-white">Buildings</h2>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="search"
                                placeholder="Search buildings"
                                className="w-full rounded-3xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-brand-500"
                            />
                        </div>
                    </div>
                </div>
                <DataTable columns={columns} data={data} emptyText="No buildings found." />
            </div>
        </div>
    );
};