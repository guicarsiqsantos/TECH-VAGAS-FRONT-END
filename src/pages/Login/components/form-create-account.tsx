import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";
import Grid from "@mui/material/Grid";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { cpfApplyMask, numbersOnly } from "@/lib/utils";
import { useAuth } from "@/Context/AuthContext";

export default function FormCreateAccount() {
  const navigate = useNavigate();
  const { setAuthState } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [credencial, setCredencial] = useState({
    email: "",
    password: "",
  });
  const [account, setAccount] = useState({
    nome: "",
    cpfCnpj: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    userTypeDto: 2,
  });

  function handleCredencial(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.target;
    setCredencial({
      ...credencial,
      [name]: value,
    });
    setAccount({
      ...account,
      [name]: value,
    });
  }

  function checkPasswordsMatch() {
    return account.senha === account.confirmarSenha;
  }

  function handleCpfChange(event: ChangeEvent<HTMLInputElement>) {
    const maskedCpf = cpfApplyMask(event.target.value);
    setAccount({
      ...account,
      cpfCnpj: maskedCpf,
    });
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const auth = await api.post("/Sessao/Autentication", {
        email: credencial.email,
        senha: credencial.password,
      });

      const { status, response } = auth.data;
      localStorage.setItem("authToken", response);
      localStorage.setItem("authStatus", status);

      setAuthState({ isAuthenticated: true, token: response, status });
      navigate("/");
    } catch (error: any) {
      setMessage(
        error.message || "Falha ao realizar login, verifique suas credenciais"
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateAccount(event: FormEvent) {
    event.preventDefault();
    if (!checkPasswordsMatch()) {
      setMessage("As senhas não coincidem");
      return;
    }
    setIsLoading(true);
    try {
      await api.post("/Usuario", {
        nome: account.nome,
        cpfCnpj: numbersOnly(account.cpfCnpj),
        email: account.email,
        senha: account.senha,
        userType: account.userTypeDto,
      });

      toast.success("Conta criada com sucesso.");
      navigate("/login");
    } catch (error) {
      console.log(error);
      setMessage(
        "Falha ao realizar a criação da conta, verifique as credenciais"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Tabs defaultValue="authLogin" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="authLogin">Login</TabsTrigger>
        <TabsTrigger value="createAccount">Criar conta</TabsTrigger>
      </TabsList>
      <TabsContent value="authLogin">
        <form onSubmit={handleLogin}>
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Acessar sua conta</CardTitle>
              <CardDescription>
                Acesse sua conta no Tech Vagas da Fatec e descubra oportunidades
                em diferentes áreas!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="nome@exemplo.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={credencial.email || ""}
                  onChange={(e) => handleCredencial(e)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="password"
                  type="password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={credencial.password || ""}
                  onChange={(e) => handleCredencial(e)}
                  required
                />
              </div>
              {message && <Badge variant="outline">⛔ {message}</Badge>}
            </CardContent>
            <CardFooter>
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Entrar
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>

      <TabsContent value="createAccount">
        <form onSubmit={handleCreateAccount}>
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Criar sua conta</CardTitle>
              <CardDescription className="text-gray-400 font-light">
                Crie sua conta e inicie sua jornada para um futuro profissional
                extraordinário! A tech Vagas, conectando sonhos a Oportunidades.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Nome</Label>
                <Input
                  id="current"
                  name="nome"
                  type="text"
                  placeholder="Nome"
                  value={account.nome}
                  onChange={(e) => handleCredencial(e)}
                />
              </div>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <div className="space-y-1">
                    <Label htmlFor="current">E-mail</Label>
                    <Input
                      id="current"
                      name="email"
                      autoComplete="email"
                      type="email"
                      value={account.email}
                      placeholder="nome@exemplo.com"
                      onChange={(e) => handleCredencial(e)}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="space-y-1">
                    <Label htmlFor="current">CPF</Label>
                    <Input
                      id="current"
                      name="cpfCnpj"
                      type="text"
                      placeholder="CPF"
                      maxLength={11}
                      value={account.cpfCnpj}
                      onChange={handleCpfChange}
                    />
                  </div>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <div className="space-y-1">
                    <Label htmlFor="current">Senha</Label>
                    <Input
                      id="current"
                      name="senha"
                      type="password"
                      placeholder="Senha"
                      value={account.senha}
                      onChange={(e) => handleCredencial(e)}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className="space-y-1">
                    <Label htmlFor="new">Confirmar senha</Label>
                    <Input
                      id="new"
                      name="confirmarSenha"
                      type="password"
                      value={account.confirmarSenha}
                      placeholder="Confirmar senha"
                      onChange={(e) => handleCredencial(e)}
                    />
                  </div>
                </Grid>
              </Grid>
              {message && <Badge variant="outline">⛔ {message}</Badge>}
            </CardContent>
            <CardFooter>
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Criar Conta
              </Button>
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
    </Tabs>
  );
}
