import { Router } from 'express';
import { eventController } from '../controllers';
import { eventValidator } from '../validators';

const router = Router();

/**
 * @endpoint /events
 * @method GET
 * @name GetEvents
 * @description Get Events
 *
 * @header {String} token
 * @param {Number} page
 * @param {Number}  limit
 *
 * @success {Array}
 */
router.route('/').get([eventValidator.validateGetEvents], eventController.getEvents);

/**
 * @endpoint /events/:id
 * @method GET
 * @name GetEvent
 * @description Get Event
 *
 * @header {String} token
 * @param {Number} id
 *
 * @success {*} { id, userId, name, description, startDate, dueDate }
 */
router.route('/:id').get([eventValidator.validateGetEvent], eventController.getEvent);

/**
 * @endpoint /events
 * @method POST
 * @name CreateEvent
 * @description Create Event
 *
 * @header {String} token
 * @body {*}  { name, description, startDate, dueDate }
 *
 * @success {*} { id, userId, name, description, startDate, dueDate }
 */
router.route('/').post([eventValidator.validateCreateEvent], eventController.createEvent);

/**
 * @endpoint /events/{:id}
 * @method PUT
 * @name UpdateEvent
 * @description Update Event
 *
 * @header {String} token
 * @param {Number} { id }
 * @body {*}  { name, description, startDate, dueDate }
 *
 * @success {*} { id, userId, name, description, startDate, dueDate }
 */
router.route('/:id').put([eventValidator.validateUpdateEvent], eventController.updateEvent);

/**
 * @endpoint  /events/{:id}
 * @method DELETE
 * @name DeleteEvent
 * @description Delete Event
 *
 * @header {String} token
 * @param {Number}  { id }
 *
 * @success {*} { status }
 */
router.route('/:id').delete([eventValidator.validateDeleteEvent], eventController.deleteEvent);

export default router;
