import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormCadastroInstituicaoEnsino from "./form-cad-instituicaoEnsino";
import { InstituicaoEnsinoProps } from "../table/columns";
import api from "@/services/api";

export default function CadastroInstituicaoEnsino() {
  const [instituicaoEnsino, setInstituicaoEnsino] =
    useState<InstituicaoEnsinoProps>({} as InstituicaoEnsinoProps);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = (await api.get(`/instituicaoEnsino/${id}`)).data;
        setInstituicaoEnsino(data);
      }
      return;
    })();
  }, []);

  return (
    <div>
      <p className="text-2xl mb-4">Cadastro da Instituição</p>

      <FormCadastroInstituicaoEnsino data={instituicaoEnsino} />
    </div>
  );
}
