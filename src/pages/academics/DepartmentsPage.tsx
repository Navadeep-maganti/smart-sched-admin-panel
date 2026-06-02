import { ColumnDef } from "@tanstack/react-table";
import { Plus, Search } from "lucide-react";
import { DataTable } from "../../components/ui/DataTable";
import { LoadingShell } from "../../components/ui/LoadingShell";
import { useDepartments, useFaculty } from "../../hooks/useResources";

type Faculty = {
  faculty_id?: number | string;
  id?: number | string;
  name?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
};

type Department = {
  department_id: number | string;
  department_code: string;
  department_name: string;
  hod?: number | string | Faculty | null;
  hod_name?: string | null;
};

const getFacultyId = (faculty: Faculty) => faculty.faculty_id ?? faculty.id;

const getFacultyName = (faculty?: Faculty | null) => {
  if (!faculty) return null;

  const fullName = [faculty.first_name, faculty.last_name]
    .filter(Boolean)
    .join(" ");
  return (
    ((faculty.name ?? faculty.full_name ?? fullName) || faculty.email) ?? null
  );
};

const getHodName = (department: Department, faculty: Faculty[]) => {
  if (department.hod_name) return department.hod_name;

  if (department.hod && typeof department.hod === "object") {
    return getFacultyName(department.hod) ?? "N/A";
  }

  const hodId = department.hod;
  const hod = faculty.find((item) => getFacultyId(item) === hodId);
  return getFacultyName(hod) ?? "N/A";
};

export const DepartmentsPage = () => {
  const query = useDepartments();
  const facultyQuery = useFaculty();
  const faculty = (facultyQuery.data ?? []) as Faculty[];
  const data = (query.data ?? []) as Department[];
  // department_id":1,"department_code":"CSE","department_name":"Computer Science and Engineering","hod":null
  const columns: ColumnDef<Department>[] = [
    { header: "ID", accessorKey: "department_id" },
    { header: "Code", accessorKey: "department_code" },
    { header: "Name", accessorKey: "department_name" },
    {
      header: "HOD",
      accessorKey: "hod",
      cell: ({ row }) => getHodName(row.original, faculty),
    },
  ];
  if (query.isLoading || facultyQuery.isLoading) return <LoadingShell />;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-soft">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Academics
            </p>
            <h2 className="text-3xl font-semibold text-white">Departments</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="search"
                placeholder="Search departments"
                className="w-full rounded-3xl border border-slate-800 bg-slate-950 py-3 pl-12 pr-4 text-slate-100 outline-none focus:border-brand-500"
              />
            </div>
            <button className="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-600">
              <Plus size={16} /> Create
            </button>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={data}
          emptyText="No departments found."
        />
      </div>
    </div>
  );
};
