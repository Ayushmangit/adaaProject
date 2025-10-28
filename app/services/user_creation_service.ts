import User from "#models/user"
import { createUserValidator } from "#validators/create_user"
import hash from '@adonisjs/core/services/hash'


export class UserService {
  public static async create(payload: {}) {
    const data = await createUserValidator.validate(payload)
    const hashedPassword = await hash.make(data.password)
    const user = await User.create({ ...data, password: hashedPassword })
    const token = await User.accessTokens.create(user)
    return {
      type: 'bearer',
      token: token.value!.release()
    }
  }
}
