import { useEffect, useState } from "react";
import api from "@/services/api";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { VagasProps } from "@/pages/dashboard/Vagas/table/columns";
import { Card } from "./ui/card";
import { Loader2Icon } from "lucide-react";
import { format } from "date-fns"; // Importa o locale em português do Brasil, se necessário
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";

const Vagas = () => {
  const [data, setData] = useState<VagasProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/vagas");
        const fetchedData: VagasProps[] = response.data;

        // Check if there are fetched data
        if (fetchedData.length > 0) {
          const dataWithKeys = fetchedData.map((item, idx) => ({
            ...item,
            key: idx,
          }));
          setData(dataWithKeys);
        }
        setIsLoading(false); // Data fetching complete
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Error occurred, stop loading
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex gap-2 h-40 justify-center items-center">
          <Loader2Icon className="animate-spin" />
          <p className="text-2xl">Carregando</p>
        </div>
      ) : data.length === 0 ? (
        <div className="flex h-40 justify-center items-center">
          <p className="text-2xl">Nenhuma vaga encontrada</p>
        </div>
      ) : (
        data.map((vaga) => (
          <Card key={vaga.vagasId} className="flex mb-6 p-6 shadow-md">
            <div className="mr-4">
              <ApartmentIcon />
            </div>
            <div className="w-full">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-[#22C964] font-medium">{vaga.titulo}</h1>
                  <p className="pb-3">{`Estágio - ${vaga.quantidade} vagas`}</p>
                </div>
                <NavLink to={`/details/${vaga.vagasId}`}>
                  <Button variant="outline">Detalhes da vaga</Button>
                </NavLink>
              </div>
              <p>{vaga.descricao}</p>
              <div className="flex justify-between mt-4">
                <div className="flex">
                  <LocationOnIcon className="mr-2" />
                  <p>{vaga.localidade}</p>
                </div>
                <div className="flex items-center gap-1">
                  <AccessTimeIcon fontSize="small" />
                  <p>{format(new Date(vaga.dataLimite), "dd/MM/yyyy")}</p>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default Vagas;
