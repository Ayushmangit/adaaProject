import Role from '#models/role'
import { createRoleValidator } from '#validators/create_role'
import { updateRoleValidator } from '#validators/update_role'
import type { HttpContext } from '@adonisjs/core/http'

export default class RolesController {
  async index({ response }: HttpContext) {
    const roles = await Role.query()
    return response.ok({ msg: 'testing will delete later', roles })
  }

  async store({ request, response }: HttpContext) {
    const role = await createRoleValidator.validate(request.all())
    const createdRole = await Role.create({
      ...role
    })

    return response.created({
      msg: 'Role created',
      data: createdRole
    })

  }

  async show({ params, response }: HttpContext) {
    const role = await Role.find(params.id)
    if (!role) return response.notFound('Role not found')
    return response.ok({
      msg: 'Role fouhd successfully',
      data: role
    })
  }

  async update({ params, request, response }: HttpContext) {
    const data = await updateRoleValidator.validate(request.all())
    const role = await Role.find(params.id)
    if (!role) return response.notFound('Role not found')
    role.merge(data)
    await role.save()

    return response.ok({
      msg: 'Role updated successfully',
      data: role
    })
  }

  async destroy({ params, response }: HttpContext) {
    const role = await Role.find(params.id)
    if (!role) return response.notFound('Role not found')
    await role.delete()
    return response.ok({ msg: 'Role is deleted' })
  }
}
