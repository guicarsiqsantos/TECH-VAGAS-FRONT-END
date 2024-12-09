import Header from "@/components/Header";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { VagasProps } from "../dashboard/Vagas/table/columns";
import Search from "@/components/Search";
import { Building2, CheckCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { Grid } from "@mui/material";
import CardCandidatar from "./components/cardCandidatar";
import Footer from "@/components/footer";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const DetailsVagas = () => {
  const [vagas, setVagas] = useState<VagasProps | null>(null);
  const [candidaturaConcluida, setCandidaturaConcluida] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/Vagas/${id}`);
      setVagas(data);
    })();
  }, []);

  const handleGotoMinhasCandidaturas = () => {
    setCandidaturaConcluida(false);
  };

  if (!vagas) {
    return;
  }

  return (
    <div>
      <Header />
      <div className="flex justify-center py-8 bg-gradient-to-tr from-[#73C1E3] to-[#008DC9]">
        <Search />
      </div>
      <div className="px-[15%] pt-8 space-y-2">
        <Grid container>
          <Grid item xs={12} md={8}>
            <div className="flex text-gray-400 items-center space-x-2">
              <Clock size={18} />
              <h1>
                Publicado em{" "}
                {format(new Date(vagas?.dataPublicacao), "dd/MM/yyyy")}
              </h1>
            </div>
            <div className="flex items-center space-x-3 mt-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-200">
                <Building2 size={25} />
              </div>
              <div>
                <h1 className="text-2xl font-normal">{vagas.titulo}</h1>
                <p>Estágio de {vagas.quantidade} vagas</p>
              </div>
            </div>
            <h3 className="flex border-b-2 mt-10 border-green-600 w-[70px]">
              Descrição
            </h3>
            <p className="mt-4 text-justify">{vagas.descricao}</p>
            <h3 className="flex border-b-2 mt-5 border-green-600 w-[50px]">
              Outros
            </h3>
            <div className="flex items-center mt-4">
              <div className="space-y-2">
                <p>Local de trabalho: {vagas.localidadeTrabalho}</p>
                <p>Total de horas semanais: {vagas.totalHorasSemanis} horas</p>
                <p>
                  Horário do trabalho: {vagas.horarioEntrada} ás{" "}
                  {vagas.horarioSaida} horas
                </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="ml-10">
              <CardCandidatar
                concedenteId={vagas.concedenteId}
                vagaId={vagas.vagasId}
                titulo={vagas.titulo}
                dataFinal={new Date(vagas.dataLimite)}
                dataInicio={new Date(vagas.dataPublicacao)}
                concluidaCandidatura={() => setCandidaturaConcluida(true)}
              />
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="flex w-full pt-20">
        <Footer />
      </div>
      <AlertDialog
        open={candidaturaConcluida}
        onOpenChange={handleGotoMinhasCandidaturas}
      >
        <AlertDialogContent>
          <AlertDialogHeader className="space-y-3">
            <AlertDialogTitle className="flex flex-col justify-center items-center">
              <CheckCircle size={60} />
              Candidatura bem sucedida!
            </AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col items-center">
              Você se candidatou-se a uma vaga com sucesso.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {}} className="w-full">
              <NavLink to="/minhasVagas">Ver minhas vagas</NavLink>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DetailsVagas;
