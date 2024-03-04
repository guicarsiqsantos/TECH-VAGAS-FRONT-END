import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Page404 from "./pages/404";
import Dashboard from "./pages/dashboard";
import LayoutDashboard from "./layout/LayoutDashboard";
import Empresas from "./pages/dashboard/empresas";
import CadastroEmpresa from "./pages/dashboard/empresas/cadastro";
import PerfilEmpresa from "./pages/dashboard/empresas/cadastro/perfil";
import Vagas from "./pages/dashboard/Vagas";
import CadastroVagas from "./pages/dashboard/Vagas/cadastro";
import InstituicaoEnsino from "./pages/dashboard/InstituicaoEnsino";
import CadastroInstituicaoEnsino from "./pages/dashboard/InstituicaoEnsino/cadastro";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<Page404 />} />
      <Route element={<LayoutDashboard />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/empresas" element={<Empresas />} />
        <Route path="/dashboard/vagas" element={<Vagas />} />
        <Route
          path="/dashboard/instituicaoEnsino"
          element={<InstituicaoEnsino />}
        />
        <Route
          path="/dashboard/empresas/cadastro/:id?"
          element={<CadastroEmpresa />}
        />
        <Route
          path="/dashboard/vagas/cadastro/:id?"
          element={<CadastroVagas />}
        />
        <Route
          path="/dashboard/instituicaoEnsino/cadastro/:id?"
          element={<CadastroInstituicaoEnsino />}
        />
        <Route
          path="/dashboard/empresas/perfil/:id"
          element={<PerfilEmpresa />}
        />
      </Route>
    </Routes>
  );
}
export default App;
