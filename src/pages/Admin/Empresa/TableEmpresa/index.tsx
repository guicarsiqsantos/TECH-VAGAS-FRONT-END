import { useEffect, useState } from "react";
// import { promises as fs } from "fs";
// import path from "path";

// import { z } from "zod";

import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { empresasProps } from "./data/schema";

// import dataTasks from "./data/tasks.json";
import api from "@/services/api";

export default function TaskPage() {
  const [empresas, setEmpresas] = useState<empresasProps[]>([]);

  useEffect(() => {
    (async () => {
      const empresaData = (await api.get<empresasProps[]>("/Concedente")).data;
      setEmpresas(empresaData);
    })();
  }, []);
  console.log(empresas);
  return (
    <>
      <div className="hidden flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Bem vindo!</h2>
            <p className="text-muted-foreground">
              Aqui temos todas as empresas cadastrada no sistema!
            </p>
          </div>
        </div>
        <DataTable data={empresas} columns={columns} />
      </div>
    </>
  );
}
