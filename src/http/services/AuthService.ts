import { InvalidCredentialsException } from '@/core/errors/InvalidCredentialsException'
import { UserAlreadyExistsException } from '@/core/errors/UserAlreadyExistsException'
import z from 'zod'
import {
  handleComparePassword,
  handleEncodePassword,
} from './PasswordEncoderService'
import {
  type CreateUserParams,
  createUser,
  findUserByEmail,
  findUserById,
} from './UserService'
import { handleCreateToken } from './UserTokenService'

const userLoginSchema = z.object({
  email: z.string().email(),
  senha: z.string(),
})

export type UserLoginParams = z.infer<typeof userLoginSchema>

export async function handleRegister({
  email,
  nome,
  senha: password,
}: CreateUserParams) {
  const { user: hasUserWithSameEmail } = await findUserByEmail(email)

  if (hasUserWithSameEmail) {
    throw new UserAlreadyExistsException()
  }

  const { passwordHash } = await handleEncodePassword(password)

  const user = await createUser({
    email: email,
    nome,
    senha: passwordHash,
  })

  return user
}

export async function handleLogin({ email, senha: password }: UserLoginParams) {
  const { user } = await findUserByEmail(email)

  if (!user) {
    throw new InvalidCredentialsException()
  }

  const isValidPassword = await handleComparePassword({
    password,
    password_hash: user.password,
  })

  if (!isValidPassword) {
    throw new InvalidCredentialsException()
  }

  return handleCreateToken(user)
}

export async function handleShowUserInfo(id: string) {
  const { user } = await findUserById(id)

  return { ...user }
}
