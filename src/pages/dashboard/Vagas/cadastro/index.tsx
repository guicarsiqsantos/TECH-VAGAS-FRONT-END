import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormCadastroVagas from "./form-cad-vagas";
import { VagasProps } from "../table/columns";
import api from "@/services/api";

export default function CadastroVagas() {
  const [vagas, setVagas] = useState<VagasProps>({} as VagasProps);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = (await api.get(`/vagas/${id}`)).data;
        setVagas(data);
      }
      return;
    })();
  }, []);

  return (
    <div>
      <p className="text-2xl mb-4">Cadastro de Vagas</p>

      <FormCadastroVagas data={vagas} />
    </div>
  );
}
