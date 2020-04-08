import Moment from 'moment';
import { eventRepository } from '../repositories';
import ResponseHelper from '../helpers/ResponseHelper';

export default class EventController {
    /**
     * Get Events
     * @param {*} {  }
     * @returns {Array} Event[]
     */
    getEvents = async ({ userId, query }, res) => {
        try {
            const { page, limit } = query;
            const options = {
                select: ['name', 'description', 'startDate', 'dueDate'],
                condition: {
                    userId,
                    dueDate: { $gte: Moment() },
                },
                sort: {
                    dueDate: 1,
                },
                skip: (page - 1) * parseInt(limit),
                limit: parseInt(limit),
            };
            const [total, events] = await eventRepository.getManyAndCount(options);
            return ResponseHelper.sendSuccess(res, {
                data: events,
                pageInfo: {
                    page,
                    total,
                },
            });
        } catch (e) {
            return ResponseHelper.sendError(res, e);
        }
    };

    /**
     * Get Event
     * @param {*} {}
     * @returns {*} Event
     */
    getEvent = async ({ userId, params }, res) => {
        try {
            const { id } = params;
            const event = await eventRepository.getOne({
                condition: {
                    _id: id,
                    userId,
                },
            });
            if (!event) {
                throw Error('EVENT_NOT_FOUND_ERROR');
            }
            return ResponseHelper.sendSuccess(res, event);
        } catch (e) {
            return ResponseHelper.sendError(res, e);
        }
    };

    /**
     * Create Event
     * @param {*} {}
     * @returns {*} Event
     */
    createEvent = async ({ body, userId }, res) => {
        try {
            const { name, description, startDate, dueDate } = body;

            if (Moment(startDate).diff(dueDate, 'minutes') > 0) {
                throw Error('START_DATE_GREATER_THAN_DUE_DATE_ERROR');
            }

            const event = await eventRepository.create({
                userId,
                name,
                description,
                startDate,
                dueDate,
            });

            return ResponseHelper.sendSuccess(res, event);
        } catch (e) {
            return ResponseHelper.sendError(res, e);
        }
    };

    /**
     * Update Event
     * @param {*} {}
     * @returns {*} Event
     */
    updateEvent = async ({ userId, params, body }, res) => {
        try {
            const { id } = params;
            const { startDate, dueDate } = body;

            const event = await this.validateEvent(id, userId);

            if (
                Moment(startDate || event.startDate).diff(dueDate || event.dueDate, 'minutes') > 0
            ) {
                throw Error('START_DATE_GREATER_THAN_DUE_DATE_ERROR');
            }

            const updateData = {};

            ['name', 'description', 'startDate', 'dueDate'].forEach((field) => {
                if (body[field]) {
                    updateData[field] = body[field];
                }
            });

            const updatedEvent = await eventRepository.update({
                id,
                updateData,
            });
            return ResponseHelper.sendSuccess(res, updatedEvent);
        } catch (e) {
            return ResponseHelper.sendError(res, e);
        }
    };

    /**
     * Delete Event
     * @param {*} {}
     */
    deleteEvent = async ({ userId, params }, res) => {
        try {
            const { id } = params;
            await this.validateEvent(id, userId);
            const isDeleted = await eventRepository.delete({ _id: id, userId });
            return ResponseHelper.sendSuccess(res, isDeleted ? true : false);
        } catch (e) {
            return ResponseHelper.sendError(res, e);
        }
    };

    async validateEvent(id, userId) {
        const event = await eventRepository.getOne({ condition: { _id: id, userId } });
        if (!event) {
            throw Error('EVENT_NOT_FOUND_ERROR');
        }
        return event;
    }
}
