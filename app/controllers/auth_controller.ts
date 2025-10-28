import User from '#models/user'
import { UserService } from '#services/user_creation_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

  async store({ request, response }: HttpContext) {
    const Data = request.all()
    const userData = await UserService.create(Data)
    return response.created({ msg: 'User registered successfully', token: userData.token, user: userData.user })
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = request.all()
    const user = User.verifyCredentials(email, password)
    if (!user) response.unauthorized({ msg: 'Invalid credentials' })

  }
  async me({ request, response }: HttpContext) { }
}
