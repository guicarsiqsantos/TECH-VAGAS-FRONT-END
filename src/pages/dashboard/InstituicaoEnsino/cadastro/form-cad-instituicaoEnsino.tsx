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
  localInstituicao: z
    .string()
    .min(2, { message: "Localização deve ter no mínimo 2 caracteres" }),
  telefoneInstituicao: z
    .string()
    .min(14, { message: "O telefone deve ter 9 digitos" }),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroInstituicaoEnsino = ({
  data,
}: {
  data: InstituicaoEnsinoProps;
}) => {
  const navigate = useNavigate();
  const isEdit = Object.keys(data).length !== 0; // true if editing, false if creating
  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomeInstituicao: data?.nomeInstituicao || "",
      localInstituicao: data?.localInstituicao || "",
      telefoneInstituicao: phoneApplyMask(data?.telefoneInstituicao || ""),
    },
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputPhone = event.target.value;
    const formattedPhone = phoneApplyMask(inputPhone);
    form.setValue("telefoneInstituicao", formattedPhone);
  }

  async function onSubmit(values: FormCadastroProps) {
    try {
      if (isEdit) {
        await api.put(`/InstituicaoEnsino/${data.idInstituicaoEnsino}`, {
          ...values,
          telefone: numbersOnly(values.telefoneInstituicao),
          id: data.idInstituicaoEnsino,
        });
        toast("Instituição de Ensino Alterada com Sucesso. ✅");
      } else {
        await api.post("/InstituicaoEnsino", {
          ...values,
          telefone: numbersOnly(values.telefoneInstituicao),
        });
        toast("Instituição de Ensino Cadastrada com Sucesso. ✅");
      }
      navigate("/dashboard/InstituicaoEnsino");
    } catch (error: any) {
      if (isEdit) {
        toast("OPS, algo deu errado ao alterar a instituição de Ensino. ❌");
      } else {
        toast("OPS, algo deu errado ao cadastrar a instituição de Ensino. ❌");
      }
      console.log(error.message);
    }
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
              name="localInstituicao"
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
              name="telefoneInstituicao"
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
              {isEdit ? "Salvar alterações" : "Cadastrar"}
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
