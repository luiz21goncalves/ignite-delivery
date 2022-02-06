import { AppError } from '../../../../errors/AppError'

export namespace CreateClientError {
  export class EmailInUse extends AppError {
    constructor () {
      super('Email already in use.')
    }
  }

  export class UsernameInUse extends AppError {
    constructor () {
      super('Username already in use.')
    }
  }
}
