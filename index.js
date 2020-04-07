import { dbConfig } from './server/config';
import Express from 'express';
import Helmet from 'helmet';
import BodyParser from 'body-parser';
import Mongoose from 'mongoose';
import ErrorHandler from './server/helpers/ErrorHandler';
import Translator from './server/helpers/Translator';
import MiddlewareWrapper from './server/middlewares';
import ApiRoute from './server/routes';

const app = Express();

// Middlewares
app.use(Helmet());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
MiddlewareWrapper(app).configure();
app.use('/api', ApiRoute);

// Localization
Translator.configure();

// Error Handler
app.use(ErrorHandler.handle);

// Set up database
Mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, {
    user: dbConfig.user,
    pass: dbConfig.pass,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
Mongoose.set('debug', true);

module.exports = app;
