import BarChart from "@/components/ui/BarChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import api from "@/services/api";

import ApartmentIcon from "@mui/icons-material/Apartment";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [totalEmpresas, setTotalEmpresas] = useState(0);
  const [totalVagas, setTotalVagas] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);

  useEffect(() => {
    // Função para buscar a quantidade total de Empresa disponíveis
    const fetchTotalEmpresa = async () => {
      try {
        const response = await api.get("/concedente");
        const totalEmpresa = response.data.length;
        setTotalEmpresas(totalEmpresa);
      } catch (error) {
        console.error("Error fetching total number of vacancies:", error);
      }
    };

    fetchTotalEmpresa();

    // Função para buscar a quantidade total de Usuarios disponíveis
    const fetchTotalUsuarios = async () => {
      try {
        const response = await api.get("/Usuario");
        const totalUsuarios = response.data.length;
        setTotalUsuarios(totalUsuarios);
      } catch (error) {
        console.error("Error fetching total number of vacancies:", error);
      }
    };
    // Função para buscar a quantidade total de Vagas disponíveis
    const fetchTotalVagas = async () => {
      try {
        const response = await api.get("/vagas");
        const totalVagas = response.data.length;
        setTotalVagas(totalVagas);
      } catch (error) {
        console.error("Error fetching total number of vacancies:", error);
      }
    };

    fetchTotalVagas();

    fetchTotalUsuarios();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex gap-3 justify-around">
        <Card className="w-[50%] h-36">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Empresas</CardTitle>
                <CardDescription>Empresas Cadastradas</CardDescription>
              </div>
              <ApartmentIcon />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-lg">{totalEmpresas}</span>
          </CardContent>
        </Card>
        <Card className="w-[50%] h-36">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Usuários</CardTitle>
                <CardDescription>Usuários Cadastradas</CardDescription>
              </div>
              <ApartmentIcon />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-lg">{totalUsuarios}</span>
          </CardContent>
        </Card>
        <Card className="w-[50%] h-36">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Vagas</CardTitle>
                <CardDescription>Vagas Cadastradas</CardDescription>
              </div>
              <ApartmentIcon />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-lg">{totalVagas}</span>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
          <CardContent>
            <p className="p-4 font-semibold">Overview</p>
            <BarChart />
          </CardContent>
          <CardContent className="flex justify-between gap-4">
            {/* {uesrSalesData.map((d, i) => (
              <SalesCard
                key={i}
                email={d.email}
                name={d.name}
                saleAmount={d.saleAmount}
              />
            ))} */}
          </CardContent>

          {/*  */}
        </section>
      </Card>
    </div>
  );
}
