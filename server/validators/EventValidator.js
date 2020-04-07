import Joi from 'joi';
import ResponseHelper from '../helpers/ResponseHelper';

export default class EventValidator {
    validateCreateEvent = ({ body }, res, next) => {
        const result = Joi.object({}).validate(body);
        if (result.error) {
            ResponseHelper.sendError(res, result.error.message);
        }
        next();
    };

    validateUpdateEvent = ({ body }, res, next) => {
        const result = Joi.object({}).validate(body);
        if (result.error) {
            return ResponseHelper.sendError(res, result.error.message);
        }
        return next();
    };

    validateGetEvent = ({ params }, res, next) => {
        const result = joi.object({}).validate({ id: params.id });
        if (result.error) {
            return ResponseHelper.sendError(res, result.error.message);
        }
        return next();
    };

    validateDeleteEvent = ({ body }, res, next) => {
        const result = joi.object({}).validate(body);
        if (result.error) {
            return ResponseHelper.sendError(res, Error(result.error.message));
        }
        return next();
    };
}
