"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


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

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Pesquisar Empresa..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        <Dialog>
          <DialogTrigger>
            <Button variant="outline" style={{ display: "flex", height: "32px" }}>Cadastrar Empresa</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Empresa</DialogTitle>
              <DialogDescription>Esta tela destina-se ao cadastro de todas as empresas no sistema.</DialogDescription>
            </DialogHeader>
            <label style={{fontWeight:"600"}}>Razão Social</label>
            <Input type="text" id="razaosocial" placeholder="Razão Social"/>
            <label style={{fontWeight:"600"}}>Email</label>
            <Input type="text" id="responsavelEST" placeholder="Responsável Estágio"/>
            <label style={{fontWeight:"600"}}>CNPJ</label>
            <Input type="text" id="CNPJ" placeholder="CNPJ"/>
            <label style={{fontWeight:"600"}}>Localidade</label>
            <Input type="text" id="localidade" placeholder="Localidade"/>
            
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
