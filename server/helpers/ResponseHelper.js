import Translator from '../helpers/Translator';
import HttpStatus from 'http-status';
import AppLogger from './AppLogger';

export default class ResponseHelper {
    static sendSuccess(res, data, status) {
        res.status(status || HttpStatus.OK).send(data);
    }

    static sendError(res, error) {
        AppLogger.error(error);
        let message = error;
        if (error && error.errors) {
            message = Translator.translate(error.errors[0].message);
        } else if (error.message) {
            message = Translator.translate(error.message);
        }

        res.status(HttpStatus.BAD_REQUEST).send({
            message,
        });
    }
}
