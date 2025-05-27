import { z } from "zod";

// Projects/
export const projectSchema = z.object({
  _id: z.string().optional(),
  projectName: z.string().min(1, "El título del proyecto es obligatorio"),
  clientName: z.string().min(1, "El nombre del cliente es obligatorio"),
  description: z.string().min(1, "La descripción del proyecto es obligatoria"),
});
export type Project = z.infer<typeof projectSchema>;

export type ProjectFormProps = Pick <Project, 'projectName' | 'clientName' | 'description'>;
export type ProjectFormData = z.infer<typeof projectSchema>;