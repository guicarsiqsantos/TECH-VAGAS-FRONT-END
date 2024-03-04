import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { InstituicaoEnsinoProps } from "../table/columns";

const formSchema = z.object({
  nomeInstituicao: z.string(),
  local: z.string(),
  telefone: z
    .string()
    .min(9, { message: "O telefone deve ter 9 digitos" })
    .max(14),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroInstituicaoEnsino = ({
  data,
}: {
  data: InstituicaoEnsinoProps;
}) => {
  const navigate = useNavigate();
  const isEdit = Object.keys(data).length === 0; // true or false
  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      nomeInstituicao: data.nomeInstituicao,
      local: data.local,
      telefone: data.telefone,
    },
    defaultValues: {
      nomeInstituicao: "",
      local: "",
      telefone: "",
    },
  });

  async function onSubmit(values: FormCadastroProps) {
    isEdit
      ? await api
          .post("/InstituicaoEnsino", values)
          .finally(() => navigate("/dashboard/InstituicaoEnsino"))
      : await api
          .put(`/InstituicaoEnsino/${data.Id}`, {
            ...values,
            Id: data.Id,
          })
          .finally(() => navigate("/dashboard/InstituicaoEnsino"));
  }
  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              control={form.control}
              name="nomeInstituicao"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Nome da Instituição</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da Instituição" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="local"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Localização</FormLabel>
                  <FormControl>
                    <Input placeholder="Localização" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Telefone" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex gap-4">
            <Button type="submit">
              {isEdit ? "Cadastrar" : "Salvar alterações"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/dashboard/instituicaoEnsino")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormCadastroInstituicaoEnsino;
