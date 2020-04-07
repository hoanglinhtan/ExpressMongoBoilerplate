import { whiteListConfig } from '../config';
import Cors from 'cors';
import BodyParser from 'body-parser';
import Morgan from 'morgan';
import ResponseHelper from '../helpers/ResponseHelper';

class MiddlewareIndex {
    constructor(app) {
        this.app = app;
    }

    configure() {
        this.app
            .use((req, res, next) => {
                if (whiteListConfig.whiteList.indexOf('*') < 0) {
                    const org = req.get('origin');
                    const ip = req.ip.replace('::ffff:', '');
                    if (
                        !(
                            whiteListConfig.whiteList.find((o) => o === org) ||
                            whiteListConfig.whiteList.find((o) => o == ip)
                        )
                    ) {
                        return ResponseHelper.sendError(res, new Error('FORBIDDEN'));
                    }
                }
                return next();
            })
            .options('*', Cors());

        this.app.use(Morgan('combined'));
        this.app.use(BodyParser.urlencoded({ extended: false }));
        this.app.use(BodyParser.json());
        this.app.use(
            Cors({
                origin: whiteListConfig.whiteList,
                methods: ['GET', 'PUT', 'POST', 'DELETE'],
                preflightContinue: true,
            })
        );
    }
}

export default (app) => {
    return new MiddlewareIndex(app);
};
