import Image from "../../Image/logo_techvagas.png";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <div className="flex items-center justify-around shadow p-2">
      <img src={Image} alt="logo" style={{ width: "140px", height: "60px" }} />

      <div className="flex items-center gap-6">
        <Button asChild variant="ghost">
          <NavLink to={"/"}>Buscar Vagas</NavLink>
        </Button>
        <Button asChild variant="ghost">
          <NavLink to={"/"}>Para Empresa</NavLink>
        </Button>

        <div className="flex gap-4">
          <Button asChild className="bg-blue-500 w-[150px]">
            <NavLink to={"/"}>Entrar</NavLink>
          </Button>
          <Button asChild variant="outline" className="w-[150px]">
            <NavLink to={"/"}>Cadastrar</NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
