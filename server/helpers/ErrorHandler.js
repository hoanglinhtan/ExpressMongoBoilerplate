import Translator from './Translator';
import AppLogger from './AppLogger';
import HttpStatus from 'http-status';

class ErrorHandler {
    handle(error, _, res, __) {
        if (error) {
            AppLogger.error(error);
            if (error instanceof Error) {
                res.status(HttpStatus.BAD_REQUEST).send({
                    code: HttpStatus.BAD_REQUEST,
                    message: error.message,
                });
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                    code: HttpStatus.NOT_FOUND,
                    message: Translator.translate('UNHANDLED_ERROR'),
                });
            }
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message: Translator.translate('INTERNAL_SERVER_ERROR'),
            });
        }
    }
}

export default new ErrorHandler();
