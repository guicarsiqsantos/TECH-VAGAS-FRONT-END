import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard";
import SideBar from "./pages/Admin/Components/SideBar";
import Navbar from "./pages/Admin/Components/NavBar";
import Page404 from "./pages/Page404";
import Vagas from "./pages/Admin/Vagas";
import Empresa from "./pages/Admin/Empresa";

//Components

function App() {
  function Layout() {
    return (
      <div className="flex overflow-hidden">
        <SideBar />
        <div className="flex flex-col w-full h-screen">
          <Navbar />
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/adm" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/adm/dashboard" element={<Dashboard />} />
            <Route path="/adm/vagas" element={<Vagas />} />
            <Route path="/adm/empresa" element={<Empresa />} />
          </Route>
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
