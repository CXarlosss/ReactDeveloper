// src/types/index.ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { object, string, boolean, number, minLength, minValue } from 'valibot';

export const DraftProductSchema = object({
  name: string([minLength(1, 'El nombre es obligatorio')]),
  price: number([minValue(0.01, 'El precio debe ser mayor que 0')]),
  availability: boolean(),
});
