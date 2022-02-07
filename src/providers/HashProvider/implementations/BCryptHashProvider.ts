import { hash, compare } from 'bcrypt'
import { IHashProvider } from '../dtos/IHashProvider'

class BCryptHashProvider implements IHashProvider {
  public async generateHash (payload: string): Promise<string> {
    return hash(payload, 10)
  }

  public async compareHash (payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}

export const bcryptHashProvider = new BCryptHashProvider()
