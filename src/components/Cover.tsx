import { Button } from "./ui/button";
import imgMemLaptop from "../assets/images/mem_laptop.png";
import { SearchIcon } from "lucide-react";

export default function Cover() {
  return (
    <div className="flex justify-between bg-gradient-to-t from-[#73C1E3] to-[#008DC9]  h-[50vh]">
      <div className="flex flex-col w-[52%] justify-center items-center ml-[10%] max-md:w-full max-md:ml-1">
        <h1 className="w-[70%] mb-4 text-[40px] font-bold text-white">
          Encontre sua Vaga de estágio
        </h1>
        <div className="relative flex justify-between w-[70%]">
          <input
            type="text"
            placeholder="Digite uma Vaga ou cargo..."
            className="text-base w-[100%] h-[60px] p-4 pr-32 outline-none rounded-lg"
          />
          <span className="absolute right-0">
            <Button className="m-1 h-[53px] bg-green-500 hover:bg-green-600">
              {" "}
              <SearchIcon className="mr-1" /> Buscar
            </Button>
          </span>
        </div>
        <div className=" flex w-[70%] mt-7">
          <Button
            variant={"outline"}
            className="bg-[] text-white text-lg font-normal rounded-sm mr-3 hover:text-[#3F3F3F]"
          >
            Vagas para Tecnologia
          </Button>
          <Button
            variant={"outline"}
            className="bg-[] text-white text-lg font-normal rounded-sm  mr-3 hover:text-[#3F3F3F]"
          >
            Vagas para Gestão Empresarial
          </Button>
          <Button
            variant={"outline"}
            className="bg-[] text-white text-lg font-normal rounded-sm  mr-3 hover:text-[#3F3F3F]"
          >
            Mais
          </Button>
        </div>
      </div>
      <div className="mr-[10%] max-md:hidden">
        <img src={imgMemLaptop} alt="home" className="h-full" />
      </div>
    </div>
  );
}
