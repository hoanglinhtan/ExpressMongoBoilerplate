import Joi from 'joi';
import ResponseHelper from '../helpers/ResponseHelper';

export default class EventValidator {
    validateCreateEvent = ({ body }, res, next) => {
        const result = Joi.object({
            name: Joi.string().min(1).max(1000).required().error(new Error('EVENT_NAME_INVALID')),
            description: Joi.string().required().error(new Error('EVENT_DESCRIPTION_INVALID')),
            startDate: Joi.string().isoDate().required().error(new Error('START_DATE_INVALID')),
            dueDate: Joi.string().isoDate().required().error(new Error('DUE_DATE_INVALID')),
        }).validate(body);
        if (result.error) {
            ResponseHelper.sendError(res, result.error);
        }
        next();
    };

    validateUpdateEvent = ({ body }, res, next) => {
        const result = Joi.object({
            name: Joi.string().min(1).max(1000).required().error(new Error('EVENT_NAME_INVALID')),
            description: Joi.string().required().error(new Error('EVENT_DESCRIPTION_INVALID')),
            startDate: Joi.string().isoDate().required().error(new Error('START_DATE_INVALID')),
            dueDate: Joi.string().isoDate().required().error(new Error('DUE_DATE_INVALID')),
        }).validate(body);
        if (result.error) {
            return ResponseHelper.sendError(res, result.error);
        }
        return next();
    };

    validateGetEvents = ({ query }, res, next) => {
        console.log(query);
        const result = Joi.object({
            page: Joi.number().required().error(new Error('PAGE_INVALID')),
            limit: Joi.number().required().error(new Error('LIMIT_INVALID')),
        }).validate({ ...query });
        if (result.error) {
            return ResponseHelper.sendError(res, result.error);
        }
        return next();
    };

    validateGetEvent = ({ params }, res, next) => {
        const result = Joi.object({
            id: Joi.string().required().error(new Error('ID_INVALID')),
        }).validate({ id: params.id });
        if (result.error) {
            return ResponseHelper.sendError(res, result.error);
        }
        return next();
    };

    validateDeleteEvent = ({ params }, res, next) => {
        const result = Joi.object({
            id: Joi.string().required().error(new Error('ID_INVALID')),
        }).validate(params);
        if (result.error) {
            return ResponseHelper.sendError(res, result.error);
        }
        return next();
    };
}
