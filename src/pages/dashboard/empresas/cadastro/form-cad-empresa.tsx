import { useNavigate } from "react-router-dom";
import { useState } from "react";
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
import { ConcendenteProps } from "../table/columns";

const formSchema = z.object({
  razaoSocial: z.string(),
  responsavelEstagio: z.string(),
  cnpj: z.string().min(14, { message: "O CNPJ deve ter 14 digitos" }).max(14),
  localidade: z
    .string()
    .min(2, { message: "Cidade deve ter no mínimo 2 caracteres." })
    .max(50),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroEmpresa = ({ data }: { data: ConcendenteProps }) => {
  const navigate = useNavigate();
  const isEdit = Object.keys(data).length === 0; // true or false
  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      razaoSocial: data.razaoSocial,
      responsavelEstagio: data.responsavelEstagio,
      cnpj: data.cnpj,
      localidade: data.localidade,
    },
    defaultValues: {
      razaoSocial: "",
      responsavelEstagio: "",
      cnpj: "",
      localidade: "",
    },
  });

  const [cnpjMask, setCnpjMask] = useState('');

  function formatCNPJ(cnpjMask:string) {
    // Remove caracteres não numéricos do CNPJ
    cnpjMask = cnpjMask.replace(/\D/g, '');

    // Aplica a máscara
    cnpjMask = cnpjMask.replace(/^(\d{2})(\d)/, '$1.$2');
    cnpjMask = cnpjMask.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    cnpjMask = cnpjMask.replace(/\.(\d{3})(\d)/, '.$1/$2');
    cnpjMask = cnpjMask.replace(/(\d{4})(\d)/, '$1-$2');

    return cnpjMask;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputCnpj = event.target.value;
    const formattedCnpj = formatCNPJ(inputCnpj);
    setCnpjMask(formattedCnpj);
  }

  async function onSubmit(values: FormCadastroProps) {
    isEdit
      ? await api
          .post("/concedente", values)
          .finally(() => navigate("/dashboard/empresas"))
      : await api
          .put(`/concedente/${data.concedenteId}`, {
            ...values,
            concedenteId: data.concedenteId,
          })
          .finally(() => navigate("/dashboard/empresas"));
  }
  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent>
            <FormField
              control={form.control}
              name="razaoSocial"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Razão Social</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da Empresa" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="responsavelEstagio"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Responsável</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do responsável" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input maxLength={18} placeholder="00.000.000.000-00" {...field} value={cnpjMask} onChange={handleChange} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="localidade"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Localidade</FormLabel>
                  <FormControl>
                    <Input placeholder="Qual a cidadde" {...field} />
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
              onClick={() => navigate("/dashboard/empresas")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormCadastroEmpresa;
