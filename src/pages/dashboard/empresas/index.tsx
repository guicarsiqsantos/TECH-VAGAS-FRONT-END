import { useEffect, useState } from "react";
import { ConcendenteProps, columns } from "./table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Empresas() {
  const [data, setData] = useState<ConcendenteProps[]>([]);

  useEffect(() => {
    (async () => {
      const data: ConcendenteProps[] = await (
        await api.get("/concedente")
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
        <span className="font-bold text-3xl">Empresas cadastradas</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/dashboard/empresas/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Nova Empresa
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
