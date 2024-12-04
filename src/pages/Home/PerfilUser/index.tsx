import Footer from "@/components/footer";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { ShieldAlert } from "lucide-react";
import api from "@/services/api";
import { format } from "date-fns";
import { toast } from "sonner";

const formSchema = z.object({
  alunoId: z.string().optional().nullable(),
  nome: z.string({ required_error: "Nome obrigatorio" }),
  idade: z.number().optional().nullable(),
  rg: z.string({ required_error: "RG obrigatorio" }).min(9),
  statusAluno: z.boolean().default(true),
  numeroMatricula: z.string({ required_error: "Matricula obrigatorio" }),
  areaInteresse: z.string({ required_error: "Area de interesse obrigatorio" }),
  habilidades: z.string({ required_error: "Habilidades obrigatorio" }),
  experiencias: z.string({ required_error: "Experiencias obrigatorio" }),
  disponibilidadeHorario: z.string({
    required_error: "Disponibilidade de horario obrigatorio",
  }),
  curriculo: z.string({ required_error: "Curriculo obrigatorio" }),
  cpf: z.string({ required_error: "CPF obrigatorio" }).min(11),
  cidade: z.string({ required_error: "Cidade obrigatorio" }),
  dataNascimento: z.string({
    required_error: "Data de nascimento obrigatorio",
  }),
  nivelEscolaridade: z.string({
    required_error: "Nivel escolaridade obrigatorio",
  }),
  telefone: z.string({ required_error: "Telefone obrigatorio" }).min(11),
  email: z.string({ required_error: "Email obrigatorio" }).email(),
  endereco: z.string({ required_error: "Endereco obrigatorio" }),
  genero: z.string({ required_error: "Genero obrigatorio" }),
  bairro: z.string({ required_error: "Bairro obrigatorio" }),
  cep: z.string({ required_error: "CEP obrigatorio" }).min(8),
});

type FormAlunoType = z.infer<typeof formSchema>;

export default function PerfilUser() {
  const { authState, setAuthState } = useAuth();
  const user = localStorage.getItem("user");
  const { response, aluno, status } = user ? JSON.parse(user) : null;

  async function onSubmitPerfil(data: FormAlunoType) {
    try {
      authState.aluno
        ? await api.put(`/Aluno/${aluno.alunoId}`, data).then((resp) => {
            localStorage.setItem(
              "user",
              JSON.stringify({
                response: {
                  ...response,
                  nome: resp.data?.nome,
                  email: resp.data?.email,
                  cpfCnpj: resp.data?.cpf,
                },
                status,
                aluno: resp.data,
              })
            );
            setAuthState({ ...authState, aluno: resp.data });
            api.put("/Usuario", {
              usuarioId: response?.usuarioId,
              nome: resp.data?.nome,
              cpfCnpj: resp.data?.cpf,
              email: resp.data?.email,
              senha: response.senha,
              userType: 2,
            });
          })
        : await api.post("/Aluno", data).then((resp) => {
            localStorage.setItem(
              "user",
              JSON.stringify({
                response: {
                  ...response,
                  nome: resp.data?.nome,
                  email: resp.data?.email,
                  cpfCnpj: resp.data?.cpf,
                },
                aluno: resp.data,
                status,
              })
            );
            setAuthState({ ...authState, aluno: resp.data });
            api.put("/Usuario", {
              usuarioId: response?.usuarioId,
              nome: resp.data?.nome,
              cpfCnpj: resp.data?.cpf,
              email: resp.data?.email,
              senha: response.senha,
              userType: 2,
            });
          });
      authState.aluno
        ? toast("Aluno atualizado com sucesso! ✅", {
            description: "Os dados do aluno foram atualizados com sucesso!",
            action: {
              label: "Buscar Vagas",
              onClick: () => navigate("/buscarVagas"),
            },
          })
        : toast("Aluno cadastrado com sucesso! ✅", {
            description:
              "Os dados do aluno foram cadastrados com sucesso, agora vocé pode buscar vagas!",
            action: {
              label: "Buscar Vagas",
              onClick: () => navigate("/buscarVagas"),
            },
          });
    } catch (error) {
      authState.aluno
        ? toast("Erro ao atualizar aluno! ❌", {
            description:
              "Algo deu de errado com a atualizacao do aluno, verifique as informações e tente novamente.",
          })
        : toast("Erro ao cadastrar aluno! ❌", {
            description:
              "Algo deu de errado com o cadastro do aluno, verifique as informações e tente novamente.",
          });
    }
  }

  const navigate = useNavigate();

  const form = useForm<FormAlunoType>({
    resolver: zodResolver(formSchema),
    values: {
      ...aluno,
      alunoId: aluno?.alunoId.toString(),
      dataNascimento: aluno
        ? format(new Date(aluno?.dataNascimento), "yyyy-MM-dd")
        : "",
    },
    defaultValues: {
      alunoId: aluno?.alunoId,
      nome: response?.nome,
      idade: 0,
      rg: "",
      statusAluno: true,
      numeroMatricula: "",
      areaInteresse: "",
      habilidades: "",
      experiencias: "",
      disponibilidadeHorario: "",
      curriculo: "",
      cpf: response?.cpfCnpj,
      cidade: "",
      dataNascimento: "",
      nivelEscolaridade: "",
      telefone: "",
      email: response?.email,
      endereco: "",
      genero: "",
      bairro: "",
      cep: "",
    },
  });

  return (
    <div>
      <Header />

      <Card className="mx-[15%] p-4 my-10">
        <h1 className="text-2xl mb-4">Cadastro de Perfil</h1>
        <Separator className="mb-4" />

        {!authState.aluno && (
          <Alert icon={<ShieldAlert fontSize="inherit" />} severity="error">
            Finalize seu cadastro para candidatar-se a vaga
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitPerfil)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Nome do Aluno</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do responsável" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input placeholder="CPF do aluno" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormField
                  control={form.control}
                  name="rg"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>RG</FormLabel>
                      <FormControl>
                        <Input placeholder="RG do aluno" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormField
                  control={form.control}
                  name="dataNascimento"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>RG</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Data de Nascimento"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="dataNascimento"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Data de Nacimento</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input placeholder="E-mail do aluno" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="Telefone do aluno" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormField
                  control={form.control}
                  name="genero"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Genero</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecionar Genero" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Masculino">
                                Masculino
                              </SelectItem>
                              <SelectItem value="Feminino">Feminino</SelectItem>
                              <SelectItem value="Prefiro não dizer">
                                Prefiro não dizer
                              </SelectItem>
                              <SelectItem value="Outros">Outros</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
            </Grid>

            <h1 className="text-lg my-5">Sobre o Aluno</h1>
            <Separator />

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormField
                  control={form.control}
                  name="numeroMatricula"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Numero da Matricula</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Numero da matricula do aluno"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormField
                  control={form.control}
                  name="disponibilidadeHorario"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Disponibilidade de Horario</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Disponibilidade de Horario do aluno"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormField
                  control={form.control}
                  name="nivelEscolaridade"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Nivel de Escolaridade</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nivel de Escolaridade do aluno"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormField
                  control={form.control}
                  name="curriculo"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Cúrriculo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Anexar cúrriculo do aluno"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormField
                  control={form.control}
                  name="areaInteresse"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Área de interres</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite suas áres de interres"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <FormField
                  control={form.control}
                  name="habilidades"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Habilidade</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite suas habilidades"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <FormField
                  control={form.control}
                  name="experiencias"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Experiência</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite suas experiências"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
            </Grid>

            <h1 className="text-lg my-5">Endereço do Aluno</h1>
            <Separator />

            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <FormField
                  control={form.control}
                  name="endereco"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o endereço do aluno"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormField
                  control={form.control}
                  name="cep"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o CEP do aluno" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormField
                  control={form.control}
                  name="cidade"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o Cidade do aluno"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormField
                  control={form.control}
                  name="bairro"
                  render={({ field }) => (
                    <FormItem className="mt-5">
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o Bairro do aluno"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Grid>
            </Grid>

            <div className="flex mt-5 gap-4">
              <Button type="submit" className="w-[20%]">
                {authState.aluno ? "Salvar Alterações" : "Salvar"}
              </Button>
              <Button
                className="w-[20%]"
                onClick={() => navigate("/")}
                variant="outline"
              >
                Voltar
              </Button>
            </div>
          </form>
        </Form>
      </Card>
      <Footer />
    </div>
  );
}
