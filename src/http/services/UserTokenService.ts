import { env } from '@/env/Env'
import type { User } from '@prisma/client'
import { type JwtPayload, sign, verify } from 'jsonwebtoken'

export function handleCreateToken(user: User) {
  const payload = {
    userId: user.id,
  }

  const token = sign(payload, env.SECRET, {
    issuer: 'PIZZARIA-API',
    algorithm: 'HS256',
    expiresIn: '1h',
    subject: user.id,
  })

  return {
    access_token: token,
  }
}

export function handleValidateToken(token: string): { payload: JwtPayload } {
  const payload = verify(token, env.SECRET, {
    issuer: 'PIZZARIA-API',
  }) as JwtPayload

  return { payload }
}
