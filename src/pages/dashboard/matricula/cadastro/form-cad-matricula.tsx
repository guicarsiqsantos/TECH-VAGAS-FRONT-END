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
import { MatriculaProps } from "../table/columns"; //

const formSchema = z.object({
  NumeroMatricula: z
    .string()
    .min(2, { message: "Número de Matrícula deve ter no mínimo 2 caracteres" })
    .max(50),
});

type FormCadastroProps = z.infer<typeof formSchema>;

const FormCadastroMatricula = ({ data }: { data: MatriculaProps }) => {
  const navigate = useNavigate();
  const isEdit = Object.keys(data).length !== 0;
  const form = useForm<FormCadastroProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NumeroMatricula: data.NumeroMatricula || "",
    },
  });

  async function onSubmit(values: FormCadastroProps) {
    try {
      isEdit
        ? await api
            .put(`/matricula/${data.MatriculaId}`, {
              ...values,
              MatriculaId: data.MatriculaId,
            })
            .finally(() => navigate("/dashboard/matricula"))
        : await api
            .post("/matricula", values)
            .finally(() => navigate("/dashboard/matricula"));
      isEdit
        ? toast("Matrícula Alterada com Sucesso. ✅")
        : toast("Matrícula Cadastrada com Sucesso. ✅");
    } catch (error: any) {
      isEdit
        ? toast("OPS, algo deu errado ao alterar a Matrícula. ❌")
        : toast("OPS, algo deu errado ao cadastrar a Matrícula. ❌");
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
              name="NumeroMatricula"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>Número de Matrícula</FormLabel>
                  <FormControl>
                    <Input placeholder="Número de Matrícula" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex gap-4">
            <Button type="submit">
              {isEdit ? "Salvar Alterações" : "Cadastrar"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/dashboard/matricula")}
            >
              Voltar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default FormCadastroMatricula;
