import User from '#models/user'
import { createUserValidator } from '#validators/create_user'
import { updateUserValidator } from '#validators/update_user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {

  async index({ response }: HttpContext) {
    const users = await User.query().preload('role')
    if (!users) {
      return response.notFound({ msg: 'User not found' })
    }
    return response.ok(users)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = await createUserValidator.validate(request.all())
    const hashedPassword = await hash.make(data.password)
    const user = await User.create({ ...data, password: hashedPassword })
    return response.created({
      msg: 'user created successfully',
      data: user
    })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {

    const user = await User.query().where('id', params.id).preload('role')
    if (!user) {
      return response.notFound({ msg: 'User not found' })
    }
    return response.ok(user)

  }


  async update({ params, request, response }: HttpContext) {
    const data = await updateUserValidator.validate(request.all())
    const user = await User.find(params.id)
    if (!user) return response.notFound({ msg: 'User not found' })

    if (data.password) {
      data.password = await hash.make(data.password)
    }

    user.merge(data)
    await user.save()

    return response.ok({ msg: 'User updated successfully', data: user })

  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) return response.notFound({ msg: 'user not found' })
    await user.delete()
    return response.ok({ msg: 'User deleted successfully' })
  }
}
