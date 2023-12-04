import Sidebar from "@/components/Sidebar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { HomeIcon } from "lucide-react";

export default function LayoutDashboard() {
  const location = useLocation();
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <div className="flex items-center gap-3 mb-4 border-b pb-4">
          <NavLink to="/dashboard">
            <HomeIcon />
          </NavLink>
          <span className="text-sm">{location.pathname}</span>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
