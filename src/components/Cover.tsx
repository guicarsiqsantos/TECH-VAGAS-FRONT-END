import { Button } from "./ui/button";
import imgMemLaptop from "../assets/images/mem_laptop.png";
import Search from "./Search";

export default function Cover() {
  return (
    <div className="flex justify-between bg-gradient-to-t from-[#73C1E3] to-[#008DC9]  h-[50vh]">
      <div className="flex flex-col w-[52%] justify-center items-center ml-[5%] max-md:w-full max-md:ml-1">
        <h1 className="w-[70%] mb-4 text-[40px] font-bold text-white">
          Encontre sua Vaga de estágio
        </h1>

        {/* Campo de Pesquisar Vagas */}
        <Search />

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
      <div className="mr-[20vh] max-[1300px]:hidden">
        <img src={imgMemLaptop} alt="home" className="w-full h-full object-fill" height={0} width={0} />
      </div>
    </div>
  );
}
