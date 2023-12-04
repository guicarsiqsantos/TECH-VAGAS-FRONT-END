import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { VagasProps } from "../table/columns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import api from "@/services/api";
import { useEffect, useState } from "react";
import { ConcendenteProps } from "../../empresas/table/columns";
import { Combobox, ComboboxProps } from "@/components/ComboBox";

const formSchema = z.object({
  quantidade: z.string(),
  dataPublicacao: z.string(),
  dataLimite: z.string(),
  localidade: z
    .string()
    .min(2, { message: "Cidade deve ter no mínimo 2 caracteres." })
    .max(50),
  descricao: z
    .string()
    .max(200, { message: "Limite de 200 caracteres" })
    .optional(),
  titulo: z.string(),
  localidadeTrabalho: z.string(),
  horarioEntrada: z.string(),
  horarioSaida: z.string(),
  totalHorasSemanis: z.string(),
  concedenteId: z.number(),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroVagas = ({ data }: { data: VagasProps }) => {
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [dataComboBox, setDataComboBox] = useState<ComboboxProps[]>([]);

  const [valueComboBox, setValueComboBox] = useState("");

  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      quantidade: data.quantidade,
      dataPublicacao: data.dataPublicacao,
      dataLimite: data.dataLimite,
      localidade: data.localidade,
      descricao: data.descricao,
      titulo: data.titulo,
      localidadeTrabalho: data.localidadeTrabalho,
      horarioEntrada: data.horarioEntrada,
      horarioSaida: data.horarioSaida,
      totalHorasSemanis: data.totalHorasSemanis,
      concedenteId: data.concedenteId,
    },
    defaultValues: {
      quantidade: "",
      dataPublicacao: "",
      dataLimite: "",
      localidade: "",
      descricao: "",
      titulo: "",
      localidadeTrabalho: "",
      horarioEntrada: "",
      horarioSaida: "",
      totalHorasSemanis: "",
      concedenteId: 0,
    },
  });

  useEffect(() => {
    (async () => {
      const concedenteSelecionado = data.concedenteId;
      const checkIsedit = Object.keys(data).length;
      if (checkIsedit > 0) setIsEdit(true);
      if (concedenteSelecionado) {
        setValueComboBox(concedenteSelecionado.toString());
      }

      const resp: ConcendenteProps[] = (await api.get("concedente")).data;

      setDataComboBox(
        resp.map((item) => {
          return {
            value: item.concedenteId.toString(),
            label: item.razaoSocial,
          };
        })
      );
    })();
  }, [data]);

  async function onSubmit(values: FormCadastroProps) {
    const dataVagas = { ...values, concedenteId: Number(valueComboBox) };
    isEdit
      ? await api
          .put(`/vagas/${data.vagasId}`, {
            ...dataVagas,
            vagasId: data.vagasId,
          })
          .finally(() => navigate("/dashboard/vagas"))
      : await api
          .post("/vagas", dataVagas)
          .finally(() => navigate("/dashboard/vagas"));
  }
  return (
    <Card className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid grid-cols-2 gap-x-7">
            <FormField
              control={form.control}
              name="concedenteId"
              render={({ field }) => (
                <FormItem className="mt-5 flex flex-col">
                  <FormLabel>Codigo da Empresa</FormLabel>
                  <FormControl>
                    <Combobox
                      data={dataComboBox}
                      value={valueComboBox}
                      setValue={setValueComboBox}
                    />

                    {/* <Input
                      placeholder="Codigo da Empresa"
                      {...field}
                      onChange={(event) =>
                        field.onChange(Number(event.target.value))
                      }
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantidade"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Quantidade de Vagas</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Quantidade de Vagas"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataPublicacao"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Data da publicação</FormLabel>
                  <FormControl>
                    <Input placeholder="Data da publicação" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dataLimite"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Data limite</FormLabel>
                  <FormControl>
                    <Input placeholder="Data limite" {...field} />
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
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição da Vaga" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Titulo da Vaga</FormLabel>
                  <FormControl>
                    <Input placeholder="Titulo da Vaga" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="localidadeTrabalho"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Localidade do trabalho</FormLabel>
                  <FormControl>
                    <Input placeholder="Localidade do trabalho" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="horarioEntrada"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Horario de Entrada</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="Horario de Entrada"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="horarioSaida"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Horario de Saida</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      placeholder="Horario de Saida"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalHorasSemanis"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Total horas Semanais</FormLabel>
                  <FormControl>
                    <Input placeholder="Total horas Semanais" {...field} />
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
              onClick={() => navigate("/dashboard/vagas")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormCadastroVagas;
