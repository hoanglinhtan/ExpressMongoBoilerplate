import EventValidator from './EventValidator';
import AuthValidator from './AuthValidator';

module.exports = {
    eventValidator: new EventValidator(),
    authValidator: new AuthValidator(),
};
