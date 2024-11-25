import { Exception } from './base/Exception'

export class CreateProductException extends Exception {
  constructor() {
    super('CREATE_PRODUCT_ERROR', 'Não foi possível criar o produto')
  }
}
