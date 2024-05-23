import { NavLink } from "react-router-dom";
import imgLogoTechVaga from "../assets/images/logo_white.png";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocationCityIcon from "@mui/icons-material/LocationCity";

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
          </div>
        </div>
      </div>
    </div>
  );
}
