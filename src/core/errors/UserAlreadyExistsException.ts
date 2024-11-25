import { Exception } from './base/Exception'

export class UserAlreadyExistsException extends Exception {
  constructor() {
    super('USER_ALREADY_EXISTS', 'Usuário ja cadastrado')
  }
}
