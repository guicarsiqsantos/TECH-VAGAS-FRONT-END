import style from "./NavBar.module.css";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";

const Navbar = () => {
  return (
    <div className={style.container}>
      <div className={style.nav}>
        <h1>Dashboard</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input placeholder="Pesquisar" style={{ height: "30px" }} />

        <NotificationsIcon style={{ marginLeft: "20px" }} />

        <Avatar style={{ marginLeft: "20px" }}>
          <AvatarImage src="https://avatars.githubusercontent.com/u/70959791?v=4" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
