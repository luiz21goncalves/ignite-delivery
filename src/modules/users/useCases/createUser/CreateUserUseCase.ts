import { hash } from 'bcrypt'

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../dtos/User'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { CreateUserError } from './CreateUserError'

export class CreateUserUseCase {
  constructor (private userRepository: IUsersRepository) {}

  async execute ({ name, username, email, password }: ICreateUserDTO): Promise<Omit<User, 'password'>> {
    const foundUserByEmail = await this.userRepository.findByEmail(email)

    if (foundUserByEmail) {
      throw new CreateUserError.EmailInUse()
    }

    const foundUserByUserName = await this.userRepository.findByUsername(username)

    if (foundUserByUserName) {
      throw new CreateUserError.UsernameInUse()
    }

    const hashPassword = await hash(password, 10)

    const user = await this.userRepository.create({
      name,
      username,
      email,
      password: hashPassword
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
  }
}
