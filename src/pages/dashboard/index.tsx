import BarChart from "@/components/ui/BarChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ApartmentIcon from "@mui/icons-material/Apartment";

export default function Dashboard() {
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
            <span className="text-lg">0</span>
          </CardContent>
        </Card>
        <Card className="w-[50%] h-36">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle>Alunos</CardTitle>
                <CardDescription>Alunos Cadastradas</CardDescription>
              </div>
              <ApartmentIcon />
            </div>
          </CardHeader>
          <CardContent>
            <span className="text-lg">0</span>
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
            <span className="text-lg">0</span>
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
