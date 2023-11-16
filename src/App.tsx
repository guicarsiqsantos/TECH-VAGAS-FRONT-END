import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard";
import SideBar from "./pages/Admin/Components/SideBar";
import Navbar from "./pages/Admin/Components/NavBar";
import Page404 from "./pages/Page404";

//Components

function App() {
  function Layout() {
    return (
      <div className="flex">
        <SideBar />
        <div className="flex flex-col w-full">
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
          <Route element={<Layout />}>
            <Route path="/adm" element={<Login />} />
            <Route path="/adm/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
