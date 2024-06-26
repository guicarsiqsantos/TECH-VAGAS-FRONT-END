import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { format } from "date-fns";

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
  razaoSocial: string;
  cargoId: number;
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
    cell: ({ row }) => {
      const date = new Date(row.original.dataPublicacao);
      return format(date, "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "razaoSocial",
    header: "Empresa",
  },
  {
    accessorKey: "quantidade",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-center w-full"
        >
          Quantidade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center w-full">{row.original.quantidade}</div>
    ),
  },
  {
    accessorKey: "dataLimite",
    header: "Data limite",
    cell: ({ row }) => {
      const date = new Date(row.original.dataLimite);
      return format(date, "dd/MM/yyyy");
    },
  },
  {
    accessorKey: "localidade",
    header: "Localidade",
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: ({ row }) => {
      const descricao = row.original.descricao;
      const truncatedDescricao =
        descricao.length > 150
          ? descricao.substring(0, 150) + "..."
          : descricao;
      return truncatedDescricao;
    },
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start font-normal p-2"
                >
                  🗑️ delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90%]">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {`Deseja mesmo excluir esta vaga?`}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Uma vez cancelada, não será possível reverter essa ação
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="w-full">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={async () => {
                      toast("Vaga Excluída com Sucesso. ✅");
                      meta?.removeRow(dataRow.key);
                      await api.delete(`/vagas/${dataRow.vagasId}`);
                    }}
                  >
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
