import { useEffect, useState } from "react";
import { InstituicaoEnsinoProps, columns } from "./table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function InstituicaoEnsino() {
  const [data, setData] = useState<InstituicaoEnsinoProps[]>([]);

  useEffect(() => {
    (async () => {
      const data: InstituicaoEnsinoProps[] = await (
        await api.get("/instituicaoEnsino")
      ).data;

      const includeKeyData = data.map((item, idx) => {
        return { ...item, key: idx };
      });

      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">
          Instituição de Ensino cadastradas
        </span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/dashboard/instituicaoEnsino/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Nova Instituição de Ensino
          </Button>
        </NavLink>
        <Button variant="secondary" className="gap-2">
          <PrinterIcon /> Imprimir
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
