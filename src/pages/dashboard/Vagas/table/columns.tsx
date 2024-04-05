import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/services/api";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export type VagasProps = {
  vagasId: number;
  quantidade: string;
  dataPublicacao: string;
  dataLimite: string;
  localidade: string;
  descricao: string;
  titulo: string;
  localidadeTrabalho: string;
  horarioEntrada: string;
  horarioSaida: string;
  totalHorasSemanis: string;
  concedenteId: number;
  key: number;
};

export const columns: ColumnDef<VagasProps>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "dataPublicacao",
    header: "Data da Publicação",
  },
  {
    accessorKey: "concedenteId",
    header: "Empresa",
  },
  {
    accessorKey: "quantidade",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantidade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dataLimite",
    header: "Data limite",
  },
  {
    accessorKey: "localidade",
    header: "Localidade",
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
  },
  {
    id: "actions",
    header: "Ação",
    cell: ({ row, table }) => {
      const meta = table.options.meta;
      const dataRow = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link to={`/dashboard/Vagas/cadastro/${dataRow.vagasId}`}>
              <DropdownMenuItem>📝 Editar</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                toast("Vaga Excluido com Sucesso. ✅");
                meta?.removeRow(dataRow.key);
                await api.delete(`/vagas/${dataRow.vagasId}`);
              }}
            >
              🗑️ delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
