import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";

const Search = () => {
  return (
    <div className="relative flex items-center w-full md:w-[70%]">
      <input
        type="text"
        placeholder="Digite uma Vaga ou cargo..."
        className="w-full h-12 md:h-14 p-4 pr-24 text-base rounded-lg shadow-sm outline-none border border-gray-300"
        aria-label="Pesquisar vagas"
      />
      <span className="absolute right-2 top-2/4 -translate-y-2/4">
        <NavLink to="/buscarVagas">
          <Button className="flex items-center bg-green-500 hover:bg-green-600 text-white h-10 md:h-12 px-4 rounded-lg">
            <SearchIcon className="mr-2" /> Buscar
          </Button>
        </NavLink>
      </span>
    </div>
  );
};

export default Search;
