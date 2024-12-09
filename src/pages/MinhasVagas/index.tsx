import { useEffect, useState } from "react";
import Footer from "@/components/footer";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/Context/AuthContext";
import api from "@/services/api";
import { Chip, Button } from "@mui/material";

const StatusVaga = {
  1: "Em Analise",
  2: "Esperando Avaliação",
  3: "Entrevista Agendada",
  4: "Concluído",
  5: "Recusado",
};

export default function MinhasVagas() {
  const [minhasVagas, setMinhasVagas] = useState<any[]>([]);
  const { authState } = useAuth();
  const { aluno } = authState;

  useEffect(() => {
    (async () => {
      const vagas = (await api.get(`/Candidato/${aluno?.alunoId}`)).data;

      const vagasWithDetail = await Promise.all(
        vagas.map(async (vaga: any) => {
          return {
            ...vaga,
            detail: (await api.get(`/Vagas/${vaga.vagaId}`)).data,
          };
        })
      );

      setMinhasVagas(vagasWithDetail);
    })();
  }, [aluno?.alunoId]);

  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col p-10 bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-700 mb-6">Minhas Vagas</h1>
        {minhasVagas.length > 0 ? (
          minhasVagas.map((vaga) => (
            <Card
              key={vaga.vagaId}
              className="flex flex-col p-6 mb-4 shadow-lg border border-gray-300 bg-white rounded-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <Chip
                  variant="outlined"
                  color="success"
                  label={StatusVaga[vaga.statusVaga as keyof typeof StatusVaga]}
                />
              </div>
              <div className="flex flex-col space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {vaga.detail.titulo}
                </h2>
                <p className="text-gray-600">{vaga.detail.descricao}</p>
              </div>
              <div className="mt-4 flex space-x-4">
                <Button variant="contained" color="primary">
                  Ver Detalhes
                </Button>
                <Button variant="outlined" color="error">
                  Cancelar Candidatura
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl text-gray-500">
              Você ainda não aplicou para nenhuma vaga. Explore oportunidades e
              comece agora!
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
