import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";

import { useState } from "react";

interface FormsEmpresaProps {
  handleOpen: () => void;
}

const FormsEmpresa = ({ handleOpen }: FormsEmpresaProps) => {
  const [razaoSocial, setRazaoSocial] = useState("");
  const [responsavelEstagio, setResponsavelEstagio] = useState("");
  const [CNPJ, setCNPJ] = useState("");
  const [localidade, setLocalidade] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const data = {
      razaoSocial,
      responsavelEstagio,
      cnpj: CNPJ,
      localidade,
    };

    await api
      .post("/Concedente", data)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => console.log(error.message));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label style={{ fontWeight: "600" }}>Razão Social</label>
      <Input
        type="text"
        id="razaosocial"
        placeholder="Razão Social"
        onChange={(e) => setRazaoSocial(e.target.value)}
        value={razaoSocial}
      />
      <label style={{ fontWeight: "600" }}>Responsável Estágio</label>
      <Input
        type="text"
        id="responsavelEST"
        placeholder="Responsável Estágio"
        onChange={(e) => setResponsavelEstagio(e.target.value)}
        value={responsavelEstagio}
      />
      <label style={{ fontWeight: "600" }}>CNPJ</label>
      <Input
        type="text"
        id="CNPJ"
        placeholder="CNPJ"
        onChange={(e) => setCNPJ(e.target.value)}
        value={CNPJ}
      />
      <label style={{ fontWeight: "600" }}>Localidade</label>
      <Input
        type="text"
        id="localidade"
        placeholder="Localidade"
        onChange={(e) => setLocalidade(e.target.value)}
        value={localidade}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <Button variant="outline" onClick={handleOpen}>
          Cancelar
        </Button>
        <Button type="submit" style={{ backgroundColor: "#82B440" }}>
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default FormsEmpresa;
