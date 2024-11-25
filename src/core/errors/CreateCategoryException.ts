import { Exception } from './base/Exception'

export class CreateCategoryException extends Exception {
  constructor() {
    super('CREATE_CATEGORY_ERROR', 'Não foi possível criar a categoria')
  }
}
