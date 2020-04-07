import { jwtKey } from '../config';
import JWT from 'jsonwebtoken';
import Moment from 'moment';
import Bcrypt from 'bcrypt';
import { userRepository } from '../repositories';

const AUTHORIZATION_KEY = 'x-access-token';

export default class JwtHelper {
    static authenticate = async ({ username, password }) => {
        const user = await userRepository.getUser({ username });
        if (user) {
            const isMatched = await Bcrypt.compare(password, user.password);
            if (!isMatched) {
                throw Error('PASSWORD_INCORRECT_ERROR');
            }

            user.id = user._id;
            delete user._id;
            delete user.password;
            delete user.__v;

            return user;
        } else {
            throw Error('EMAIL_NOT_FOUND_ERROR');
        }
    };

    static generateToken = (user, expireTime) => {
        const now = Moment().unix();
        const { username, id } = user;
        const payload = {
            iat: now,
            exp: now + expireTime,
            uid: id,
            user: {
                username,
            },
        };
        return JWT.sign(payload, jwtKey);
    };

    static verifyToken = (token) => {
        const decodedToken = JWT.decode(token);
        if (!decodedToken || decodedToken.exp < Moment().unix()) {
            throw new Error('INVALID_TOKEN');
        }
        return decodedToken;
    };

    static getToken(req) {
        let authorization = null;
        try {
            if (req.query && req.query.token) {
                token = req.query.token;
            } else if (req.headers && req.headers[AUTHORIZATION_KEY]) {
                authorization = req.headers[AUTHORIZATION_KEY];
            } else if (req.socket && req.socket.handshake.headers[AUTHORIZATION_KEY]) {
                authorization = req.socket.handshake.headers[AUTHORIZATION_KEY];
            }
            return authorization;
        } catch (e) {
            return null;
        }
    }
}
