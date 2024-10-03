import { useEffect, useState } from "react";
import { CargoProps, columns } from "./table/columns";
import { DataTable } from "../../../components/data-table";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, PrinterIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Cargos() {
  const [data, setData] = useState<CargoProps[]>([]);

  useEffect(() => {
    (async () => {
      const data: CargoProps[] = await (await api.get("/cargo")).data;

      const includeKeyData = data.map((item, idx) => {
        return { ...item, key: idx };
      });

      setData(includeKeyData);
    })();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <span className="font-bold text-3xl">Cargos cadastrados</span>
      </div>
      <div className="flex gap-2">
        <NavLink to="/dashboard/cargo/cadastro">
          <Button variant="secondary" className="gap-2">
            <PlusCircleIcon /> Novo Cargo
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
