
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

// auth routes
// /login
// /signup
// /logout // remove recivied token in request
// /me // this will return the user object from token

// SERVICES route
// /services (list all the services)
// /service/:service_id (return single service)
//post: service
//delete: service:SErviceId
//patch: service/:serviceId


//SLOT / MEMBERSHIP
// create
// DELETE
// LISTING
// PATCH

// BOOKINGS
// /service/:service_id/bookings?date="12/12/2025" (list all the booking for that service for that date) (bookingsTable.weher("serviceId = x")).andWhereNull("s_membership_i_id = ")
// POST: /service/:service_id/slot/:slot_info_id/book { start_at_date_time }
// POST: /service/:service_id/membership/:membership_info_id { start_at_date_time }





router.resource('users', UserController).apiOnly()
router.resource('services', ServiceController).apiOnly()
router.resource('serviceSlotInfo', ServicesSlotInfoController).apiOnly()
router.resource('serviceMembershipInfo', ServicesMembershipInfoController).apiOnly()
router.resource('booking', BookingController).apiOnly()
