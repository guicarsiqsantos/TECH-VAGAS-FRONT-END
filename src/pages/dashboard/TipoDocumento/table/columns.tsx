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

export type TipoDocumentoProps = {
    idTipoDocumento: number;
    descricaoTipoDocumento: string;
    status: boolean;
    key: number;
};

export const columns: ColumnDef<TipoDocumentoProps>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "idTipoDocumento",
        header: "Código do tipo documento",
    },
    {
        accessorKey: "descricaoTipoDocumento",
        header: "Descrição do tipo documento",
    },
    {
        accessorKey: "status",
        header: "Status da descrição do tipo documento",
        cell: ({ row }) => (row.original.status ? "Ativo" : "Inativo"),
    },
    {
        accessorKey: "descricaoTipoDocumento",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Descrição Tipo Documento
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
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
                        <Link to={`/dashboard/tipodocumento/cadastro/${dataRow.idTipoDocumento}`}>
                            <DropdownMenuItem>📝 Editar</DropdownMenuItem>
                        </Link>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={async () => {
                                meta?.removeRow(dataRow.key);
                                await api.delete(`/TipoDocumento/${dataRow.idTipoDocumento}`);
                            }}
                        >
                            🗑️ Delete
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={async () => {
                                try {
                                    await api.put(`/TipoDocumento/${dataRow.idTipoDocumento}/Ativar`, { status: true });
                                    location.reload()
                                } catch (error) {
                                    console.error("Erro ao ativar o documento:", error);
                                }
                            }}
                        >
                            🔄 Ativar
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                            onClick={async () => {
                                try {
                                    await api.put(`/TipoDocumento/${dataRow.idTipoDocumento}/Desativar`, { status: false });
                                    location.reload()
                                } catch (error) {
                                    console.error("Erro ao desativar o documento:", error);
                                }
                            }}
                        >
                            🛑 Desativar
                        </DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];