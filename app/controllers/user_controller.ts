import User from '#models/user'
import { userRegister, userUpdate } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  async index({ response }: HttpContext) {
    const data = await User.query()
    return response.ok(data)
  }

  async store({ request, response }: HttpContext) {
    const user = await userRegister.validate(request.all())
    const registeredUser = await User.create(user)
    return response.ok(registeredUser)
  }

  async show({ params, response }: HttpContext) {
    const foundUser = await User.find(params.id)
    if (!foundUser) return response.notFound('User does not exist')
    return response.ok(foundUser)
  }

  async update({ params, request, response }: HttpContext) {
    const data = await userUpdate.validate(request.all())
    const updateUser = await User.find(params.id)
    if (!updateUser) return response.notFound({ msg: 'User does not exist' })
    updateUser.merge(data)
    await updateUser.save()
    return response.ok(updateUser)

  }

  async destroy({ params, response }: HttpContext) {
    const userDelete = await User.find(params.id)
    if (!userDelete) return response.notFound({ msg: `User with the id :${params.id} does not exist` })
    await userDelete.delete()
    return response.ok({ msg: 'User deleted' })
  }
}
