import { Exception } from './base/Exception'

export class CreateOrderException extends Exception {
  constructor() {
    super('CREATE_ORDER_ERROR', 'Não foi possível criar o pedido')
  }
}
