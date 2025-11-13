
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


router.get('/api/services/', [ServiceController, 'index'])
router.get('api/services/:service_id', [ServiceController, 'show'])
router.post('/api/services/', [ServiceController, 'store'])
router.patch('/api/services/:service_id', [ServiceController, 'update'])
router.delete('/api/services/:service_id', [ServiceController, 'destroy'])

router.get('api/membership/', [ServicesMembershipInfoController, 'index'])
router.get('/api/membership/:service_membership_info_id', [ServicesMembershipInfoController, 'show'])
router.post('/api/membership/', [ServicesMembershipInfoController, 'store'])
router.patch('/api/membership/:service_membership_info_id', [ServicesMembershipInfoController, 'update'])
router.delete('api/membership/:service_membership_info_id', [ServicesMembershipInfoController, 'destroy'])

router.get('api/slot/', [ServicesSlotInfoController, 'index'])
router.get('/api/slot/:service_slot_info_id', [ServicesSlotInfoController, 'show'])
router.post('/api/slot/', [ServicesSlotInfoController, 'store'])
router.patch('/api/slot/:service_slot_info_id', [ServicesSlotInfoController, 'update'])
router.delete('api/slot/:service_slot_info_id', [ServicesSlotInfoController, 'destroy'])

router.get('api/booking/', [BookingController, 'index'])
router.get('api/booking/:booking_id', [BookingController, 'show'])
router.post('api/booking/', [BookingController, 'store'])
router.patch('api/booking/:booking_id', [BookingController, 'update'])
router.delete('api/booking/:booking_id', [BookingController, 'destroy'])


