import User from '#models/user'
import { userRegister, userUpdate } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const data = await User.query()
    return response.ok({ msg: 'index', data })
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const user = await userRegister.validate(request.all())
    const registeredUser = await User.create(user)
    return response.ok({ msg: 'store/register', registeredUser })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const foundUser = await User.find(params.id)
    if (!foundUser) return response.notFound('User does not exist')
    return response.ok({ success: true })
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = await userUpdate.validate(request.all())
    const updateUser = await User.find(params.id)
    if (!updateUser) return response.notFound({ msg: 'User does not exist' })
    updateUser.merge(data)
    await updateUser.save()
    return response.ok({ success: true })

  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const userDelete = await User.find(params.id)
    if (!userDelete) return response.notFound({ msg: `User with the id :${params.id} does not exist` })
    await userDelete.delete()
    return response.ok({ msg: 'deleted' })
  }
}
