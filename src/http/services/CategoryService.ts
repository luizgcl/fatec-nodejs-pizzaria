import { CreateCategoryException } from '@/core/errors/CreateCategoryException'
import { prismaClient } from '@/database/prisma'
import z from 'zod'

const categorySchema = z.object({
  name: z
    .string()
    .min(3, 'O nome da categoria deve conter no mínimo 3 caracteres'),
})

export type CreateCategoryParams = z.infer<typeof categorySchema>

export async function createCategory(data: CreateCategoryParams) {
  try {
    const category = await prismaClient.category.create({
      data,
    })

    return { category }
  } catch {
    throw new CreateCategoryException()
  }
}

export async function listCategories() {
  const categories = await prismaClient.category.findMany()

  return {
    categories,
  }
}
