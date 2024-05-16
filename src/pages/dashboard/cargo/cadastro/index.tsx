import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormCadastroCargo from "./form-cad-cargo";
import { CargoProps } from "../table/columns";
import api from "@/services/api";

export default function CadastroCargo() {
  const [cargo, setCargo] = useState<CargoProps>(
    {} as CargoProps
  );
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = (await api.get(`/Cargo/${id}`)).data;
        setCargo(data);
      }
      return;
    })();
  }, []);

  return (
    <div>
      <p className="text-2xl mb-4">Cadastro de cargo</p>

      <FormCadastroCargo data={cargo} />
    </div>
  );
}
