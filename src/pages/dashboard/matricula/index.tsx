import { useEffect, useState } from "react";
import { MatriculaProps, columns } from "./table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Matriculas() {
  const [data, setData] = useState<MatriculaProps[]>([]);

  useEffect(() => {
    (async () => {
      const data: MatriculaProps[] = await (await api.get("/matricula")).data;

      const includeKeyData = data.map((item, idx) => {
        return { ...item, MatriculaId: idx };
      });

      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">Matrículas cadastradas</span> {}
      </div>
      <div className="flex gap-2">
        <NavLink to="/dashboard/matriculas/cadastro">
          {" "}
          {}
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Nova Matrícula
          </Button>
        </NavLink>
        <Button variant="secondary" className="gap-2">
          <PrinterIcon /> Imprimir
        </Button>
      </div>
      <DataTable columns={columns} data={data} /> {}
    </div>
  );
}
