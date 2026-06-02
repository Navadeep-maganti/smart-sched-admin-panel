import { ColumnDef } from '@tanstack/react-table';
import { Search, ShieldCheck } from 'lucide-react';
import { DataTable } from '../../components/ui/DataTable';
import { LoadingShell } from '../../components/ui/LoadingShell';
import { useConstraintTypes } from '../../hooks/useResources';

export const ConstraintTypesPage = () => {
    const query = useConstraintTypes();
    const data = query.data ?? [];
    // "constraint_type_id":1,"constraint_name":"UNAVAILABLE","constraint_category":"FACULTY","priority_level":1,"is_hard_constraint":true,"description":"Faculty cannot teach in this slot."}
    const columns: ColumnDef<any>[] = [
        {header: 'ID', accessorKey:'constraint_type_id'},
        { header: 'Name', accessorKey: 'constraint_name' },
        { header: 'Category', accessorKey: 'constraint_category' },
        { header: 'Hard Constraint', accessorKey: 'is_hard_constraint' },
        { header: 'Priority', accessorKey: 'priority_level' },
    ];

    if (query.isLoading) return <LoadingShell />;

    return (
        <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Constraints</p>
                        <h2 className="text-3xl font-semibold text-white">Constraint Types</h2>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                            <input
                                type="search"
                                placeholder="Search constraint types"
                                className="w-full rounded-3xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-brand-500"
                            />
                        </div>
                    </div>
                </div>
                <DataTable columns={columns} data={data} emptyText="No constraint types found." />
            </div>
        </div>
    );
};