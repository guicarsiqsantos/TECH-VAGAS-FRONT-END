import { useEffect, useState } from "react";
import { VagasProps, columns } from "./table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ConcendenteProps } from "../empresas/table/columns";

export default function Vagas() {
  const [data, setData] = useState<VagasProps[]>([]);

  useEffect(() => {
    (async () => {
      // Obtenha os dados do Concedente
      const dataConcedente: ConcendenteProps[] = await (await api.get("/Concedente")).data;

      // Crie mapas dos tipos de documento e tipos de estágio usando os IDs como chaves
      const concedenteMap = new Map(dataConcedente.map(concedente => [concedente.concedenteId, concedente]));

      const data: VagasProps[] = await (await api.get("/Vagas")).data;

      const dataComDescricao = data.map(vaga => ({
        ...vaga,
        razaoSocial: concedenteMap.get(vaga.concedenteId)?.razaoSocial || 'Descrição não encontrada'
      }));

      const includeKeyData = dataComDescricao.map((item, idx) => {
        return { ...item, key: idx };
      });

      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">Vagas cadastradas</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/dashboard/vagas/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Nova Vaga
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
