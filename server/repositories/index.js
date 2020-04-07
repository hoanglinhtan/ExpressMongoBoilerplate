import { TokenRepository } from './TokenRepository';
import { UserRepository } from './UserRepository';
import { EventRepository } from './EventRepository';

module.exports = {
    tokenRepository: new TokenRepository(),
    userRepository: new UserRepository(),
    eventRepository: new EventRepository(),
};
