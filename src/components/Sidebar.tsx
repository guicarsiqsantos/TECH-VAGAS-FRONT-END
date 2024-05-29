import { Link, NavLink } from "react-router-dom";
import imgLogoTechVaga from "../assets/images/logo_white.png";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Sidebar() {
  return (
    <div className={cn("pb-12 w-[250px] shadow bg-[#1a1a1a]")}>
      <div className="flex-1 space-y-4 py-4">
        <div className="px-3 py-2 ">
          <NavLink to="/">
            <img
              className="mb-2 px-4 text-lg font-semibold tracking-tigh"
              src={imgLogoTechVaga}
              alt="tech vagas"
            />
          </NavLink>
        </div>
        <div className="px-3 py-2 text-white">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
          <div className="space-y-1">
            <NavLink to="/">
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M21 15V6" />
                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path d="M12 12H3" />
                  <path d="M16 6H3" />
                  <path d="M12 18H3" />
                </svg>
                Home
              </Button>
            </NavLink>
            <NavLink to="/dashboard">
              <Button variant="ghost" className="w-full justify-start mt-1">
                <DashboardIcon style={{ width: "15px", marginRight: "9px" }} />
                Dashboard
              </Button>
            </NavLink>

            <NavLink to="/dashboard/empresas">
              <Button variant="ghost" className="w-full justify-start mt-1">
                <ApartmentIcon style={{ width: "15px", marginRight: "9px" }} />
                Empresas
              </Button>
            </NavLink>

            <NavLink to="/dashboard/vagas">
              <Button variant="ghost" className="w-full justify-start mt-1">
                <AssignmentIcon style={{ width: "15px", marginRight: "9px" }} />
                Vagas
              </Button>
            </NavLink>

            <NavLink to="/dashboard/instituicaoEnsino">
              <Button variant="ghost" className="w-full justify-start mt-1">
                <LocationCityIcon
                  style={{ width: "15px", marginRight: "9px" }}
                />
                Instituição de Ensino
              </Button>
            </NavLink>
            <NavLink to="/dashboard/cargo">
              <Button variant="ghost" className="w-full justify-start mt-1">
                <LocationCityIcon
                  style={{ width: "15px", marginRight: "9px" }}
                />
                Cargo
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between absolute bottom-0 w-[250px]  border-t border-solid px-3 py-2">
        <div className="flex gap-2 items-center ">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-white text-sm">Guilherme Carvalho</h2>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="hover:bg-[#1a1a1a]"
                size="icon"
              >
                <SettingsIcon className="text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Perfil
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Configuração
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link to={"/"}>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
