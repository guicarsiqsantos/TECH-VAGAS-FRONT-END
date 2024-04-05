import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { phoneApplyMask, numbersOnly } from "@/lib/utils";
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
import { toast } from "sonner";

const formSchema = z.object({
  nomeInstituicao: z.string().min(2, {
    message: "Nome da Instituição de Ensino deve ter no mínimo 2 caracteres",
  }),
  local: z
    .string()
    .min(2, { message: "Localização deve ter no mínimo 2 caracteres" }),
  telefone: z.string().min(14, { message: "O telefone deve ter 9 digitos" }),
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
      telefone: phoneApplyMask(data.telefone),
    },
    defaultValues: {
      nomeInstituicao: "",
      local: "",
      telefone: "",
    },
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputPhone = event.target.value;
    const formattedPhone = phoneApplyMask(inputPhone);
    form.setValue("telefone", formattedPhone);
  }

  async function onSubmit(values: FormCadastroProps) {
    try {
      isEdit
        ? await api
            .post("/InstituicaoEnsino", {
              ...values,
              telefone: numbersOnly(values.telefone),
            })
            .finally(() => navigate("/dashboard/InstituicaoEnsino"))
        : await api
            .put(`/InstituicaoEnsino/${data.id}`, {
              ...values,
              id: data.id,
            })
            .finally(() => navigate("/dashboard/InstituicaoEnsino"));
      isEdit
        ? toast("Instituição de Ensino Cadastrada com Sucesso. ✅")
        : toast("Instituição de Ensino Alterada com Sucesso. ✅");
    } catch (error: any) {
      isEdit
        ? toast("OPS, algo deu errado ao cadastrar a instituição de Ensino. ❌")
        : toast("OPS, algo deu errado ao alterar a instituição de Ensino. ❌");
      console.log(error.message);
    }
    console.log(values);
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
                    <Input
                      placeholder="Telefone"
                      maxLength={14}
                      {...field}
                      onChange={handleChange}
                    />
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
