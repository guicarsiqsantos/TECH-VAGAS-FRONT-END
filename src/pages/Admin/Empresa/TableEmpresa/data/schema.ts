import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const empresaSchema = z.object({
  concedenteId: z.number(),
  razaoSocial: z.string(),
  responsavelEstagio: z.string(),
  cnpj: z.string(),
  localidade: z.string(),
});

export type empresasProps = z.infer<typeof empresaSchema>;
