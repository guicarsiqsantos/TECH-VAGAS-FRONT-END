import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormCadastroMatricula from "./form-cad-matricula"; 
import { MatriculaProps } from "../table/columns"; 
import api from "@/services/api";

export default function CadastroMatricula() { 
  const [matricula, setMatricula] = useState<MatriculaProps>(
    {} as MatriculaProps
  );
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      if (id) {
        const data = (await api.get(`/matricula/${id}`)).data;
        setMatricula(data);
      }
      return;
    })();
  }, []);

  return (
    <div>
      <p className="text-2xl mb-4">Cadastro de matrícula</p> {}

      <FormCadastroMatricula data={matricula} /> {}
    </div>
  );
}
