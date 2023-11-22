import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

import { labels } from "../data/data";
import { empresasProps } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<empresasProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    accessorKey: "concedenteId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">{row.getValue("concedenteId")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "razaoSocial",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Empresa" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.razaoSocial
      );

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("razaoSocial")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "cnpj",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CNPJ" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.cnpj);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.value}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("cnpj")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "localidade",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cidade" />
    ),
    cell: ({ row }) => {
      const label = labels.find(
        (label) => label.value === row.original.localidade
      );

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.value}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("localidade")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
