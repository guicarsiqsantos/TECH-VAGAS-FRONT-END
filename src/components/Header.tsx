import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import Image from "../assets/images/logo_techvagas.png";
import { useAuth } from "@/Context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
  const { authState, logout, getUser } = useAuth();
  const { isAuthenticated } = authState;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex items-center justify-between shadow-lg p-2 md:px-[10%] bg-white">
      <NavLink to="/">
        <img src={Image} alt="logo" className="w-32 h-auto md:w-40" />
      </NavLink>

      <nav className="flex items-center gap-4 md:gap-6">
        <Button asChild variant="ghost" className="text-sm md:text-base">
          <NavLink to="/buscarVagas">Buscar Vagas</NavLink>
        </Button>
        <Button asChild variant="ghost" className="text-sm md:text-base">
          <NavLink to="/">Para Empresa</NavLink>
        </Button>
      </nav>

      <div className="flex gap-2 md:gap-4 items-center">
        {isAuthenticated ? (
          <div className="flex items-center space-x-3">
            <h2 className="text-gray-700 text-xs md:text-sm font-semibold">
              {getUser()?.response?.nome.split(" ")[0] +
                " " +
                getUser()?.response?.nome.split(" ")[1]}
            </h2>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Perfil</DropdownMenuItem>
                  <DropdownMenuItem>Configuração</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <NavLink to="/">
                  <DropdownMenuItem
                    className="font-semibold"
                    onClick={handleLogout}
                  >
                    Log out
                  </DropdownMenuItem>
                </NavLink>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <>
            <Button
              asChild
              className="bg-blue-500 w-[120px] md:w-[150px] text-sm md:text-base"
            >
              <NavLink to="/login">Entrar</NavLink>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-[120px] md:w-[150px] text-sm md:text-base"
            >
              <NavLink to="/login">Cadastrar</NavLink>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
