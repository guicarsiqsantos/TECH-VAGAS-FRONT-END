import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import Image from "../assets/images/logo_techvagas.png";

export default function Header() {
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
            <NavLink to={"/login"}>Entrar</NavLink>
          </Button>
          <Button asChild variant="outline" className="w-[150px]">
            <NavLink to={"/login"}>Cadastrar</NavLink>
          </Button>
        </div>
      </div>
    </div>
  );
}
