import Superman from 'lodash';
import Joi from 'joi';
import ResponseHelper from '../helpers/ResponseHelper';

export default class AuthValidator {
    validateRegister = ({ body }, res, next) => {
        const data = Superman.pick(body, ['username', 'password']);
        const result = Joi.object({
            username: Joi.string().email().required().error(new Error('USERNAME_INVALID_ERROR')),
            password: Joi.string().min(6).max(24).error(new Error('PASSWORD_INVALID_ERROR')),
        }).validate(data);
        if (result.error) {
            return ResponseHelper.sendError(res, result.error.message);
        }
        return next();
    };

    validateLogin = ({ body }, res, next) => {
        const validateData = Superman.pick(body, ['username', 'password']);
        const result = Joi.object({
            username: Joi.string().email().required().error(new Error('USERNAME_INVALID_ERROR')),
            password: Joi.string()
                .min(6)
                .max(24)
                .required()
                .error(new Error('PASSWORD_INVALID_ERROR')),
        }).validate(validateData);
        if (result.error) {
            return ResponseHelper.sendError(res, result.error);
        }
        return next();
    };
}
