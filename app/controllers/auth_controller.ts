import User from '#models/user'
import { loginUser, registerUser } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {

  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerUser)
    console.log('register user', payload)
    const user = await User.create(payload)
    const token = await User.accessTokens.create(user, ['*'], {
      expiresIn: '30 days'
    })

    return response.created(token)
  }

  async login({ request }: HttpContext) {
    const { name, password } = await request.validateUsing(loginUser)
    console.log(await User.query().where('name', name).first())
    const user = await User.verifyCredentials(name, password)
    return User.accessTokens.create(user)
  }

  async logout({ auth, response }: HttpContext) {
    const user = auth.user!
    await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    return response.ok({ msg: 'logged out' })
  }

  async me({ auth }: HttpContext) {
    await auth.check()
    return auth.user

  }
}

