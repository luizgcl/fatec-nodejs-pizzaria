export class Exception extends Error {
  constructor(
    private readonly _code: string,
    message: string
  ) {
    super(message)
  }

  get code() {
    return this._code
  }
}
