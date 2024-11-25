import { CreateUserException } from '@/core/errors/CreateUserException'
import { prismaClient } from '@/database/prisma'
import z from 'zod'

const createUserSchema = z.object({
  nome: z.string().min(5, 'O nome deve conter no mínimo 5 caracteres'),
  email: z.string().email('O e-mail deve ser válido'),
  senha: z.string().min(8, 'A senha deve conter no mínimo 8 caracteres'),
})

export type CreateUserParams = z.infer<typeof createUserSchema>

export async function createUser({
  nome: name,
  senha: password,
  email,
}: CreateUserParams) {
  try {
    const user = await prismaClient.user.create({
      data: {
        name,
        password,
        email,
      },
    })

    return user
  } catch {
    throw new CreateUserException()
  }
}

export async function findUserById(id: string) {
  const user = await prismaClient.user.findUnique({
    where: {
      id,
    },
  })

  return { user }
}

export async function findUserByEmail(email: string) {
  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  })

  return { user }
}
