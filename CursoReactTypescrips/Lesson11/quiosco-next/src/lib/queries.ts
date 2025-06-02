// lib/queries.ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { prisma } from './prisma'
import type { Category } from '@prisma/client'


export async function getCategories(): Promise<Category[]> {
  return await prisma.category.findMany()
}
