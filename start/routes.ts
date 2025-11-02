
import ServiceController from '#controllers/service_controller'
import UserController from '#controllers/user_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('users', UserController).apiOnly()
router.resource('services', ServiceController).apiOnly()
