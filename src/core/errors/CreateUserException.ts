import { Exception } from './base/Exception'

export class CreateUserException extends Exception {
  constructor() {
    super('CREATE_USER_ERROR', 'Erro ao criar usuário')
  }
}
