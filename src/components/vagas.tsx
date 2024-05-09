import { useEffect, useState } from "react";
import api from "@/services/api";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { VagasProps } from "@/pages/dashboard/Vagas/table/columns";

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
        <div className="flex h-40 justify-center items-center">
          <p className="text-2xl">loading ...</p>
        </div>
      ) : data.length === 0 ? (
        <div className="flex h-40 justify-center items-center">
          <p className="text-2xl">Nanhuma vaga encontrada</p>
        </div>
      ) : (
        data.map((vaga) => (
          <div key={vaga.vagasId} className="flex mb-16">
            <div className="mr-4">
              <ApartmentIcon />
            </div>
            <div className="w-full">
              <h1 className="text-[#22C964] font-medium">{vaga.titulo}</h1>
              <p className="pb-3">{`Estágio - ${vaga.quantidade} vagas`}</p>
              <p>{vaga.descricao}</p>
              <div className="flex justify-between mt-4">
                <div className="flex">
                  <LocationOnIcon className="mr-2" />
                  <p>{vaga.localidade}</p>
                </div>
                <div className="flex">
                  <AccessTimeIcon />
                  <p>{vaga.dataLimite}</p>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Vagas;
