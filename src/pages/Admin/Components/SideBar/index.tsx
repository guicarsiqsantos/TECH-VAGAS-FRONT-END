import style from "./SideBar.module.css";
import LogoImg from "../../../../Image/Logo.png";
import { NavLink } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ApartmentIcon from "@mui/icons-material/Apartment";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const SideBar = () => {
  return (
    <nav className={style.container}>
      <div className={style.image}>
        <img src={LogoImg} alt="Logo" />
      </div>
      <hr style={{ margin: "20px 0px", borderColor: "#C7C7C7" }} />
      <ul className={style.sidebar}>
        <li className={style.navHeader}>
          <span>Geral</span>
        </li>
        <li>
          <NavLink to="/dashboard">
            <DashboardIcon
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/Vagas">
            <AssignmentIcon
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            <span>Vagas</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/Empresa">
            <ApartmentIcon
              style={{ marginRight: "8px", width: "18px", height: "18px" }}
            />
            <span>Empresa</span>
          </NavLink>
        </li>
        <li>
          <SupervisorAccountIcon
            style={{ marginRight: "8px", width: "18px", height: "18px" }}
          />
          <span>Adiministrador</span>
        </li>
        <li>
          <ManageAccountsIcon
            style={{ marginRight: "8px", width: "18px", height: "18px" }}
          />
          <span>Coordenador</span>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
