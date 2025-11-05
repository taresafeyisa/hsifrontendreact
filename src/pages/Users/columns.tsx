import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/employee/data-table-column-header";
import { DataTableRowActions } from "@/components/employee/data-table-row-actions";

export const columns: ColumnDef<any>[] = [
  {
    id: "select", // Checkbox to select rows
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "fullName",
    accessorKey: "fullName", // Show user's full name (used as the table's search column)
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("fullName")}</span>
    ),
    // text search filter for the full name
    filterFn: (row, _id, value) => {
      const v = String((row.original as any).fullName ?? "").toLowerCase();
      return v.includes(String(value ?? "").toLowerCase());
    },
  },
  {
    id: "email",
    accessorKey: "email", // Show user's email
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <span>{row.getValue("email")}</span>,
    // toolbar label for email (set as primary search column)
    meta: { title: "emailid", primary: true },
    filterFn: (row, _id, value) => {
      const v = String((row.original as any).email ?? "").toLowerCase();
      return v.includes(String(value ?? "").toLowerCase());
    },
  },
  {
    id: "roleId",
    accessorKey: "roleId", // Show user's role ID
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role ID" />
    ),
    // toolbar label for role and text/faceted filter
    meta: { title: "role", filter: "faceted" },
    cell: ({ row }) => <span>{row.getValue("roleId")}</span>,
    filterFn: (row, _id, value) => {
      const v = String((row.original as any).roleId ?? "").toLowerCase();
      return v.includes(String(value ?? "").toLowerCase());
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
