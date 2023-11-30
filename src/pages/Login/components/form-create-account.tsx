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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Badge } from "@/components/ui/badge";
import api from "@/services/api";

export default function FormCreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [credencial, setCredencial] = useState({
    email: "",
    password: "",
  });

  function handleCredencial(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setCredencial({
      ...credencial,
      [event.target.name]: event.target.value,
    });
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await api
        .post("/login", { email: credencial.email, senha: credencial.password })
        .then(() => {
          navigate("/dashboard");
        })
        .finally(() => setIsLoading(false));
    } catch (error) {
      setMessage("Falha ao realizar login");
    }
  }

  return (
    <Tabs defaultValue="authLogin" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="authLogin">Login</TabsTrigger>
        <TabsTrigger value="account">Criar conta</TabsTrigger>
      </TabsList>
      <TabsContent value="authLogin">
        <form onSubmit={handleLogin}>
          <Card className="border-none">
            <CardHeader>
              <CardTitle>Acessar sua conta</CardTitle>
              <CardDescription>
                Acesse sua conta no Tech Vagas da Fatec e descubra oportunidades
                em diferenças áreas!
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
                <Label htmlFor="password">senha</Label>
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
            </CardContent>
            <CardFooter className="flex flex-col gap-5">
              <Button disabled={isLoading} className="w-full">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Entrar
              </Button>
              {message && <Badge variant="outline">⛔ {message}</Badge>}
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
      <TabsContent value="account">
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
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">E-mail</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">Telefone</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="current">Senha</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Confirmar senha</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Criar</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
