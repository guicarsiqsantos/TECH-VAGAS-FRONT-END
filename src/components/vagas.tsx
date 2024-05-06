import { useEffect, useState } from "react";
import api from "@/services/api";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { VagasProps } from "@/pages/dashboard/Vagas/table/columns";

const Vagas = () => {
  const [data, setData] = useState<VagasProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/vagas");
        const fetchedData: VagasProps[] = response.data;

        // Add 'key' property to each item for rendering purposes
        const dataWithKeys = fetchedData.map((item, idx) => ({
          ...item,
          key: idx,
        }));

        setData(dataWithKeys);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data.map((vaga) => (
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
      ))}
    </div>
  );
};

export default Vagas;
