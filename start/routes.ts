
import BookingController from '#controllers/booking_controller'
import ServiceController from '#controllers/service_controller'
import ServicesMembershipInfoController from '#controllers/services_membership_info_controller'
import ServicesSlotInfoController from '#controllers/services_slot_info_controller'
import UserController from '#controllers/user_controller'
import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('users', UserController).apiOnly()
router.resource('services', ServiceController).apiOnly()
router.resource('serviceSlotInfo', ServicesSlotInfoController).apiOnly()
router.resource('serviceMembershipInfo', ServicesMembershipInfoController).apiOnly()
router.resource('booking', BookingController).apiOnly()
