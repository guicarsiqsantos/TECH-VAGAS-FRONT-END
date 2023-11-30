import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ConcendenteProps } from "../../table/columns";
import api from "@/services/api";

export default function PerfilEmpresa() {
  const [empresa, setEmpresa] = useState<ConcendenteProps>();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const data = (await api.get(`/concedente/${id}`)).data;
      setEmpresa(data);
    })();
  }, []);

  return (
    <div>
      <p>{empresa?.cnpj}</p>
      <p>{empresa?.razaoSocial}</p>
      <p>{empresa?.responsavelEstagio}</p>
      <p>{empresa?.localidade}</p>
    </div>
  );
}
