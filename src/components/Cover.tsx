import { Button } from "./ui/button";
import imgMemLaptop from "../assets/images/mem_laptop.png";
import Search from "./Search";

export default function Cover() {
  return (
    <div className="flex flex-col md:flex-row justify-between bg-gradient-to-t from-blue-400 to-blue-700 h-[60vh] p-6 md:p-12">
      <div className="flex flex-col w-full md:w-1/2 justify-center items-start md:items-center md:ml-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-left md:text-center">
          Encontre sua Vaga de Estágio
        </h1>

        {/* Campo de Pesquisar Vagas */}
        <Search />

        <div className="flex flex-wrap gap-4 mt-6">
          <Button
            variant="outline"
            className="text-gray-700 border-white hover:text-gray-600 hover:border-gray-300"
          >
            Vagas para Tecnologia
          </Button>
          <Button
            variant="outline"
            className="text-gray-700 border-white hover:text-gray-600 hover:border-gray-300"
          >
            Vagas para Gestão Empresarial
          </Button>
          <Button
            variant="outline"
            className="text-gray-700 border-white hover:text-gray-600 hover:border-gray-300"
          >
            Mais
          </Button>
        </div>
      </div>

      <div className="hidden md:block w-full md:w-1/2">
        <img
          src={imgMemLaptop}
          alt="Pessoa com laptop"
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  );
}
