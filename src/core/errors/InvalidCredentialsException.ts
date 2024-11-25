import { Exception } from './base/Exception'

export class InvalidCredentialsException extends Exception {
  constructor() {
    super('INVALID_CREDENTIALS', 'Invalid credentials')
  }
}
