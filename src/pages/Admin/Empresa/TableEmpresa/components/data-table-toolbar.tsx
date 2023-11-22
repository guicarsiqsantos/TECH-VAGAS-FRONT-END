"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CrossIcon } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Pesquisar Empresa..."
          value={
            (table.getColumn("razaoSocial")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("razaoSocial")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("cnpj") && (
          <DataTableFacetedFilter
            column={table.getColumn("cnpj")}
            title="CNPJ"
            options={statuses}
          />
        )}
        {table.getColumn("localidade") && (
          <DataTableFacetedFilter
            column={table.getColumn("localidade")}
            title="Cidade"
            options={priorities}
          />
        )}
        <Dialog open={open} onOpenChange={handleOpen}>
          <DialogTrigger>
            <Button
              onClick={handleOpen}
              variant="outline"
              style={{ display: "flex", height: "32px" }}
            >
              Cadastrar Empresa
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Empresa</DialogTitle>
              <DialogDescription>
                Esta tela destina-se ao cadastro de todas as empresas no
                sistema.
              </DialogDescription>
            </DialogHeader>
            <label style={{ fontWeight: "600" }}>Razão Social</label>
            <Input type="text" id="razaosocial" placeholder="Razão Social" />
            <label style={{ fontWeight: "600" }}>Responsável Estágio</label>
            <Input
              type="text"
              id="responsavelEST"
              placeholder="Responsável Estágio"
            />
            <label style={{ fontWeight: "600" }}>CNPJ</label>
            <Input type="text" id="CNPJ" placeholder="CNPJ" />
            <label style={{ fontWeight: "600" }}>Localidade</label>
            <Input type="text" id="localidade" placeholder="Localidade" />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="outline" onClick={handleOpen}>
                Cancelar
              </Button>
              <Button style={{ backgroundColor: "#82B440" }}>Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <CrossIcon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
