import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ConcendenteProps } from "@/pages/dashboard/empresas/table/columns";
import api from "@/services/api";
import { differenceInDays } from "date-fns";
import { Building2, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

interface CardCandidatarProps {
  concedenteId: Number;
  titulo: string;
  dataFinal: Date;
  dataInicio: Date;
}
const calculateBar = (dataInicio: Date, dataLimite: Date) => {
  const totalDays = differenceInDays(dataLimite, dataInicio);
  const daysPassed = differenceInDays(new Date(), dataInicio);
  const progress = (daysPassed / totalDays) * 100;
  return progress;
};

const CardCandidatar = ({
  concedenteId,
  titulo,
  dataFinal,
  dataInicio,
}: CardCandidatarProps) => {
  const [concedente, setConcedente] = useState<ConcendenteProps | null>(null);
  const today = new Date();
  const progress = calculateBar(dataInicio, dataFinal);

  const diferencaDias = differenceInDays(dataFinal, today);

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/Concedente/${concedenteId}`);
      setConcedente(data);
    })();
  }, []);

  return (
    <div className="border border-gray-300 rounded-md p-3">
      <header className="flex justify-between border-b-2 pb-2">
        <Building2 size={25} />
        <Share2 />
      </header>
      <div className="pt-2  ">
        <h2>{titulo}</h2>
        {concedente && (
          <p className="text-xs py-4 text-gray-400">{concedente.razaoSocial}</p>
        )}
        <Button className="w-full bg-blue-500 hover:bg-blue-600">
          Candidatar
        </Button>
      </div>
      <div className="pt-4">
        <p className="text-xs">A vaga encerra em {diferencaDias} dias</p>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default CardCandidatar;
