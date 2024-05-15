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
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CargoProps } from "../table/columns";
import { cnpjApplyMask, numbersOnly } from "@/lib/utils";

const formSchema = z.object({
    Descricao: z
    .string()
    .min(2, { message: "Descrção deve ter no mínino 2 caracteres" })
    .max(50),
    Tipo: z
    .string()
    .min(2, {
      message: "Tipo deve ter no mínino 2 caracteres",
    })
    .max(50)
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroCargo = ({ data }: { data: CargoProps }) => {
  const navigate = useNavigate();
  const isEdit = Object.keys(data).length === 0; // true or false
  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    values: {
      Descricao: data.Descricao,
      Tipo: data.Tipo,
    },
    defaultValues: {
        Descricao: "",
        Tipo: "",
    },
  });

  async function onSubmit(values: FormCadastroProps) {
    try {
      isEdit
        ? await api
            .post("/cargo", { ...values})
            .finally(() => navigate("/dashboard/cargo"))
        : await api
            .put(`/concedente/${data.CargoId}`, {
              ...values,
              CargoId: data.CargoId,
            })
            .finally(() => navigate("/dashboard/cargo"));
      isEdit
        ? toast("Cargo Cadastrada com Sucesso. ✅")
        : toast("Cargo Alterada com Sucesso. ✅");
    } catch (error: any) {
      isEdit
        ? toast("OPS, algo deu errado ao cadastrar a Cargo. ❌")
        : toast("OPS, algo deu errado ao alterar a Cargo. ❌");
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
              name="Descricao"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do Cargo" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Tipo"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <Input placeholder="Tipo do Cargo" {...field} />
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
              onClick={() => navigate("/dashboard/cargo")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormCadastroCargo;
