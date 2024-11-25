import { HttpStatus } from '@/core/constants/HttpStatus'
import { Exception } from '@/core/errors/base/Exception'
import type { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { ZodError } from 'zod'

export async function handleError(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error) {
    if (error instanceof ZodError) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: error.format()._errors,
        code: 'VALIDATION_ERROR',
      })
    }

    if (error instanceof Exception) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        data: {
          message: error.message,
        },
        code: error.code,
      })
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      data: error.message,
      code: 'INTERNAL_SERVER_ERROR',
    })
  }

  return next(response)
}
