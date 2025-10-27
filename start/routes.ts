/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import RolesController from '#controllers/roles_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('users', UsersController).apiOnly()
router.resource('roles', RolesController).apiOnly()
router.resource('services', 'ServicesController').apiOnly()
router.resource('bookings', 'BookingsController').apiOnly()
