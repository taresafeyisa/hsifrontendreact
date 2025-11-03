import type { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-row-view-options";

// toolbar is generic now; specific options can be provided per-column via columnDef.meta.options
// keep the import commented out in case you want to reuse task options here later.
// import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // Use a safe lookup for optional columns to avoid calling table.getColumn(id)
  // which throws when the column id is not present on the table.
  const leafColumns = table.getAllLeafColumns();
  // Helper: try to find a column by several possible ids or accessorKey names.
  const findColumn = (candidates: string[]) =>
    leafColumns.find((c) => {
      const accessor = (c.columnDef as any).accessorKey as string | undefined;
      return (
        candidates.includes(c.id) ||
        (accessor ? candidates.includes(accessor) : false)
      );
    });

  // Prefer an explicit primary column when set via columnDef.meta.primary.
  // This lets a table request a specific primary search input (e.g. email).
  const primaryMetaColumn = leafColumns.find(
    (c) => (c.columnDef as any).meta && (c.columnDef as any).meta.primary
  );

  // Prefer using title/fullName as the primary search column when no meta
  // primary is provided.
  const titleColumn = primaryMetaColumn ?? findColumn(["title", "fullName"]);

  // Determine faceted columns (those with explicit options in meta or with faceted unique values)
  const facetedCandidates = leafColumns.filter((c) => {
    if (c.id === "select" || c.id === "actions") return false;
    // Do not render a faceted or dropdown filter for email columns.
    if (c.id === "email" || (c.columnDef as any).meta?.title === "emailid")
      return false;
    const metaOptions =
      (c.columnDef as any).meta && (c.columnDef as any).meta.options;
    if (metaOptions) return true;
    const facets = c.getFacetedUniqueValues?.();
    return !!(facets && facets.size > 0);
  });

  const sortKey = (c: any) => {
    const f = (c.columnDef as any).meta?.filter as string | undefined;
    if (f === "faceted") return -1;
    if (f === "text") return 1;
    return 0;
  };

  facetedCandidates.sort((a, b) => sortKey(a) - sortKey(b));

  const facetedColumns = facetedCandidates.slice(0, 2);

  const textFilterColumn = leafColumns.find((c) => {
    if (c.id === titleColumn?.id || c.id === "select" || c.id === "actions")
      return false;
    if (c.id === "email") return false;
    const accessor = (c.columnDef as any).accessorKey as string | undefined;
    if (accessor === "email") return false;
    if ((c.columnDef as any).meta?.title === "emailid") return false;
    return true;
  });

  return (
    <div className="flex items-center justify-between overflow-x-hidden">
      <div className="flex flex-1 items-center gap-2">
        {/* Global search input placed first */}
        <Input
          placeholder="Search..."
          value={(table.getState() as any).globalFilter ?? ""}
          onChange={(e) => table.setGlobalFilter?.(e.target.value ?? undefined)}
          className="h-8 w-[180px] lg:w-[320px]"
        />
        {/* Primary column input removed to avoid duplicate search boxes. */}
        {facetedColumns.map((col) => {
          const metaFilter = (col.columnDef as any).meta?.filter as
            | string
            | undefined;
          // If the column explicitly requests a text filter, render an input
          if (metaFilter === "text") {
            return (
              <Input
                key={col.id}
                placeholder={(col.columnDef as any).meta?.title ?? col.id}
                value={(col.getFilterValue() as string) ?? ""}
                onChange={(event) => col.setFilterValue(event.target.value)}
                className="h-8 w-[150px] lg:w-[250px]"
              />
            );
          }

          const metaOptions =
            (col.columnDef as any).meta && (col.columnDef as any).meta.options;
          if (metaOptions) {
            return (
              <DataTableFacetedFilter
                key={col.id}
                column={col}
                title={(col.columnDef as any).meta?.title ?? col.id}
                options={metaOptions}
              />
            );
          }

          const facets = col.getFacetedUniqueValues?.();
          if (facets && facets.size > 0) {
            const options = Array.from(facets.keys()).map((k) => ({
              label: String(k),
              value: String(k),
            }));
            return (
              <DataTableFacetedFilter
                key={col.id}
                column={col}
                title={col.id}
                options={options}
              />
            );
          }

          // Fallback to text input for this column
          return (
            <Input
              key={col.id}
              placeholder={(col.columnDef as any).meta?.title ?? col.id}
              value={(col.getFilterValue() as string) ?? ""}
              onChange={(event) => col.setFilterValue(event.target.value)}
              className="h-8 w-[150px] lg:w-[250px]"
            />
          );
        })}

        {textFilterColumn &&
          !facetedColumns.find((c) => c.id === textFilterColumn.id) && (
            <Input
              placeholder={
                (textFilterColumn.columnDef as any).meta?.title ??
                textFilterColumn.id
              }
              value={(textFilterColumn.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                textFilterColumn.setFilterValue(event.target.value)
              }
              className="h-8 w-[150px] lg:w-[250px]"
            />
          )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Button size="sm">Add</Button>
      </div>
    </div>
  );
}
