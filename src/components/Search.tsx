import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";

const Search = () => {
  return (
    <div className="relative flex justify-between w-[70%]">
      <input
        type="text"
        placeholder="Digite uma Vaga ou cargo..."
        className="text-base w-[100%] h-[60px] p-4 pr-32 outline-none rounded-lg"
      />
      <span className="absolute right-0">
        <NavLink to={"/buscarVagas"}>
          <Button className="m-1 h-[53px] bg-green-500 hover:bg-green-600">
            {" "}
            <SearchIcon className="mr-1" /> Buscar
          </Button>
        </NavLink>
      </span>
    </div>
  );
};

export default Search;
